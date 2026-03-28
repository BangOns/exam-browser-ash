import { Question } from "@/types/question";

export const emptyQuestion: Question = {
  id: 0,
  question: "",
  subject: "Physics",
  type: "Multiple Choice",
  options: [
    { label: "A", text: "" },
    { label: "B", text: "" },
    { label: "C", text: "" },
    { label: "D", text: "" },
  ],
  correctAnswer: "A",
  rubric: "",
  maxPoints: 10,
  used: 0,
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
