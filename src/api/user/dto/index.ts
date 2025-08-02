import { z } from 'zod';

export const updateUserRolesSchema = z.object({
    roles: z.array(z.string()).min(1, 'User must have at least one role'),
});

export type UpdateUserRolesDto = z.infer<typeof updateUserRolesSchema>;