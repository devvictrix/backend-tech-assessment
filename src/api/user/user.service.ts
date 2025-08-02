import { userRepository } from './user.repository';
import { ApiError } from '@/core/errors/api.error';
import { StatusCodes } from 'http-status-codes';
import { UpdateUserRolesDto } from './dto';

class UserService {
    public async findAll() {
        return userRepository.findMany();
    }

    public async findOne(id: string) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, { message: 'User not found' });
        }
        return user;
    }

    public async updateUserRoles(id: string, data: UpdateUserRolesDto) {
        await this.findOne(id);
        return userRepository.updateUserRoles(id, data.roles);
    }
}

export const userService = new UserService();