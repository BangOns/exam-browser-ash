import { ExamRow as Exam } from "@/types/exam";

export const emptyExam = (subject: string): Exam => ({
  id: 0,
  name: "",
  subject,
  targetClass: "All Classes",
  questions: 20,
  students: 0,
  status: "Draft",
  questionIds: [],
});

export const statusTabs = ["All", "Active", "Scheduled", "Draft", "Completed"];

export const classOptions = [
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
  "All Classes",
];
