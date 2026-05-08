import { fetchWithAuth } from "@/lib/fetcher";
import {
  QuestionList,
  QuestionRequest,
  QuestionRequestEdit,
} from "@/types/question";

export async function getQuestion() {
  const res = await fetchWithAuth<QuestionList[]>("/api/question");
  return res;
}

export async function createQuestion(data: QuestionRequest) {
  const res = await fetchWithAuth("/api/question", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}

export async function getQuestionById(studentId: string) {
  const res = await fetchWithAuth<QuestionList>(`/api/question/${studentId}`);
  return res;
}

export async function editQuestion(data: QuestionRequestEdit) {
  const { id, ...questionData } = data;
  const res = await fetchWithAuth(`/api/question/${id}`, {
    method: "PUT",
    body: JSON.stringify(questionData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}

export async function deleteQuestion(questionId: string) {
  const res = await fetchWithAuth(`/api/question/${questionId}`, {
    method: "DELETE",
  });

  return res;
}
