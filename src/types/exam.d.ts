export type ExamRow = {
  id: number;
  name: string;
  subject: string;
  questions: number;
  status: "Active" | "Scheduled" | "Draft" | "Completed";
  created: string;
  token?: string;
  questionIds?: number[];
};
