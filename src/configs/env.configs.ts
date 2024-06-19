import { z } from 'zod';

export const EnvironmentSchema = z.object({
    PORT: z.coerce.number().positive().optional().default(3000),
    DB_HOST: z.string(),
    DB_PORT: z.number().positive(),
    DB_USERNAME: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
});

export const config = EnvironmentSchema.parse(process.env);
export type Config = z.infer<typeof EnvironmentSchema>;

