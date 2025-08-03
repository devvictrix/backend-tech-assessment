import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('A valid email is required'),
    password: z.string(),
});
export type LoginDto = z.infer<typeof loginSchema>;