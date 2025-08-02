import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userService } from './user.service';
import { updateUserRolesSchema } from './dto';

class UserController {
    async findAll(req: Request, res: Response) {
        const users = await userService.findAll();
        res.status(StatusCodes.OK).json(users);
    }

    async findOne(req: Request, res: Response) {
        const user = await userService.findOne(req.params.id);
        res.status(StatusCodes.OK).json(user);
    }

    async updateUserRoles(req: Request, res: Response) {
        const updateDto = updateUserRolesSchema.parse(req.body);
        const updatedUser = await userService.updateUserRoles(req.params.id, updateDto);
        res.status(StatusCodes.OK).json(updatedUser);
    }
}

export const userController = new UserController();