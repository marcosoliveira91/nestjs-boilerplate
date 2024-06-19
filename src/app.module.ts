import { Module } from '@nestjs/common';
import { RequestContextModule } from 'nestjs-request-context';
import { TypeOrmModule as DatabaseModule } from '@nestjs/typeorm';
import { ContextInterceptor } from '@libs/context/context-interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { dbConfig } from '@configs/db.configs';

const interceptors = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ContextInterceptor,
  },
];

@Module({
  imports: [
    RequestContextModule,
    DatabaseModule.forRoot(dbConfig),
  ],
  controllers: [],
  providers: [...interceptors],
})

export class AppModule { }
