import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { interviewCommentService } from './interview-comment.service';
import { createCommentSchema, updateCommentSchema } from './dto';

class InterviewCommentController {
  async create(req: Request, res: Response) {
    const { interviewId } = req.params;
    const { content } = createCommentSchema.parse(req.body);
    const userId = req.user!.id;
    const comment = await interviewCommentService.create(userId, interviewId, content);
    res.status(StatusCodes.CREATED).json(comment);
  }

  async findAllForInterview(req: Request, res: Response) {
    const { interviewId } = req.params;
    const comments = await interviewCommentService.findAllForInterview(interviewId);
    res.status(StatusCodes.OK).json(comments);
  }

  async update(req: Request, res: Response) {
    const { commentId } = req.params;
    const updateDto = updateCommentSchema.parse(req.body);
    const userId = req.user!.id;
    const updatedComment = await interviewCommentService.update(commentId, userId, updateDto);
    res.status(StatusCodes.OK).json(updatedComment);
  }

  async remove(req: Request, res: Response) {
    const { commentId } = req.params;
    const userId = req.user!.id;
    await interviewCommentService.remove(commentId, userId);
    res.status(StatusCodes.NO_CONTENT).send();
  }
}

export const interviewCommentController = new InterviewCommentController();