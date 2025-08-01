import { z } from 'zod';
import { InterviewStatus } from '@prisma/client';

export const createInterviewSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
});

export const updateInterviewSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional().nullable(),
    status: z.nativeEnum(InterviewStatus).optional(),
    isSaved: z.boolean().optional(),
});

export type CreateInterviewDto = z.infer<typeof createInterviewSchema>;
export type UpdateInterviewDto = z.infer<typeof updateInterviewSchema>;