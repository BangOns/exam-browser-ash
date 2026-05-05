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

export interface StudentList {
  id: string;
  name: string;
  username: string;
  nisn: string;
  class: {
    id: string;
    name: string;
  };
  status: string;
  created_at: string;
  updated_at: string;
}
export interface StudentRequest {
  full_name: string;
  username: string;
  password: string;
  nisn: string;
  class_id: string;
}
export interface StudentRequestEdit extends Omit<StudentRequest, "password"> {
  id: string;
  password?: string;
}
