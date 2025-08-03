import { Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { authService } from '@/api/auth/auth.service';
import { loginSchema } from '@/api/auth/dto';
import { ApiResponse } from '@/core/interfaces/api.interface';

class AuthController {
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