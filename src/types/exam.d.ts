import { ExamSchedule } from "./exam-schedule";
import { ExamToken } from "./exam-token";
import { LessonList } from "./lesson";
import { QuestionList } from "./question";

export type ExamRow = {
  id: number;
  name: string;
  subject: string;
  questions: number;
  targetClass?: stringl;
  status: "Active" | "Scheduled" | "Draft" | "Completed";
  created?: string;
  students?: number;
  token?: string;
  questionIds?: number[];
  timer?: number;
};
export type ExamQuestionNow = Omit<ExamRow, "status"> & {
  startsIn: string;
  status: "available" | "upcoming" | "completed";
  duration: string;
};

export type ExamList = {
  id: string;
  name: string;
  lesson: LessonList;
  schedule: ExamSchedule;
  status: string | "active" | "scheduled" | "draft" | "completed";
  questions: QuestionList[];
  token: ExamToken;
};
export type ExamRequest = {
  name: string;
  lesson_id: string;
  status: "active" | "scheduled" | "draft" | "completed";
  questions?: string[];
};
export type ExamRequestEdit = {
  id: string;
  name: string;
  lesson_id: string;
  status: "active" | "scheduled" | "draft" | "completed";
  questions?: string[];
};
