import { ExamList } from "./exam";

export interface ExamSchedule {
  id: string;
  exam: ExamList;
  exam_date: string;
  start_time: string;
  end_time: string;
  duration: number;
  status: string;
}
export type ExamScheduleRequest = {
  exam_id: string;
  exam_date: string;
  start_time: string;
  end_time: string;
  duration: number;
};
export type ExamScheduleRequestEdit = {
  id: string;
  exam_id: string;
  exam_date: string;
  start_time: string;
  end_time: string;
  duration: number;
};
