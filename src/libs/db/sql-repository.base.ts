import { RequestContextService } from "@libs/context/request-context.service";
import { AggregateRoot, Mapper, RepositoryPort } from "@libs/ddd";
import { ConflictException } from "@libs/exceptions";
import { LoggerPort } from "@libs/logger/logger.port";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { None, Option, Some } from "oxide.ts";
import { EntityManager, ObjectLiteral, QueryFailedError } from "typeorm";


export abstract class SqlRepositoryBase<Aggregate extends AggregateRoot<any>, DbModel extends ObjectLiteral> implements RepositoryPort<Aggregate> {
    protected abstract tableName: string;

    protected constructor(
        private readonly dbConnection: EntityManager,
        protected readonly mapper: Mapper<Aggregate, DbModel>,
        protected readonly eventEmitter: EventEmitter2,
        protected readonly logger: LoggerPort
    ) { }

    protected get repository() {
        return this.dbConnection.getRepository(this.tableName);
    }

    protected get manager(): EntityManager {
        return RequestContextService.getTransactionalConnection() ?? this.dbConnection;
    }

    async insert(entity: Aggregate | Aggregate[]): Promise<void> {
        const entities = Array.isArray(entity) ? entity : [entity];
        entities.forEach((entity) => entity.validate());
        const records = entities.map(this.mapper.toPersistence);

        try {
            await this.repository.insert(records);

            await Promise.all(
                entities.map((entity) =>
                    entity.publishEvents(this.logger, this.eventEmitter),
                ),
            );
        } catch (error) {
            if (error instanceof QueryFailedError) {
                this.logger.debug(
                    `[${RequestContextService.getRequestId()}] ${error.message}`,
                );

                throw new ConflictException('Record already exists', error);
            }

            throw error;
        }
    }

    async findById(id: string): Promise<Option<Aggregate>> {
        const record = await this.repository.findBy({ id });
        return record ? Some(this.mapper.toDomain(record)) : None;
    }

    async findAll(): Promise<Aggregate[]> {
        const records = await this.repository.find();

        return records.map(this.mapper.toDomain);
    }

    async delete(entity: Aggregate): Promise<boolean> {
        entity.validate();
        this.logger.debug(`[${RequestContextService.getRequestId()}] deleting entities ${entity.id} from ${this.tableName}`);

        const result = await this.repository.delete(entity.id);

        if (!result || !result.affected) {
            return false;
        }
        await entity.publishEvents(this.logger, this.eventEmitter);
        return true;
    }

    /**
     * Save results of all event handlers in a single transaction.
     * 
     * NOTE: We must must perform all database operations using the given manager instance (`transactionalConnection`).
     * Its a special instance of EntityManager working with this transaction      
     * 
     * @see https://typeorm.io/transactions
     * @param handler 
     * @returns 
     */
    async transaction<T>(handler: () => Promise<T>): Promise<T> {
        return this.manager.transaction(async (transactionalConnection) => {
            this.logger.debug(`[${RequestContextService.getRequestId()}] transaction started`);

            if (!RequestContextService.getTransactionalConnection()) {
                RequestContextService.setTransactionalConnection(transactionalConnection);
            }

            try {
                const result = await handler();
                this.logger.debug(`[${RequestContextService.getRequestId()}] transaction committed`);
                return result;
            } catch (err) {
                this.logger.debug(`[${RequestContextService.getRequestId()}] transaction rollback`);
                throw err;
            } finally {
                RequestContextService.cleanTransactionalConnection();
            }
        });
    }
}
