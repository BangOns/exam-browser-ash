import { fetchWithAuth } from "@/lib/fetcher";
import { ExamList, ExamRequest, ExamRequestEdit } from "@/types/exam";

export async function getExamSchedule() {
  const res = await fetchWithAuth<ExamList[]>("/api/exam-schedules");
  return res;
}

export async function createExamSchedule(data: ExamRequest) {
  const res = await fetchWithAuth("/api/exam-schedules", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}

export async function getExamScheduleById(studentId: string) {
  const res = await fetchWithAuth<ExamList>(`/api/exam-schedules/${studentId}`);
  return res;
}

export async function editExamSchedule(data: ExamRequestEdit) {
  const { id, ...questionData } = data;
  const res = await fetchWithAuth(`/api/exam-schedules/${id}`, {
    method: "PUT",
    body: JSON.stringify(questionData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}

export async function deleteExamSchedule(questionId: string) {
  const res = await fetchWithAuth(`/api/exam-schedules/${questionId}`, {
    method: "DELETE",
  });

  return res;
}
