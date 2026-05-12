import { DetailQuestion } from "./question";

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
// type Exam = {
//   id: number;
//   name: string;
//   subject: string;
//   targetClass: string;
//   questions: number;
//   students: number;
//   status: "Active" | "Scheduled" | "Draft" | "Completed";
//   questionIds: number[];
// };
export type ExamList = {
  id: string;
  name: string;
  class: DetailQuestion;
  subject: DetailQuestion;
  status: string | "active" | "scheduled" | "draft" | "completed";
  questions: string[];
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
