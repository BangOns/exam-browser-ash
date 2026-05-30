import { fetchWithAuth } from "@/lib/fetcher";
import { ExamList, ExamRequest, ExamRequestEdit } from "@/types/exam";

export async function getExam({
  page,
  limit,
  search,
  status,
}: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) {
  const res = await fetchWithAuth<ExamList[]>(`/api/exam`, {
    params: {
      page,
      limit,
      search,
      status,
    },
  });
  return res;
}

export async function createExam(data: ExamRequest) {
  const res = await fetchWithAuth("/api/exam", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}

export async function getExamById({
  examId,
  page,
}: {
  examId: string;
  page?: number;
}) {
  const res = await fetchWithAuth<ExamList>(`/api/exam/${examId}`, {
    params: {
      page,
    },
  });
  return res;
}

export async function editExam(data: ExamRequestEdit) {
  const { id, ...questionData } = data;
  const res = await fetchWithAuth(`/api/exam/${id}`, {
    method: "PUT",
    body: JSON.stringify(questionData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}

export async function deleteExam(examId: string) {
  const res = await fetchWithAuth(`/api/exam/${examId}`, {
    method: "DELETE",
  });

  return res;
}
