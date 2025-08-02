import { Router } from 'express';
import { interviewHistoryController } from './interview-history.controller';

export const interviewHistoryRoutes = Router({ mergeParams: true });

interviewHistoryRoutes.get('/', interviewHistoryController.findAllForInterview);