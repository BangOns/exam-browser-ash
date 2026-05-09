import { fetchWithAuth } from "@/lib/fetcher";
import {
  QuestionList,
  QuestionRequest,
  QuestionRequestEdit,
} from "@/types/question";

export async function getExam() {
  const res = await fetchWithAuth<QuestionList[]>("/api/exam");
  return res;
}

export async function createExam(data: QuestionRequest) {
  const res = await fetchWithAuth("/api/exam", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}

export async function getExamById(studentId: string) {
  const res = await fetchWithAuth<QuestionList>(`/api/exam/${studentId}`);
  return res;
}

export async function editExam(data: QuestionRequestEdit) {
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

export async function deleteExam(questionId: string) {
  const res = await fetchWithAuth(`/api/exam/${questionId}`, {
    method: "DELETE",
  });

  return res;
}
