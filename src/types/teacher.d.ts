export type Teacher = {
  id: number;
  name: string;
  email: string;
  subject: string;
  status: "Active" | "Inactive";
  lastLogin: string;
  examsCreated: number;
};

export interface TeacherList {
  id: string;
  name: string;
  username: string;
  nip: string;
  status: string;
  teaching_assignments: TeachingAssignment[];
  status: string;
  created_at: string;
  updated_at: string;
}

export interface TeachingAssignment {
  class_id: string;
  class_name: string;
  subject_id: string;
  subject_name: string;
}
export interface TeacherRequest {
  full_name: string;
  username: string;
  password: string;
  nip: string;
  lessons?: LessonRequest[];
}
export interface TeacherRequestEdit extends Omit<TeacherRequest, "password"> {
  id: string;
  password?: string;
}

export interface LessonRequest {
  class_id: string;
  subject_id: string;
}
