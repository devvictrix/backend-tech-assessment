import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LoginDto } from '@/api/auth/dto';
import { env } from '@/config/env';
import { ApiError } from '@/core/errors/api.error';
import { userRepository } from '@/api/user/user.repository';

class AuthService {
    public async findUserByEmail(email: string): Promise<User | null> {
        return userRepository.findByEmail(email);
    }

    public async login(credentials: LoginDto): Promise<string> {
        const user = await userRepository.findByEmail(credentials.email);

        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
            throw new ApiError(401, { message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            env.JWT_SECRET,
            { expiresIn: env.JWT_EXPIRES_IN }
        );

        return token;
    }
}

export const authService = new AuthService();