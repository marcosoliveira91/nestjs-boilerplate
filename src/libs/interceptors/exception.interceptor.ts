import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
    BadRequestException,
} from '@nestjs/common';

import { ExceptionBase } from '@libs/exceptions';
import { RequestContextService } from '@libs/context/request-context.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorResponse } from '@src/libs/api/error.response.dto';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
    private readonly logger: Logger = new Logger(ExceptionInterceptor.name);

    /**
     * Intercepts the execution context and handles any errors that occur during request processing.
     */
    intercept(_context: ExecutionContext, next: CallHandler): Observable<ExceptionBase> {
        return next
            .handle()
            .pipe(
                catchError((err) => this.handleException(err))
            );
    }

    private handleException(err: any): Observable<any> {
        if (this.isClientError(err)) {
            this.logger.debug(`[${RequestContextService.getRequestId()}] ${err.message}`);


            if (this.isClassValidatorError(err)) {
                err = this.createBadRequestException(err);
            }
        }


        if (!err.correlationId) {
            err.correlationId = RequestContextService.getRequestId();
        }

        if (err.response) {
            err.response.correlationId = err.correlationId;
        }

        return throwError(() => err);
    }

    private isClientError(err: any): boolean {
        return err.status >= 400 && err.status < 500;
    }

    private isClassValidatorError(err: any): boolean {
        return Array.isArray(err?.response?.message) &&
            typeof err?.response?.error === 'string' &&
            err.status === 400;
    }

    private createBadRequestException(err: any): BadRequestException {
        const errorPayload = new ErrorResponse({
            correlationId: RequestContextService.getRequestId(),
            statusCode: err.status,
            message: 'Validation error',
            error: err?.response?.error,
            details: err?.response?.message,
        });

        return new BadRequestException(errorPayload);

    }
}
