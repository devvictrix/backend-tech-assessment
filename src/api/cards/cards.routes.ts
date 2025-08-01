import { Router } from 'express';
import { cardsController } from './cards.controller';
import { commentsRoutes } from '../comments/comments.routes';

export const cardsRoutes = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Card:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         authorId:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 * /api/cards:
 *   get:
 *     tags: [Cards]
 *     summary: Retrieve a list of cards
 *     responses:
 *       200:
 *         description: A list of cards.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Card'
 *   post:
 *     tags: [Cards]
 *     summary: Create a new card
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Card created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 * 
 * /api/cards/{id}:
 *   get:
 *     tags: [Cards]
 *     summary: Get a card by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Card details
 *       404:
 *         description: Card not found
 *   patch:
 *     tags: [Cards]
 *     summary: Update a card
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Card updated
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Card not found
 *   delete:
 *     tags: [Cards]
 *     summary: Delete a card
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Card deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Card not found
 */

cardsRoutes.post('/', cardsController.create);
cardsRoutes.get('/', cardsController.findAll);
cardsRoutes.get('/:id', cardsController.findOne);
cardsRoutes.patch('/:id', cardsController.update);
cardsRoutes.delete('/:id', cardsController.remove);

cardsRoutes.use('/:cardId/comments', commentsRoutes);