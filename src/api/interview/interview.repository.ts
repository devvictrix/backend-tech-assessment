import { Prisma } from '@prisma/client';
import { prisma } from '@/config';
import { CreateInterviewDto, UpdateInterviewDto } from './dto';

class InterviewRepository {
    public create(userId: string, data: CreateInterviewDto) {
        return prisma.$transaction(async (tx) => {
            const interview = await tx.interview.create({
                data: {
                    title: data.title,
                    description: data.description,
                    userId: userId,
                },
            });

            await tx.interviewHistory.create({
                data: {
                    action: 'CREATED',
                    newValue: `Interview created with status ${interview.status}`,
                    interviewId: interview.id,
                    userId: userId,
                },
            });

            return interview;
        });
    }

    public findMany() {
        return prisma.interview.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    public findById(id: string) {
        return prisma.interview.findUnique({
            where: { id },
            include: {
                user: { select: { id: true, email: true } },
                comments: {
                    include: { user: { select: { id: true, email: true } } },
                    orderBy: { createdAt: 'asc' },
                },
            },
        });
    }

    public update(id: string, userId: string, oldData: Prisma.InterviewGetPayload<{}>, data: UpdateInterviewDto) {
        return prisma.$transaction(async (tx) => {
            const updatedInterview = await tx.interview.update({
                where: { id },
                data: data,
            });

            const historyRecords: Prisma.InterviewHistoryCreateManyInput[] = [];
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    const typedKey = key as keyof UpdateInterviewDto;
                    if (oldData[typedKey] !== data[typedKey]) {
                        historyRecords.push({
                            action: `UPDATED_${key.toUpperCase()}`,
                            oldValue: String(oldData[typedKey] ?? 'null'),
                            newValue: String(data[typedKey] ?? 'null'),
                            interviewId: id,
                            userId: userId,
                        });
                    }
                }
            }

            if (historyRecords.length > 0) {
                await tx.interviewHistory.createMany({
                    data: historyRecords,
                });
            }

            return updatedInterview;
        });
    }

    public remove(id: string) {
        return prisma.interview.delete({ where: { id } });
    }
}

export const interviewRepository = new InterviewRepository();