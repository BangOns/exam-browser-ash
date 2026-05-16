import { fetchWithAuth } from "@/lib/fetcher";
import { ExamList, ExamRequest, ExamRequestEdit } from "@/types/exam";
import {} from "@/utils/filterQuery";

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
  const params = new URLSearchParams(
    Object.entries({ page, limit, search, status })
      .filter(([, v]) => v !== undefined && v !== null && v !== "")
      .map(([k, v]) => [k, String(v)]),
  );

  const res = await fetchWithAuth<ExamList[]>(`/api/exam?${params.toString()}`);
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

export async function getExamById(examId: string) {
  const res = await fetchWithAuth<ExamList>(`/api/exam/${examId}`);
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
