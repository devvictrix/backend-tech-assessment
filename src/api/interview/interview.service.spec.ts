import { interviewService } from './interview.service';
import { interviewRepository } from './interview.repository';
import { ApiError } from '@/core/errors/api.error';
import { StatusCodes } from 'http-status-codes';

// Use a manual mock to ensure all methods are jest.fn()
jest.mock('./interview.repository', () => ({
    interviewRepository: {
        create: jest.fn(),
        findPaginated: jest.fn(),
        findById: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
        save: jest.fn(),
    },
}));

const mockedRepo = interviewRepository as jest.Mocked<typeof interviewRepository>;

const mockInterview = {
    id: 'interview-123',
    title: 'Sample Interview',
    userId: 'user-owner-123',
};

describe('InterviewService', () => {
    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();
    });

    describe('findOne', () => {
        it('should return an interview when found', async () => {
            mockedRepo.findById.mockResolvedValue(mockInterview as any);
            const result = await interviewService.findOne('interview-123');
            expect(mockedRepo.findById).toHaveBeenCalledWith('interview-123');
            expect(result).toEqual(mockInterview);
        });

        it('should throw a 404 Not Found error if the interview does not exist', async () => {
            mockedRepo.findById.mockResolvedValue(null);
            await expect(interviewService.findOne('non-existent-id')).rejects.toThrow(ApiError);
            await expect(interviewService.findOne('non-existent-id')).rejects.toHaveProperty('httpStatus', StatusCodes.NOT_FOUND);
        });
    });

    describe('update', () => {
        it('should throw a 403 Forbidden error if a user tries to update an interview they do not own', async () => {
            mockedRepo.findById.mockResolvedValue(mockInterview as any);
            const updateData = { title: 'Malicious Update' };
            await expect(interviewService.update('interview-123', 'user-hacker-456', updateData)).rejects.toThrow('You are not authorized to edit this interview');
        });
    });

    describe('save', () => {
        it('should successfully save an interview if the user is the owner', async () => {
            mockedRepo.findById.mockResolvedValue(mockInterview as any);
            await interviewService.save('interview-123', 'user-owner-123');
            expect(mockedRepo.save).toHaveBeenCalledWith('interview-123', 'user-owner-123');
        });

        it('should throw a 404 error if trying to save an interview that does not exist', async () => {
            mockedRepo.findById.mockResolvedValue(null);
            await expect(interviewService.save('non-existent-id', 'user-owner-123')).rejects.toThrow(ApiError);
        });
    });
});