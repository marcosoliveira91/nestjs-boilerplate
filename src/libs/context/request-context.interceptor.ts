import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { Observable } from 'rxjs';
import { RequestContextService } from "./request-context.service";

/**
 * @see https://docs.nestjs.com/interceptors
 */
@Injectable()
export class RequestContextInterceptor implements NestInterceptor {

  /**
   * Intercepts the incoming request to set a unique ID in the global context.
   * This ID can be used as a correlation ID in logs.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const requestId = request?.body?.requestId ?? nanoid(6);

    RequestContextService.setRequestId(requestId);

    return next.handle();
  }
}
