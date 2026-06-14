export interface SubmissionAnswer {
  id: string;
  answer: string;
  score: number;
  student: Student;
  exam: Exam;
  question: Question;
  is_correct: boolean;
  answered_at: string;
}

export interface Student {
  id: string;
  name: string;
  class: string;
}

export interface Exam {
  id: string;
  name: string;
}

export interface Question {
  id: string;
  question: string;
  lesson_id: string;
  type: string;
  options?: string;
  correct_answer?: string;
  rubric?: string;
  max_points: number;
}

export interface AnswerRequest {
  answers: AnswerProps[];
}
export interface ScoreRequest {
  attempt_id: string;
  answers: ScoreProps[];
}

interface AnswerProps {
  question_id: string;
  answer: string | number;
}
interface ScoreProps {
  question_id: string;
  score: number;
}
