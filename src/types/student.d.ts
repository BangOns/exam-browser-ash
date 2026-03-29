export type Student = {
  id: number;
  name: string;
  email: string;
  grade: string;
  status: "Active" | "Inactive" | "Suspended";
  lastLogin: string;
  examsTaken: number;
  avgScore: number;
};
export type StudentSession = {
  name: string;
  status: "active" | "idle" | "flagged" | "completed";
  progress: number;
  timeLeft: string;
  violations: number;
  currentQuestion: number;
  totalQuestions: number;
};
