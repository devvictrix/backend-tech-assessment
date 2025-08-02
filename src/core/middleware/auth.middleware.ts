import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '@/config/env';
import { prisma } from '@/config';
import { ApiError } from '../errors/api.error';
import { StatusCodes } from 'http-status-codes';

interface JwtPayload {
  userId: string;
  email: string;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, { message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { roles: true },
    });

    if (!user) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, { message: 'Unauthorized: User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, { message: 'Unauthorized: Invalid token' });
  }
};