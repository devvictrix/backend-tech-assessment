import { interviewRepository } from './interview.repository';
import { CreateInterviewDto, UpdateInterviewDto } from './dto';
import { ApiError } from '@/core/errors/api.error';
import { StatusCodes } from 'http-status-codes';

class InterviewService {
    public async create(userId: string, data: CreateInterviewDto) {
        return interviewRepository.create(userId, data);
    }

    public async findAll() {
        return interviewRepository.findMany();
    }

    public async findOne(id: string) {
        const interview = await interviewRepository.findById(id);
        if (!interview) {
            throw new ApiError(StatusCodes.NOT_FOUND, { message: 'Interview not found' });
        }

        return interview;
    }

    public async update(id: string, userId: string, data: UpdateInterviewDto) {
        const interview = await this.findOne(id);
        if (interview.userId !== userId) {
            throw new ApiError(StatusCodes.FORBIDDEN, { message: 'You are not authorized to edit this interview' });
        }

        return interviewRepository.update(id, userId, interview, data);
    }

    public async remove(id: string, userId: string) {
        const interview = await this.findOne(id);
        if (interview.userId !== userId) {
            throw new ApiError(StatusCodes.FORBIDDEN, { message: 'You are not authorized to delete this interview' });
        }

        return interviewRepository.remove(id);
    }
}

export const interviewService = new InterviewService();