import { Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { authService } from '@/api/auth/auth.service';
import { loginSchema, registerSchema } from '@/api/auth/dto';
import { ApiError } from '@/core/errors/api.error';
import { ApiResponse } from '@/core/interfaces/api.interface';

class AuthController {
    async register(req: Request, res: Response) {
        const registerDto = registerSchema.parse(req.body);

        const existingUser = await authService.findUserByEmail(registerDto.email);
        if (existingUser) {
            throw new ApiError(StatusCodes.CONFLICT, { message: 'User with this email already exists' });
        }

        const user = await authService.register(registerDto);

        const response: ApiResponse<typeof user> = {
            code: StatusCodes.CREATED.toString(),
            message: getReasonPhrase(StatusCodes.CREATED),
            data: user,
        };
        res.status(StatusCodes.CREATED).json(response);
    }

    async login(req: Request, res: Response) {
        const loginDto = loginSchema.parse(req.body);
        const token = await authService.login(loginDto);

        const response: ApiResponse<{ token: string }> = {
            code: StatusCodes.OK.toString(),
            message: getReasonPhrase(StatusCodes.OK),
            data: { token },
        };
        res.status(StatusCodes.OK).json(response);
    }
}

export const authController = new AuthController();