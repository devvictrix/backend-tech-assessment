import { prisma } from '../../config';
import { Card } from '@prisma/client';

class CardsService {
    async create(data: { title: string; description?: string; authorId: string }): Promise<Card> {
        return prisma.card.create({ data });
    }

    async findAll(): Promise<Card[]> {
        return prisma.card.findMany();
    }

    async findOne(id: string): Promise<Card | null> {
        return prisma.card.findUnique({ where: { id } });
    }

    async update(id: string, data: Partial<Pick<Card, 'title' | 'description'>>): Promise<Card> {
        return prisma.card.update({ where: { id }, data });
    }

    async remove(id: string): Promise<Card> {
        return prisma.card.delete({ where: { id } });
    }
}

export const cardsService = new CardsService();