import { fetchWithAuth } from "@/lib/fetcher";
import { AnswerRequest } from "@/types/answer";
import { ExamTokenRequest } from "@/types/exam-token";

export async function generateToken(id: string) {
  const res = await fetchWithAuth(`/api/generate-token/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
}
export async function EnterExamWithToken({ token, id }: ExamTokenRequest) {
  const res = await fetchWithAuth(`/api/exam-attempts/${id}/enter`, {
    method: "POST",
    body: JSON.stringify({ token }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
}
export async function ExitExam({ id, type }: { id: string; type: string }) {
  const res = await fetchWithAuth(`/api/exam-attempts/${id}/exit`, {
    method: "POST",
    body: JSON.stringify({ type }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
}
export async function SubmitAnswersExam(id: string, answers: AnswerRequest) {
  const res = await fetchWithAuth(`/api/exam-attempts/${id}/submit`, {
    method: "POST",
    body: JSON.stringify(answers),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
}
export async function UpdateAnswersExam(
  id: string,
  studentId: string,
  answers: AnswerRequest,
) {
  const res = await fetchWithAuth(
    `/api/exam-attempts/${id}/edit?student_id=${studentId}`,
    {
      method: "PUT",
      body: JSON.stringify(answers),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return res;
}
