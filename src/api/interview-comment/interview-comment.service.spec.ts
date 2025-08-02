import { interviewCommentService } from './interview-comment.service';
import { interviewCommentRepository } from './interview-comment.repository';
import { interviewService } from '../interview/interview.service';
import { ApiError } from '@/core/errors/api.error';
import { StatusCodes } from 'http-status-codes';

jest.mock('./interview-comment.repository');
jest.mock('../interview/interview.service');

const mockedCommentRepo = interviewCommentRepository as jest.Mocked<typeof interviewCommentRepository>;
const mockedInterviewService = interviewService as jest.Mocked<typeof interviewService>;

const mockComment = {
    id: 'comment-abc-123',
    content: 'This is a test comment.',
    userId: 'user-commenter-1',
    interviewId: 'interview-xyz-789',
    createdAt: new Date(),
    updatedAt: new Date(),
};

describe('InterviewCommentService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a comment successfully if the parent interview exists', async () => {
            // Arrange
            mockedInterviewService.findOne.mockResolvedValue({ id: 'interview-xyz-789' } as any);
            mockedCommentRepo.create.mockResolvedValue(mockComment as any);

            // Act
            const result = await interviewCommentService.create('user-commenter-1', 'interview-xyz-789', 'This is a test comment.');

            // Assert
            expect(mockedInterviewService.findOne).toHaveBeenCalledWith('interview-xyz-789');
            expect(mockedCommentRepo.create).toHaveBeenCalledWith('user-commenter-1', 'interview-xyz-789', 'This is a test comment.');
            expect(result).toEqual(mockComment);
        });

        it('should throw an error if the parent interview does not exist', async () => {
            // Arrange: Mock the parent check to fail
            mockedInterviewService.findOne.mockRejectedValue(new ApiError(StatusCodes.NOT_FOUND, { message: 'Interview not found' }));

            // Act & Assert
            await expect(
                interviewCommentService.create('user-commenter-1', 'non-existent-interview', 'This comment should fail')
            ).rejects.toThrow('Interview not found');
        });
    });

    describe('remove', () => {
        it('should throw a 403 Forbidden error if the user is not the owner of the comment', async () => {
            // Arrange
            mockedCommentRepo.findById.mockResolvedValue(mockComment as any);

            // Act & Assert
            await expect(interviewCommentService.remove('comment-abc-123', 'a-different-user-id')).rejects.toThrow(ApiError);
            await expect(interviewCommentService.remove('comment-abc-123', 'a-different-user-id')).rejects.toHaveProperty('httpStatus', StatusCodes.FORBIDDEN);
        });
    });
});