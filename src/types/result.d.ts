export type ResultRow = {
  id: string;
  student: string;
  exam: string;
  score: number;
  grade: string;
  time: string;
  date: string;
  /** Links to a StudentSubmission.id */
  submissionId: string;
};

export type ResultStudent = Pick<
  ResultRow,
  "exam" | "score" | "grade" | "date"
>;
export type ResultDetail = {
  id: string;
  exam: string;
  subject: string;
  score: number;
  grade: string;
  date: string;
  totalQuestions: number;
  correctAnswers: number;
};
export type QuestionResult = {
  number: number;
  question: string;
  type: "Multiple Choice" | "Essay";
  studentAnswer: string;
  correctAnswer: string;
  points: number;
  maxPoints: number;
  isCorrect: boolean;
};
export type ExamDetail = ResultDetail & {
  timeSpent: string;
  totalTime: string;
  questions: QuestionResult[];
};
