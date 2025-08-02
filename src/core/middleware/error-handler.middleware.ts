import { Request, Response, NextFunction } from 'express';
import { env } from '@/config/env';
import { logger } from '@/config/logger';
import { ApiError } from '@/core/errors/api.error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);

    if (err instanceof ApiError) {
        const responseBody = err.toApiResponse();
        return res.status(err.httpStatus).json(responseBody);
    }

    const errorData = (env.NODE_ENV !== 'production') ? { name: err.name, stack: err.stack } : undefined;
    const unexpectedError = new ApiError(
        500,
        { data: errorData }
    );

    res.status(unexpectedError.httpStatus).json(unexpectedError.toApiResponse());
};