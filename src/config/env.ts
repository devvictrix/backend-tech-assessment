import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

    // FIX: Add APP_URL validation
    APP_URL: z.string().url('APP_URL must be a valid URL'),

    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL string'),
    JWT_SECRET: z.string().min(1, 'JWT_SECRET cannot be empty'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error(
        '❌ Invalid environment variables:',
        parsedEnv.error.flatten().fieldErrors,
    );
    throw new Error('Invalid environment variables.');
}

export const env = parsedEnv.data;