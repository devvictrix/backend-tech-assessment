import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email('A valid email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});
export type RegisterDto = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: z.string().email('A valid email is required'),
    password: z.string(),
});
export type LoginDto = z.infer<typeof loginSchema>;