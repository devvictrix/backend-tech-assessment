import dotenv from 'dotenv';
import ms from 'ms';
import { z } from 'zod';
import { NodeEnv } from '@/config/constants';

dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.nativeEnum(NodeEnv).default(NodeEnv.Development),
    PORT: z.coerce.number().default(3000),
    APP_URL: z.string().url('A valid APP_URL is required (e.g., http://localhost:3000)'),
    API_PREFIX: z.string().trim().min(1, 'A non-empty API_PREFIX is required (e.g., "api")'),
    DATABASE_URL: z.string().url('A valid DATABASE_URL is required'),
    JWT_SECRET: z.string().min(1, 'A JWT_SECRET is required'),
    JWT_EXPIRES_IN: z
        .string()
        .default('1h')
        .refine(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (value: any) => {
                const milliseconds = ms(value);
                return typeof milliseconds === 'number';
            },
            {
                message: "Invalid JWT_EXPIRES_IN format. Use 'ms' library format (e.g., '1h', '7d').",
            }
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .transform((value: any) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const milliseconds = ms(value) as any;
            return Math.floor(milliseconds / 1000);
        }),
    RATE_LIMIT_WINDOW_MS: z.coerce.number().default(15 * 60 * 1000),
    RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100),
    SHUTDOWN_TIMEOUT: z.coerce.number().int().default(10000),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error(
        '❌ FATAL: Invalid environment variables. Please check your .env file:',
        parsedEnv.error.flatten().fieldErrors,
    );
    process.exit(1);
}

export const env = parsedEnv.data;