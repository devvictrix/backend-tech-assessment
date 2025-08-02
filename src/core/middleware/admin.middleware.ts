import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/api.error';
import { StatusCodes } from 'http-status-codes';

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || !user.roles.some(role => role.key === 'admin')) {
        throw new ApiError(StatusCodes.FORBIDDEN, { message: 'Forbidden: Administrator access required' });
    }

    next();
};