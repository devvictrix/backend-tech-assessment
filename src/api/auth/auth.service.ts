import { prisma } from '../../config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { env } from '../../config/env'; // <-- FIX: This import was missing

class AuthService {
    async register(data: Pick<User, 'email' | 'password'>): Promise<Omit<User, 'password'>> {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
            },
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async login(credentials: Pick<User, 'email' | 'password'>): Promise<string | null> {
        const user = await prisma.user.findUnique({
            where: { email: credentials.email },
        });

        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
            return null; // Invalid credentials
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            env.JWT_SECRET, // <-- This line will now work correctly
            { expiresIn: '1h' }
        );

        return token;
    }
}

export const authService = new AuthService();