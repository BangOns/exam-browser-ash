import { fetchWithAuth } from "@/lib/fetcher";
import { ClassList, ClassRequest, ClassRequestEdit } from "@/types/class";

export async function getClass() {
  const res = await fetchWithAuth<ClassList[]>("/api/class");
  return res;
}

export async function getClassDetail(id: string) {
  const res = await fetchWithAuth<ClassList>(`/api/class"/${id}`);

  return res;
}

export async function createClass(data: ClassRequest) {
  const res = await fetchWithAuth("/api/class", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
}
export async function updateClass(data: ClassRequestEdit) {
  const res = await fetchWithAuth(`/api/class/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
}
export async function deleteClass(id: string) {
  const res = await fetchWithAuth(`/api/class/${id}`, {
    method: "DELETE",
  });
  return res;
}
