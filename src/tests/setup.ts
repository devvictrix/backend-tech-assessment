import { PrismaClient } from '@prisma/client';
// FIX: Correct the import for DeepMockProxy
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { prisma } from '../config';

jest.mock('../config', () => ({
    __esModule: true,
    prisma: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
    mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;