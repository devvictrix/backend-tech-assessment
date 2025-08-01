import { Request, Response } from 'express';
import { authService } from './auth.service';
import { loginSchema, registerSchema } from './dto';
import { prisma } from '../../config'; // <-- FIX: Import prisma

class AuthController {
    async register(req: Request, res: Response) {
        try {
            const { email, password } = registerSchema.parse(req).body;

            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                return res.status(409).json({ message: 'User with this email already exists' });
            }

            const user = await authService.register({ email, password });
            res.status(201).json(user);
        } catch (error) {
            // FIX: Type-check the error before using it
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = loginSchema.parse(req).body;
            const token = await authService.login({ email, password });

            if (!token) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            res.json({ token });
        } catch (error) {
            // FIX: Type-check the error before using it
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
}

export const authController = new AuthController();