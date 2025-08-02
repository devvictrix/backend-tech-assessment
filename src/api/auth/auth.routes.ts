import { Router } from 'express';
import { authController } from '@/api/auth/auth.controller';

const authRoutes = Router();

authRoutes.post('/register', authController.register);
authRoutes.post('/login', authController.login);

export { authRoutes };