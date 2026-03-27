import { Teacher } from "@/types/teacher";

export const emptyTeacher: Teacher = {
  id: 0,
  name: "",
  email: "",
  subject: "Physics",
  status: "Active",
  lastLogin: "Never",
  examsCreated: 0,
};

export const subjectOptions = [
  "Physics",
  "Mathematics",
  "English",
  "Chemistry",
  "Biology",
  "Geography",
  "History",
];
