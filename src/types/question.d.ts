export type QuestionOption = { label: string; text: string };

export type Question = {
  id: number;
  question: string;
  subject: string;
  type: "Multiple Choice" | "Essay";
  options?: QuestionOption[];
  correctAnswer?: string;
  rubric?: string;
  maxPoints?: number;
  used: number;
};
