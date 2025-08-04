import { getMockReq, getMockRes } from '@jest-mock/express';
import { adminMiddleware } from './admin.middleware';
import { ApiError } from '../errors/api.error';
import { Request, Response, NextFunction } from 'express';

const { res: mockRes, next: mockNext, mockClear } = getMockRes();

describe('Admin Middleware', () => {
    beforeEach(() => {
        mockClear();
    });

    it('should throw a 403 Forbidden error if there is no user on the request', () => {
        const mockReq = getMockReq();
        // --- THE FIX IS HERE: Use a two-step assertion via 'unknown' ---
        const callMiddleware = () => adminMiddleware(mockReq as unknown as Request, mockRes as unknown as Response, mockNext as NextFunction);
        expect(callMiddleware).toThrow(ApiError);
        expect(callMiddleware).toThrow('Forbidden: Administrator access required');
    });

    it('should throw a 403 Forbidden error if the user does not have the "admin" role', () => {
        const mockUser = { roles: [{ key: 'interviewer' }] };
        const mockReq = getMockReq({ user: mockUser as any });
        const callMiddleware = () => adminMiddleware(mockReq as unknown as Request, mockRes as unknown as Response, mockNext as NextFunction);
        expect(callMiddleware).toThrow(ApiError);
    });

    it('should call next() if the user has the "admin" role', () => {
        const mockUser = { roles: [{ key: 'interviewer' }, { key: 'admin' }] };
        const mockReq = getMockReq({ user: mockUser as any });
        adminMiddleware(mockReq as unknown as Request, mockRes as unknown as Response, mockNext as NextFunction);
        expect(mockNext).toHaveBeenCalledWith();
    });
});