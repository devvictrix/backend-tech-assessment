import { interviewService } from '../interview/interview.service';
import { interviewCommentRepository } from './interview-comment.repository';
import { ApiError } from '@/core/errors/api.error';
import { StatusCodes } from 'http-status-codes';
import { UpdateCommentDto } from './dto';

class InterviewCommentService {
    public async create(userId: string, interviewId: string, content: string) {
        await interviewService.findOne(interviewId);
        return interviewCommentRepository.create(userId, interviewId, content);
    }

    public async findOne(id: string) {
        const comment = await interviewCommentRepository.findById(id);
        if (!comment) {
            throw new ApiError(StatusCodes.NOT_FOUND, { message: 'Comment not found' });
        }
        return comment;
    }

    public async findAllForInterview(interviewId: string) {
        await interviewService.findOne(interviewId);
        return interviewCommentRepository.findManyForInterview(interviewId);
    }

    public async update(commentId: string, userId: string, data: UpdateCommentDto) {
        const comment = await this.findOne(commentId);
        if (comment.userId !== userId) {
            throw new ApiError(StatusCodes.FORBIDDEN, { message: 'You can only edit your own comments' });
        }
        return interviewCommentRepository.update(commentId, data.content);
    }

    public async remove(commentId: string, userId: string) {
        const comment = await this.findOne(commentId);
        if (comment.userId !== userId) {
            throw new ApiError(StatusCodes.FORBIDDEN, { message: 'You can only delete your own comments' });
        }
        return interviewCommentRepository.remove(commentId);
    }
}

export const interviewCommentService = new InterviewCommentService();