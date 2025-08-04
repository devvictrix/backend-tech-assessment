import { getMockReq, getMockRes } from '@jest-mock/express';
import { authMiddleware } from './auth.middleware';
import { userRepository } from '@/api/user/user.repository';
import jwt from 'jsonwebtoken';
import { ApiError } from '../errors/api.error';
import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

// Mock the user repository and JWT library
jest.mock('@/api/user/user.repository', () => ({
    userRepository: {
        findByIdWithRoles: jest.fn(),
    },
}));
jest.mock('jsonwebtoken');

const mockedUserRepo = userRepository as jest.Mocked<typeof userRepository>;
const mockedJwt = jwt as jest.Mocked<typeof jwt>;
const { res: mockRes, next: mockNext, mockClear } = getMockRes();

describe('Auth Middleware', () => {
    beforeEach(() => {
        mockClear();
    });

    it('should call next() with an Unauthorized error if no authorization header is present', async () => {
        const mockReq = getMockReq();
        // --- THE FIX IS HERE: Use a two-step assertion via 'unknown' ---
        await authMiddleware(mockReq as unknown as Request, mockRes as unknown as Response, mockNext as NextFunction);
        expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
        expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({ httpStatus: StatusCodes.UNAUTHORIZED, message: 'Unauthorized: No token provided' }));
    });

    it('should call next() with an Unauthorized error if the token is invalid or expired', async () => {
        const mockReq = getMockReq({ headers: { authorization: 'Bearer invalidtoken' } });
        mockedJwt.verify.mockImplementation(() => { throw new Error('Invalid token'); });
        await authMiddleware(mockReq as unknown as Request, mockRes as unknown as Response, mockNext as NextFunction);
        expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({ message: 'Unauthorized: Invalid token' }));
    });

    it('should call next() with an Unauthorized error if the user in the token does not exist', async () => {
        const mockReq = getMockReq({ headers: { authorization: 'Bearer validtoken' } });
        mockedJwt.verify.mockReturnValue({ userId: 'non-existent-user' } as any);
        mockedUserRepo.findByIdWithRoles.mockResolvedValue(null);
        await authMiddleware(mockReq as unknown as Request, mockRes as unknown as Response, mockNext as NextFunction);
        expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({ message: 'Unauthorized: User not found' }));
    });

    it('should attach the user to req.user and call next() if the token is valid and user exists', async () => {
        const mockUser = { id: 'user-123', email: 'test@test.com', roles: [] };
        const mockReq = getMockReq({ headers: { authorization: 'Bearer validtoken' } });
        mockedJwt.verify.mockReturnValue({ userId: 'user-123' } as any);
        mockedUserRepo.findByIdWithRoles.mockResolvedValue(mockUser as any);

        await authMiddleware(mockReq as unknown as Request, mockRes as unknown as Response, mockNext as NextFunction);

        expect(mockReq.user).toEqual(mockUser);
        expect(mockNext).toHaveBeenCalledWith();
    });
});