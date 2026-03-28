import { ExamRow } from "@/types/exam";

export const emptyExam: ExamRow = {
  id: 0,
  name: "",
  subject: "Mathematics",
  questions: 20,
  status: "Draft",
  created: new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }),
};

export const defaultSubjectTimers: Record<string, string> = {
  Mathematics: "120 min",
  Physics: "60 min",
  English: "90 min",
  Chemistry: "45 min",
  Biology: "90 min",
  Geography: "60 min",
  History: "90 min",
};

export const statusTabs = ["All", "Active", "Scheduled", "Draft", "Completed"];
