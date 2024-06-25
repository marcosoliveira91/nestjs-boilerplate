import { RequestContextInterceptor } from '@libs/context/request-context.interceptor';
import { DatabaseModule } from '@libs/db/database.module';
import { ExceptionInterceptor } from '@libs/interceptors/exception.interceptor';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
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

    // Feature Modules
    UserModule,
  ],
  controllers: [],
  providers: [...interceptors],
})

export class AppModule { }
