import { Router } from 'express';
import { interviewCommentController } from './interview-comment.controller';

export const interviewCommentRoutes = Router({ mergeParams: true });

interviewCommentRoutes.route('/')
    .get(interviewCommentController.findAllForInterview)
    .post(interviewCommentController.create);
interviewCommentRoutes.route('/:commentId')
    .patch(interviewCommentController.update)
    .delete(interviewCommentController.remove);