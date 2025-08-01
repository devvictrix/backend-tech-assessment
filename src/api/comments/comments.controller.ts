import { Request, Response } from 'express';
import { commentsService } from './comments.service';
import { createCommentSchema, updateCommentSchema } from './dto';
import { cardsService } from '../cards/cards.service';

class CommentsController {
    async create(req: Request, res: Response) {
        try {
            const { cardId } = req.params;
            const card = await cardsService.findOne(cardId);
            if (!card) {
                return res.status(404).json({ message: 'Card not found' });
            }

            const { content } = createCommentSchema.parse(req).body;
            const authorId = req.user!.userId;

            const comment = await commentsService.create({ content, authorId, cardId });
            res.status(201).json(comment);
        } catch (error) {
            // FIX: Type-check the error before using it
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }

    // ... (findAllForCard is fine) ...
    async findAllForCard(req: Request, res: Response) {
        const { cardId } = req.params;
        const comments = await commentsService.findAllForCard(cardId);
        res.status(200).json(comments);
    }

    async update(req: Request, res: Response) {
        try {
            const { commentId } = req.params;
            const userId = req.user!.userId;

            const comment = await commentsService.findOne(commentId);
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            if (comment.authorId !== userId) {
                return res.status(403).json({ message: 'Forbidden: You can only edit your own comments' });
            }

            const { content } = updateCommentSchema.parse(req).body;
            const updatedComment = await commentsService.update(commentId, content!);
            res.status(200).json(updatedComment);
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
        const { commentId } = req.params;
        const userId = req.user!.userId;

        const comment = await commentsService.findOne(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        if (comment.authorId !== userId) {
            return res.status(403).json({ message: 'Forbidden: You can only delete your own comments' });
        }

        await commentsService.remove(commentId);
        res.status(204).send();
    }
}

export const commentsController = new CommentsController();