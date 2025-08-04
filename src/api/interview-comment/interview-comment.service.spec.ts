import { interviewCommentService } from './interview-comment.service';
import { interviewCommentRepository } from './interview-comment.repository';
import { interviewService } from '../interview/interview.service';
import { ApiError } from '@/core/errors/api.error';

// Use manual mocks for both dependencies
jest.mock('./interview-comment.repository', () => ({
    interviewCommentRepository: {
        create: jest.fn(),
        findById: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    },
}));
jest.mock('../interview/interview.service');

const mockedCommentRepo = interviewCommentRepository as jest.Mocked<typeof interviewCommentRepository>;
const mockedInterviewService = interviewService as jest.Mocked<typeof interviewService>;

const mockComment = {
    id: 'comment-abc-123',
    content: 'Original content',
    userId: 'user-commenter-1',
    interviewId: 'interview-xyz-789',
};

describe('InterviewCommentService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should throw an error if the parent interview does not exist', async () => {
            mockedInterviewService.findOne.mockRejectedValue(new ApiError(404, { message: 'Interview not found' }));
            await expect(interviewCommentService.create('user-1', 'non-existent-interview', 'test')).rejects.toThrow('Interview not found');
        });
    });

    describe('update', () => {
        it('should correctly call the repository with old and new content', async () => {
            mockedCommentRepo.findById.mockResolvedValue(mockComment as any);
            const updateDto = { content: 'Updated content' };

            await interviewCommentService.update('comment-abc-123', 'user-commenter-1', updateDto);

            expect(mockedCommentRepo.update).toHaveBeenCalledWith(
                'comment-abc-123',      // commentId
                'user-commenter-1',      // userId
                'interview-xyz-789',  // interviewId
                'Original content',      // oldContent
                'Updated content'        // newContent
            );
        });
    });
});