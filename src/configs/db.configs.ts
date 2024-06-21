import '@libs/utils/dotenv';

import { DataSourceOptions } from "typeorm";
import { config } from "./env.configs";

export const dbConfig: DataSourceOptions = {
    type: 'mysql',
    host: config.MYSQL_DB_HOST,
    port: config.MYSQL_DB_PORT,
    username: config.MYSQL_DB_USERNAME,
    password: config.MYSQL_DB_PASSWORD,
    database: config.MYSQL_DB_NAME,
    // entities: [UserModel],
    entities: [
        __dirname + '/../modules/**/infra/*.model{.ts}',
    ],
    synchronize: process.env.NODE_ENV !== 'production',
};

