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
