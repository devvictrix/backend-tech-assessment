import { Router } from 'express';
import { adminMiddleware } from '@/core/middleware/admin.middleware';
import { userController } from './user.controller';

const userRoutes = Router();
userRoutes.use(adminMiddleware);

userRoutes.get('/', userController.findAll);
userRoutes.get('/:id', userController.findOne);
userRoutes.patch('/:id/roles', userController.updateUserRoles);

export { userRoutes };