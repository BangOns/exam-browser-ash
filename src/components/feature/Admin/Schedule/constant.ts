import { ExamScheduleRequest } from "@/types/exam-schedule";

export const emptySchedule: ExamScheduleRequest = {
  exam_id: "",
  exam_date: "",
  start_time: "",
  end_time: "",
  duration: 0,
};
