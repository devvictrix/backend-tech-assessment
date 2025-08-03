import { prisma } from '@/config';

class InterviewCommentRepository {
    public create(userId: string, interviewId: string, content: string) {
        return prisma.$transaction(async (tx) => {
            const newComment = await tx.interviewComment.create({
                data: { content, userId, interviewId },
            });

            await tx.interviewHistory.create({
                data: {
                    action: 'COMMENT_ADDED',
                    newValue: `Added comment: "${content}"`,
                    interviewId: interviewId,
                    userId: userId,
                },
            });

            return newComment;
        });
    }

    public findManyForInterview(interviewId: string) {
        return prisma.interviewComment.findMany({
            where: { interviewId },
            include: { user: { select: { id: true, email: true, name: true } } },
            orderBy: { createdAt: 'asc' },
        });
    }

    public findById(id: string) {
        return prisma.interviewComment.findUnique({ where: { id } });
    }

    public update(commentId: string, userId: string, interviewId: string, oldContent: string, newContent: string) {
        return prisma.$transaction(async (tx) => {
            const updatedComment = await tx.interviewComment.update({
                where: { id: commentId },
                data: { content: newContent },
            });

            await tx.interviewHistory.create({
                data: {
                    action: 'COMMENT_UPDATED',
                    oldValue: `"${oldContent}"`,
                    newValue: `"${newContent}"`,
                    interviewId: interviewId,
                    userId: userId,
                },
            });

            return updatedComment;
        });
    }

    public remove(commentId: string, userId: string, interviewId: string, oldContent: string) {
        return prisma.$transaction(async (tx) => {
            await tx.interviewComment.delete({ where: { id: commentId } });

            await tx.interviewHistory.create({
                data: {
                    action: 'COMMENT_DELETED',
                    oldValue: `Deleted comment: "${oldContent}"`,
                    interviewId: interviewId,
                    userId: userId,
                },
            });
        });
    }
}

export const interviewCommentRepository = new InterviewCommentRepository();