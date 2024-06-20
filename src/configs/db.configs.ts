import { DataSourceOptions } from "typeorm";
import { config } from "./env.configs";

export const dbConfig: DataSourceOptions = {
    type: 'mysql',
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    // entities: [UserModel],
    entities: [
        __dirname + '/../modules/**/infra/*.model{.ts}',
    ],
    synchronize: process.env.NODE_ENV !== 'production',
};

