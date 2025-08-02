import { prisma } from '@/config';

class InterviewHistoryRepository {
    public findManyForInterview(interviewId: string) {
        return prisma.interviewHistory.findMany({
            where: { interviewId },
            include: { user: { select: { id: true, email: true } } },
            orderBy: { changedAt: 'desc' },
        });
    }
}
export const interviewHistoryRepository = new InterviewHistoryRepository();