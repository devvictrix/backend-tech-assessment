import { z } from 'zod';

export const createCommentSchema = z.object({
    content: z.string().min(1, 'Comment content cannot be empty'),
});

export const updateCommentSchema = z.object({
    content: z.string().min(1, 'Comment content cannot be empty'),
});

export type CreateCommentDto = z.infer<typeof createCommentSchema>;
export type UpdateCommentDto = z.infer<typeof updateCommentSchema>;