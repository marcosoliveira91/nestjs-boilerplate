import { RequestContext } from 'nestjs-request-context';
import { EntityManager as TransactionalConnection } from 'typeorm';


/**
 * Set isolated context for each request
 */
export class AppRequestContext extends RequestContext {
    requestId: string;
    transactionalConnection?: TransactionalConnection;
}

export class RequestContextService {
    static getContext(): AppRequestContext {
        return RequestContext.currentContext.req;
    }

    static setRequestId(id: string): void {
        const ctx = this.getContext();
        ctx.requestId = id;
    }

    static getRequestId(): string {
        return this.getContext().requestId;
    }

    static getTransactionalConnection(): TransactionalConnection | undefined {
        const ctx = this.getContext();
        return ctx.transactionalConnection;
    }

    static setTransactionalConnection(
        transactionConnection?: TransactionalConnection,
    ): void {
        const ctx = this.getContext();
        ctx.transactionalConnection = transactionConnection;
    }

    static cleanTransactionalConnection(): void {
        const ctx = this.getContext();
        ctx.transactionalConnection = undefined;
    }
}
