import { z } from 'zod';

export const EnvironmentSchema = z.object({
    PORT: z.coerce.number().positive().optional().default(3000),
    // ...
});

export const config = EnvironmentSchema.parse(process.env);
export type Config = z.infer<typeof EnvironmentSchema>;

