import { prisma } from '../../config';
import { Comment } from '@prisma/client';

class CommentsService {
    async create(data: { content: string; authorId: string; cardId: string }): Promise<Comment> {
        return prisma.comment.create({ data });
    }

    async findAllForCard(cardId: string): Promise<Comment[]> {
        return prisma.comment.findMany({
            where: { cardId },
            include: { author: { select: { id: true, email: true } } }, // Also include author info
        });
    }

    async findOne(id: string): Promise<Comment | null> {
        return prisma.comment.findUnique({ where: { id } });
    }

    async update(id: string, content: string): Promise<Comment> {
        return prisma.comment.update({
            where: { id },
            data: { content },
        });
    }

    async remove(id: string): Promise<Comment> {
        return prisma.comment.delete({ where: { id } });
    }
}

export const commentsService = new CommentsService();