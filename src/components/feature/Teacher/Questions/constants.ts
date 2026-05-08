import { QuestionRequest } from "@/types/question";

export const EMPTY_QUESTION: QuestionRequest = {
  question: "",
  lesson_id: "",
  type: "",
  options: [
    { label: "A", text: "" },
    { label: "B", text: "" },
    { label: "C", text: "" },
    { label: "D", text: "" },
  ],
  correct_answer: "",
  rubric: "",
  max_points: 0,
};

export const subjects = [
  "All",
  "Physics",
  "Mathematics",
  "Biology",
  "English",
  "Chemistry",
  "Geography",
];
export const types = ["All", "Multiple Choice", "Essay"];
