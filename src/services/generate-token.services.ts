import { fetchWithAuth } from "@/lib/fetcher";

export async function generateToken(id: string) {
  const res = await fetchWithAuth(`/api/generate-token/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}
