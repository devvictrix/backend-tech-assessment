import { prisma } from '@/config';

class InterviewCommentRepository {
    public create(userId: string, interviewId: string, content: string) {
        return prisma.interviewComment.create({
            data: {
                content,
                userId,
                interviewId,
            },
        });
    }

    public findManyForInterview(interviewId: string) {
        return prisma.interviewComment.findMany({
            where: { interviewId },
            include: { user: { select: { id: true, email: true } } },
            orderBy: { createdAt: 'asc' },
        });
    }

    public findById(id: string) {
        return prisma.interviewComment.findUnique({ where: { id } });
    }

    public update(id: string, content: string) {
        return prisma.interviewComment.update({ where: { id }, data: { content } });
    }

    public remove(id: string) {
        return prisma.interviewComment.delete({ where: { id } });
    }
}

export const interviewCommentRepository = new InterviewCommentRepository();