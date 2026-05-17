import { LessonList } from "./lesson";

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
  type: "Multiple Choice" | "Essay";
  options: Option[];
  correct_answer: string;
  rubric: string;
  max_points: number;
  lesson: LessonList;
  created_at: string;
  updated_at: string;
}

export interface QuestionRequest {
  question: string;
  lesson_id: string;
  type: string;
  options?: QuestionOption[];
  correct_answer?: string;
  rubric?: string;
  max_points?: number;
}

export interface QuestionRequestEdit {
  id: string;
  question: string;
  lesson_id: string;
  type: string;
  options?: QuestionOption[];
  correct_answer?: string;
  rubric?: string;
  max_points?: number;
}

export interface Option {
  label: string;
  text: string;
}

export interface DetailQuestion {
  id: string;
  name: string;
}
