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
