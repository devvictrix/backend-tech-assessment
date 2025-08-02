import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { interviewHistoryService } from './interview-history.service';

class InterviewHistoryController {
    async findAllForInterview(req: Request, res: Response) {
        const { interviewId } = req.params;
        const history = await interviewHistoryService.findAllForInterview(interviewId);
        res.status(StatusCodes.OK).json(history);
    }
}
export const interviewHistoryController = new InterviewHistoryController();