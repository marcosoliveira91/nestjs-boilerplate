import { dbConfig } from '@configs/db.configs';
import { Global, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

/**
 * Pre-defined connection configuration to a specific database. 
 * Alternatively, we can have separate DataSources 
 * for read and write connections (for better performance and scalability).
 * 
 * Example: 
       export const READ_CONNECTION = Symbol('READ_CONNECTION');
       export const WRITE_CONNECTION = Symbol('WRITE_CONNECTION');
       const writeDataSource = new DataSource({ ... });
       const readDataSource = new DataSource({ ... });
       export const databaseProviders = [
            {
                provide: WRITE_CONNECTION,
                useFactory: async () => {
                    await dataSource.initialize();
                    return dataSource.createQueryRunner();
                },
            },
            {
                provide: READ_CONNECTION,
                useFactory: async () => {
                    await dataSource.initialize();
                    return dataSource.manager;
                },
            },
        ];
 */

const dataSource = new DataSource(dbConfig);
export const DB_CONNECTION = Symbol('DB_CONNECTION');


export const databaseProviders = [
    {
        provide: DB_CONNECTION,
        useFactory: async () => {
            await dataSource.initialize();
            return dataSource.manager;
        },
    },
];


@Global()
@Module({
    providers: [...databaseProviders],
    exports: [DB_CONNECTION],
})
export class DatabaseModule implements OnModuleInit, OnModuleDestroy {
    async onModuleInit(): Promise<void> {
        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }
    }

    async onModuleDestroy(): Promise<void> {
        if (dataSource.isInitialized) {
            await dataSource.destroy();
        }
    }
}
