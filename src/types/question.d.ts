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

export interface QuestionList {
  id: string;
  question: string;
  type: string;
  options: string[] | null;
  correct_answer: string | null;
  rubric: string | null;
  max_points: number;
  class: string | null;
  subject: string | null;
  created_at: string;
  updated_at: string;
}
