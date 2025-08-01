import { Request, Response } from 'express';
import { cardsService } from './cards.service';
import { createCardSchema, updateCardSchema } from './dto';

class CardsController {
    async create(req: Request, res: Response) {
        try {
            const { title, description } = createCardSchema.parse(req).body;
            const authorId = req.user!.userId;
            const card = await cardsService.create({ title, description, authorId });
            res.status(201).json(card);
        } catch (error) {
            // FIX: Type-check the error before using it
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }

    // ... (findAll and findOne methods are fine) ...
    async findAll(req: Request, res: Response) {
        const cards = await cardsService.findAll();
        res.status(200).json(cards);
    }

    async findOne(req: Request, res: Response) {
        const card = await cardsService.findOne(req.params.id);
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json(card);
    }

    async update(req: Request, res: Response) {
        try {
            const data = updateCardSchema.parse(req).body;
            const cardId = req.params.id;
            const userId = req.user!.userId;

            const card = await cardsService.findOne(cardId);
            if (!card) {
                return res.status(404).json({ message: 'Card not found' });
            }
            if (card.authorId !== userId) {
                return res.status(403).json({ message: 'Forbidden: You can only edit your own cards' });
            }

            const updatedCard = await cardsService.update(cardId, data);
            res.status(200).json(updatedCard);
        } catch (error) {
            // FIX: Type-check the error before using it
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
    // ... (remove method is fine) ...
    async remove(req: Request, res: Response) {
        const cardId = req.params.id;
        const userId = req.user!.userId;

        const card = await cardsService.findOne(cardId);
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        if (card.authorId !== userId) {
            return res.status(403).json({ message: 'Forbidden: You can only delete your own cards' });
        }

        await cardsService.remove(cardId);
        res.status(204).send();
    }
}

export const cardsController = new CardsController();