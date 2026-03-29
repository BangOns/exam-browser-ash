export type AnswerItem = {
  questionId: number;
  /** Chosen option letter for MCQ ("A"/"B"…), free text for Essay */
  answer: string;
  /** Teacher-assigned points for essay questions (undefined until graded) */
  earnedPoints?: number;
};

export type StudentSubmission = {
  id: string;
  /** Matches ResultRow.student */
  studentName: string;
  /** Matches ExamRow.id */
  examId: number;
  examName: string;
  answers: AnswerItem[];
};
