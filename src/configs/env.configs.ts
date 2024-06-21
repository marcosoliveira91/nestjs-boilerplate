import '@libs/utils/dotenv';

import { z } from 'zod';

export const EnvironmentSchema = z.object({
    PORT: z.coerce.number().positive().optional().default(3000),
    MYSQL_DB_HOST: z.string(),
    MYSQL_DB_PORT: z.coerce.number().positive(),
    MYSQL_DB_USERNAME: z.string(),
    MYSQL_DB_PASSWORD: z.string(),
    MYSQL_DB_NAME: z.string(),
});

export const config = EnvironmentSchema.parse(process.env);
export type Config = z.infer<typeof EnvironmentSchema>;

