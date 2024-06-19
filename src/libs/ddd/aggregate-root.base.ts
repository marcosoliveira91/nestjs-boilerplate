import { RequestContextService } from "@libs/context/request-context.service";
import { DomainEvent, Entity } from "@libs/ddd";
import { LoggerPort } from "@libs/logger/logger.port";
import { EventEmitter2 } from '@nestjs/event-emitter';

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
    private _domainEvents: DomainEvent[] = [];

    get domainEvents(): DomainEvent[] {
        return this._domainEvents;
    }

    protected addEvent(domainEvent: DomainEvent): void {
        this._domainEvents.push(domainEvent);
    }

    public clearEvents(): void {
        this._domainEvents = [];
    }

    public async publishEvents(
        logger: LoggerPort,
        eventEmitter: EventEmitter2,
    ): Promise<void> {
        await Promise.all(
            this.domainEvents.map(async (event) => {
                logger.debug(
                    `[${RequestContextService.getRequestId()}] "${event.constructor.name
                    }" event published for aggregate ${this.constructor.name} : ${this.id
                    }`,
                );
                return eventEmitter.emitAsync(event.constructor.name, event);
            }),
        );
        this.clearEvents();
    }
}
