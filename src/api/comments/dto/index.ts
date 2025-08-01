import { z } from 'zod';

export const createCommentSchema = z.object({
    body: z.object({
        content: z.string().min(1, 'Comment content cannot be empty'),
    }),
});

export const updateCommentSchema = z.object({
    body: z.object({
        content: z.string().min(1, 'Comment content cannot be empty').optional(),
    }),
});