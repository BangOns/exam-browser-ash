export type Teacher = {
  id: number;
  name: string;
  email: string;
  subject: string;
  status: "Active" | "Inactive";
  lastLogin: string;
  examsCreated: number;
};
