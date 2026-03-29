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
