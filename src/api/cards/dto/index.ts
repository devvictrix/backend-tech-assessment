import { z } from 'zod';

export const createCardSchema = z.object({
    body: z.object({
        title: z.string().min(1, 'Title is required'),
        description: z.string().optional(),
    }),
});

export const updateCardSchema = z.object({
    body: z.object({
        title: z.string().min(1, 'Title is required').optional(),
        description: z.string().optional(),
    }),
});