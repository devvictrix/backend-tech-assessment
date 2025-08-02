import { Router } from 'express';
import { interviewController } from './interview.controller';
import { interviewCommentRoutes } from '../interview-comment/interview-comment.routes';
import { interviewHistoryRoutes } from '../interview-history/interview-history.routes';

const interviewRoutes = Router();

interviewRoutes.route('/')
    .get(interviewController.findAll)
    .post(interviewController.create);
interviewRoutes.route('/:id')
    .get(interviewController.findOne)
    .patch(interviewController.update)
    .delete(interviewController.remove);
interviewRoutes.use('/:interviewId/comments', interviewCommentRoutes);
interviewRoutes.use('/:interviewId/history', interviewHistoryRoutes);

export { interviewRoutes };