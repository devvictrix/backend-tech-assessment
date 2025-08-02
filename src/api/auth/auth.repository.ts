import { Prisma, User } from '@prisma/client';
import { prisma } from '@/config';

class UserRepository {
    public findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { email },
        });
    }

    public create(data: Prisma.UserCreateInput): Promise<User> {
        return prisma.user.create({ data });
    }
}

export const userRepository = new UserRepository();