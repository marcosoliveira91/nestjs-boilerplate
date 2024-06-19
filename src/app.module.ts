import { dbConfig } from '@configs/db.configs';
import { RequestContextInterceptor } from '@libs/context/request-context.interceptor';
import { ExceptionInterceptor } from '@libs/interceptors/exception.interceptor';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule as DatabaseModule } from '@nestjs/typeorm';
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
    DatabaseModule.forRoot(dbConfig),
    RequestContextModule,
    EventEmitterModule.forRoot(),
    CqrsModule,
  ],
  controllers: [],
  providers: [...interceptors],
})

export class AppModule { }
