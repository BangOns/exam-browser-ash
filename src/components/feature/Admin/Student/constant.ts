import { Student } from "@/types/student";

export const emptyStudent: Student = {
  id: 0,
  name: "",
  email: "",
  grade: "XII IPA 1",
  status: "Active",
  lastLogin: "Never",
  examsTaken: 0,
  avgScore: 0,
};

export const gradeOptions = [
  "X IPA 1",
  "X IPA 2",
  "X IPS 1",
  "X IPS 2",
  "XI IPA 1",
  "XI IPA 2",
  "XI IPS 1",
  "XI IPS 2",
  "XII IPA 1",
  "XII IPA 2",
  "XII IPS 1",
  "XII IPS 2",
];
