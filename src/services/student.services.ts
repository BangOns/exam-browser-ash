import { fetchWithAuth } from "@/lib/fetcher";
import {
  StudentList,
  StudentRequest,
  StudentRequestEdit,
} from "@/types/student";

export async function getStudents() {
  const res = await fetchWithAuth<StudentList[]>("/api/student");

  return res;
}

export async function createStudent(data: StudentRequest) {
  const res = await fetchWithAuth("/api/student", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}

export async function getStudentById(studentId: string) {
  const res = await fetchWithAuth<StudentList>(`/api/student/${studentId}`);
  return res;
}

export async function editStudent(data: StudentRequestEdit) {
  const { id, ...studentData } = data;
  const res = await fetchWithAuth(`/api/student/${id}`, {
    method: "PUT",
    body: JSON.stringify(studentData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}

export async function deleteStudent(studentId: string) {
  const res = await fetchWithAuth(`/api/student/${studentId}`, {
    method: "DELETE",
  });

  return res;
}
