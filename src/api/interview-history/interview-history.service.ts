import { interviewService } from '../interview/interview.service';
import { interviewHistoryRepository } from './interview-history.repository';

class InterviewHistoryService {
    public async findAllForInterview(interviewId: string) {
        await interviewService.findOne(interviewId);
        return interviewHistoryRepository.findManyForInterview(interviewId);
    }
}
export const interviewHistoryService = new InterviewHistoryService();