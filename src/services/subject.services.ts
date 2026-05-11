import { fetchWithAuth } from "@/lib/fetcher";
import {
  SubjectList,
  SubjectRequest,
  SubjectRequestEdit,
} from "@/types/subject";

export async function getSubject() {
  const res = await fetchWithAuth<SubjectList[]>("/api/subjects");

  return res;
}

export async function getSubjectDetail(id: string) {
  const res = await fetchWithAuth<SubjectList>(`/api/subjects"/${id}`);

  return res;
}

export async function createSubject(data: SubjectRequest) {
  const res = await fetchWithAuth("/api/subjects", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
}
export async function updateSubject(data: SubjectRequestEdit) {
  const res = await fetchWithAuth(`/api/subjects/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
}
export async function deleteSubject(id: string) {
  const res = await fetchWithAuth(`/api/subjects/${id}`, {
    method: "DELETE",
  });
  return res;
}
