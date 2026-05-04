import { fetchWithAuth } from "@/lib/fetcher";
import {
  TeacherList,
  TeacherRequest,
  TeacherRequestEdit,
} from "@/types/teacher";

export async function getTeachers() {
  const res = await fetchWithAuth<TeacherList[]>("/api/teacher");

  return res;
}

export async function createTeacher(data: TeacherRequest) {
  const res = await fetchWithAuth("/api/teacher", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}

export async function getTeacherById(teacherId: string) {
  const res = await fetchWithAuth<TeacherList>(`/api/teacher/${teacherId}`);
  return res;
}

export async function editTeacher(data: TeacherRequestEdit) {
  const { id, ...teacherData } = data;
  const res = await fetchWithAuth(`/api/teacher/${id}`, {
    method: "PUT",
    body: JSON.stringify(teacherData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}

export async function deleteTeacher(teacherId: string) {
  const res = await fetchWithAuth(`/api/teacher/${teacherId}`, {
    method: "DELETE",
  });

  return res;
}
