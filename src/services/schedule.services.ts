import { fetchWithAuth } from "@/lib/fetcher";
import {
  ExamSchedule,
  ExamScheduleRequest,
  ExamScheduleRequestEdit,
} from "@/types/exam-schedule";

export async function getExamSchedule({ page }: { page?: number }) {
  const res = await fetchWithAuth<ExamSchedule[]>("/api/exam-schedules", {
    params: { page },
  });
  return res;
}

export async function createExamSchedule(data: ExamScheduleRequest) {
  const res = await fetchWithAuth("/api/exam-schedules", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}

export async function getExamScheduleById(scheduleId: string) {
  const res = await fetchWithAuth<ExamSchedule>(
    `/api/exam-schedules/${scheduleId}`,
  );
  return res;
}

export async function editExamSchedule(data: ExamScheduleRequestEdit) {
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
