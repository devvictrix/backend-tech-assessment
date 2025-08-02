import { prisma } from '@/config';

class UserRepository {
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
                    set: roleKeys.map(key => ({ key })),
                },
            },
            include: { roles: true },
        });
    }
}

export const userRepository = new UserRepository();