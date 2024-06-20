import { RequestContextInterceptor } from '@libs/context/request-context.interceptor';
import { DatabaseModule } from '@libs/db/database.module';
import { ExceptionInterceptor } from '@libs/interceptors/exception.interceptor';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RequestContextModule } from 'nestjs-request-context';

const interceptors = [
  {
    provide: APP_INTERCEPTOR,
    useClass: RequestContextInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ExceptionInterceptor,
  },
];

@Module({
  imports: [
    DatabaseModule,
    RequestContextModule,
    EventEmitterModule.forRoot(),
    CqrsModule,
  ],
  controllers: [],
  providers: [...interceptors],
})

export class AppModule { }
