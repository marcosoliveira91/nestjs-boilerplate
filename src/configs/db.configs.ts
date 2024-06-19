
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "./env.configs";

export const dbConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    entities: [],
    synchronize: true,
    autoLoadEntities: true,
};

