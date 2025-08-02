import { interviewService } from './interview.service';
import { interviewRepository } from './interview.repository';
import { ApiError } from '@/core/errors/api.error';
import { StatusCodes } from 'http-status-codes';

jest.mock('./interview.repository');

const mockedRepo = interviewRepository as jest.Mocked<typeof interviewRepository>;

const mockInterview = {
    id: 'clx123abc',
    title: 'Sample Interview',
    description: 'A test description',
    status: 'TODO',
    isSaved: false,
    userId: 'user-owner-123',
    createdAt: new Date(),
    updatedAt: new Date(),
    user: { id: 'user-owner-123', email: 'owner@test.com' },
    comments: [],
};

describe('InterviewService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('findOne', () => {
        it('should return an interview when found', async () => {
            // Arrange: Tell the mock repository to return our sample interview when findById is called.
            mockedRepo.findById.mockResolvedValue(mockInterview as any);

            // Act: Call the service method we are testing.
            const result = await interviewService.findOne('clx123abc');

            // Assert: Check that the repository was called and the result is correct.
            expect(mockedRepo.findById).toHaveBeenCalledWith('clx123abc');
            expect(result).toEqual(mockInterview);
        });

        it('should throw a 404 Not Found error if the interview is not found', async () => {
            // Arrange: Tell the mock repository to return null.
            mockedRepo.findById.mockResolvedValue(null);

            // Act & Assert: Expect the service call to be rejected with a specific ApiError.
            await expect(interviewService.findOne('non-existent-id')).rejects.toThrow(ApiError);
            await expect(interviewService.findOne('non-existent-id')).rejects.toHaveProperty('httpStatus', StatusCodes.NOT_FOUND);
        });
    });

    describe('update', () => {
        it('should update the interview if the user is the owner', async () => {
            // Arrange
            mockedRepo.findById.mockResolvedValue(mockInterview as any); // The user must exist to be updated
            const updateData = { title: 'Updated Title' };

            // Act
            await interviewService.update('clx123abc', 'user-owner-123', updateData);

            // Assert: Verify that the update method on the repository was called correctly.
            expect(mockedRepo.update).toHaveBeenCalledWith('clx123abc', 'user-owner-123', mockInterview, updateData);
        });

        it('should throw a 403 Forbidden error if the user is not the owner', async () => {
            // Arrange
            mockedRepo.findById.mockResolvedValue(mockInterview as any);
            const updateData = { title: 'Malicious Update Attempt' };

            // Act & Assert
            await expect(interviewService.update('clx123abc', 'user-hacker-456', updateData)).rejects.toThrow(ApiError);
            await expect(interviewService.update('clx123abc', 'user-hacker-456', updateData)).rejects.toHaveProperty('httpStatus', StatusCodes.FORBIDDEN);
        });
    });

    describe('remove', () => {
        it('should remove the interview if the user is the owner', async () => {
            // Arrange
            mockedRepo.findById.mockResolvedValue(mockInterview as any);

            // Act
            await interviewService.remove('clx123abc', 'user-owner-123');

            // Assert
            expect(mockedRepo.remove).toHaveBeenCalledWith('clx123abc');
        });

        it('should throw a 403 Forbidden error if the user is not the owner', async () => {
            // Arrange
            mockedRepo.findById.mockResolvedValue(mockInterview as any);

            // Act & Assert
            await expect(interviewService.remove('clx123abc', 'user-hacker-456')).rejects.toThrow(ApiError);
            await expect(interviewService.remove('clx123abc', 'user-hacker-456')).rejects.toHaveProperty('httpStatus', StatusCodes.FORBIDDEN);
        });
    });
});