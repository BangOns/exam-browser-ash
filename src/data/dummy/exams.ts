import { ExamRow } from "@/types/exam";
import { ExamRow as Exam } from "@/types/exam";

export const initialExams: ExamRow[] = [
  {
    id: 1,
    name: "UTS Mathematics",
    subject: "Mathematics",
    questions: 40,
    status: "Active",
    created: "Mar 10, 2026",
    token: "MATH123",
  },
  {
    id: 2,
    name: "UAS English",
    subject: "English",
    questions: 50,
    status: "Scheduled",
    created: "Mar 12, 2026",
  },
  {
    id: 3,
    name: "Quiz Physics",
    subject: "Physics",
    questions: 20,
    status: "Active",
    created: "Mar 15, 2026",
    token: "PHYS55",
  },
  {
    id: 4,
    name: "UTS Biology",
    subject: "Biology",
    questions: 35,
    status: "Draft",
    created: "Mar 18, 2026",
  },
  {
    id: 5,
    name: "Quiz Chemistry",
    subject: "Chemistry",
    questions: 15,
    status: "Completed",
    created: "Mar 5, 2026",
  },
  {
    id: 6,
    name: "UAS History",
    subject: "History",
    questions: 30,
    status: "Scheduled",
    created: "Mar 20, 2026",
  },
];

export const statsExams = [
  { label: "Total Exams", value: 4, emoji: "📝" },
  {
    label: "Active",
    value: 2,
    emoji: "🟢",
  },
  {
    label: "Scheduled",
    value: 1,
    emoji: "📅",
  },
  {
    label: "Draft",
    value: 1,
    emoji: "📋",
  },
];
export const buildInitialExams = (subject: string): Exam[] =>
  [
    {
      id: 1,
      name: "UTS Mathematics",
      subject: "Mathematics",
      targetClass: "XII IPA 1",
      questions: 40,
      students: 45,
      status: "Active" as const,
      questionIds: [],
    },
    {
      id: 2,
      name: "Quiz Physics",
      subject: "Physics",
      targetClass: "XII IPA 2",
      questions: 20,
      students: 38,
      status: "Active" as const,
      questionIds: [],
    },
    {
      id: 3,
      name: "UAS English",
      subject: "English",
      targetClass: "All Classes",
      questions: 50,
      students: 0,
      status: "Scheduled" as const,
      questionIds: [],
    },
    {
      id: 4,
      name: "Quiz Chemistry",
      subject: "Chemistry",
      targetClass: "XI IPA 1",
      questions: 15,
      students: 42,
      status: "Completed" as const,
      questionIds: [],
    },
    {
      id: 5,
      name: "UTS Biology",
      subject: "Biology",
      targetClass: "XI IPA 2",
      questions: 35,
      students: 0,
      status: "Draft" as const,
      questionIds: [],
    },
  ].filter((e) => e.subject === subject);
