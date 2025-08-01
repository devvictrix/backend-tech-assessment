import { Router } from 'express';
import { commentsController } from './comments.controller';

export const commentsRoutes = Router({ mergeParams: true });

/**
 * @openapi
 * components:
 *  schemas:
 *    Comment:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        content:
 *          type: string
 *        authorId:
 *          type: string
 *        cardId:
 *          type: string
 * 
 * /api/cards/{cardId}/comments:
 *   get:
 *     tags: [Comments]
 *     summary: Get all comments for a card
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of comments
 *   post:
 *     tags: [Comments]
 *     summary: Create a new comment on a card
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created
 *       404:
 *         description: Card not found
 * 
 * /api/cards/{cardId}/comments/{commentId}:
 *   patch:
 *     tags: [Comments]
 *     summary: Update a comment
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated
 *   delete:
 *     tags: [Comments]
 *     summary: Delete a comment
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Comment deleted
 */

commentsRoutes.post('/', commentsController.create);
commentsRoutes.get('/', commentsController.findAllForCard);
commentsRoutes.patch('/:commentId', commentsController.update);
commentsRoutes.delete('/:commentId', commentsController.remove);