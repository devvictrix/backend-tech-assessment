import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cuid from 'cuid';
import { userRepository } from '@/api/auth/auth.repository';
import { LoginDto, RegisterDto } from '@/api/auth/dto';
import { env } from '@/config/env';
import { ApiError } from '@/core/errors/api.error';

class AuthService {
    public async findUserByEmail(email: string): Promise<User | null> {
        return userRepository.findByEmail(email);
    }

    public async register(data: RegisterDto): Promise<Omit<User, 'password'>> {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await userRepository.create({
            email: data.email,
            password: hashedPassword,
            key: `user_${cuid()}`,
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
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