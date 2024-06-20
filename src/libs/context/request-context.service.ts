import { RequestContext } from 'nestjs-request-context';
import { DataSource as DatabaseTransactionConnection } from 'typeorm';


/**
 * Set isolated context for each request
 */
export class AppRequestContext extends RequestContext {
    requestId: string;
    transactionConnection?: DatabaseTransactionConnection;
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

    static getTransactionConnection(): DatabaseTransactionConnection | undefined {
        const ctx = this.getContext();
        return ctx.transactionConnection;
    }

    static setTransactionConnection(
        transactionConnection?: DatabaseTransactionConnection,
    ): void {
        const ctx = this.getContext();
        ctx.transactionConnection = transactionConnection;
    }

    static cleanTransactionConnection(): void {
        const ctx = this.getContext();
        ctx.transactionConnection = undefined;
    }
}
