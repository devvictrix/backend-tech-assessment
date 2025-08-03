import { interviewRepository } from './interview.repository';
import { CreateInterviewDto, PaginationQueryDto, UpdateInterviewDto } from './dto';
import { ApiError } from '@/core/errors/api.error';
import { StatusCodes } from 'http-status-codes';

class InterviewService {
    public async create(userId: string, data: CreateInterviewDto) {
        return interviewRepository.create(userId, data);
    }

    public async findAll(options: PaginationQueryDto) {
        const { total, interviews } = await interviewRepository.findPaginated(options);
        const totalPages = Math.ceil(total / options.limit);

        return {
            data: interviews,
            meta: {
                totalItems: total,
                itemCount: interviews.length,
                itemsPerPage: options.limit,
                totalPages: totalPages,
                currentPage: options.page,
            },
        };
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

    public async save(id: string, userId: string) {
        const interview = await this.findOne(id);
        if (interview.userId !== userId) {
            throw new ApiError(StatusCodes.FORBIDDEN, { message: 'You are not authorized to save this interview' });
        }
        return interviewRepository.save(id, userId);
    }
}

export const interviewService = new InterviewService();