import { authService } from './auth.service';
import { userRepository } from '@/api/user/user.repository';
import bcrypt from 'bcryptjs';

// Manually mock the user repository
jest.mock('@/api/user/user.repository', () => ({
    userRepository: {
        findByEmail: jest.fn(),
    },
}));
// Mock bcrypt's compare function
jest.mock('bcryptjs');

const mockedUserRepo = userRepository as jest.Mocked<typeof userRepository>;
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe('AuthService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('login', () => {
        const mockUser = {
            id: 'user-123',
            email: 'test@example.com',
            password: 'hashedpassword',
            // ... other user fields
        };

        it('should return a JWT token for valid credentials', async () => {
            mockedUserRepo.findByEmail.mockResolvedValue(mockUser as any);
            mockedBcrypt.compare.mockResolvedValue(true as never); // Cast to 'never' for type safety

            const token = await authService.login({ email: 'test@example.com', password: 'password123' });

            expect(token).toBeDefined();
            expect(typeof token).toBe('string');
        });

        it('should throw a 401 Unauthorized error for a non-existent user', async () => {
            mockedUserRepo.findByEmail.mockResolvedValue(null);

            await expect(authService.login({ email: 'nouser@example.com', password: 'password123' })).rejects.toThrow('Invalid email or password');
        });

        it('should throw a 401 Unauthorized error for an incorrect password', async () => {
            mockedUserRepo.findByEmail.mockResolvedValue(mockUser as any);
            mockedBcrypt.compare.mockResolvedValue(false as never); // Mock password mismatch

            await expect(authService.login({ email: 'test@example.com', password: 'wrongpassword' })).rejects.toThrow('Invalid email or password');
        });
    });
});