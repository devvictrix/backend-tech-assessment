import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { interviewService } from './interview.service';
import { createInterviewSchema, updateInterviewSchema } from './dto';

class InterviewController {
    async create(req: Request, res: Response) {
        const createDto = createInterviewSchema.parse(req.body);
        const userId = req.user!.id;
        const interview = await interviewService.create(userId, createDto);
        res.status(StatusCodes.CREATED).json(interview);
    }

    async findAll(req: Request, res: Response) {
        const interviews = await interviewService.findAll();
        res.status(StatusCodes.OK).json(interviews);
    }

    async findOne(req: Request, res: Response) {
        const interview = await interviewService.findOne(req.params.id);
        res.status(StatusCodes.OK).json(interview);
    }

    async update(req: Request, res: Response) {
        const updateDto = updateInterviewSchema.parse(req.body);
        const userId = req.user!.id;
        const interview = await interviewService.update(req.params.id, userId, updateDto);
        res.status(StatusCodes.OK).json(interview);
    }

    async remove(req: Request, res: Response) {
        const userId = req.user!.id;
        await interviewService.remove(req.params.id, userId);
        res.status(StatusCodes.NO_CONTENT).send();
    }
}

export const interviewController = new InterviewController();