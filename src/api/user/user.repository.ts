import { Prisma, Role, User } from '@prisma/client';
import { prisma } from '@/config';

export type UserWithCleanRoles = User & { roles: Role[] };

class UserRepository {
    public findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { email },
        });
    }

    public create(data: Prisma.UserCreateInput): Promise<User> {
        return prisma.user.create({ data });
    }

    public findMany() {
        return prisma.user.findMany({
            include: { roles: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    public findById(id: string) {
        return prisma.user.findUnique({
            where: { id },
            include: { roles: true },
        });
    }

    public updateUserRoles(id: string, roleKeys: string[]) {
        return prisma.user.update({
            where: { id },
            data: {
                roles: {
                    deleteMany: {},
                    create: roleKeys.map(key => ({
                        role: {
                            connect: { key },
                        },
                    })),
                },
            },
            include: { roles: { include: { role: true } } },
        });
    }

    public async findByIdWithRoles(id: string): Promise<UserWithCleanRoles | null> {
        const userWithNestedRoles = await prisma.user.findUnique({
            where: { id },
            include: {
                roles: {
                    include: {
                        role: true,
                    },
                },
            },
        });

        if (!userWithNestedRoles) {
            return null;
        }

        const transformedUser = {
            ...userWithNestedRoles,
            roles: userWithNestedRoles.roles.map(userRole => userRole.role),
        };

        return transformedUser;
    }
}

export const userRepository = new UserRepository();