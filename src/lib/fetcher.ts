import { ApiResponse } from "@/types/api-response";
import { getAccessToken, setAccessToken } from "./token";

let isRefreshing = false;
let queue: Array<(token: string | null) => void> = [];

const waitForRefresh = (): Promise<string | null> =>
  new Promise((resolve) => queue.push(resolve));

const notifyAll = (token: string | null) => {
  queue.forEach((resolve) => resolve(token));
  queue = [];
};

export const fetchWithAuth = async <T>(
  input: RequestInfo,
  init: RequestInit = {},
  retry = true,
): Promise<ApiResponse<T>> => {
  const token = getAccessToken();

  const res = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json", // ✅ default
      ...(init.headers || {}),
      Authorization: token ? `Bearer ${token}` : "",
    },
    credentials: "include",
  });

  if (res.status !== 401) {
    const data = (await res.json()) as ApiResponse<T>;

    if (!res.ok) {
      throw { status: res.status, data };
    }

    return {
      data: data.data,
      status: data.status,
      message: data.message,
      meta: data.meta,
    };
  }

  if (!retry) {
    throw { status: 401, data: null };
  }

  if (isRefreshing) {
    const newToken = await waitForRefresh();
    if (!newToken) throw { status: 401, data: null };
    return fetchWithAuth<T>(input, init, false);
  }

  isRefreshing = true;

  try {
    const refreshRes = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!refreshRes.ok) throw new Error("Refresh failed");

    const refreshData = await refreshRes.json();
    const newToken: string = refreshData.access_token;

    if (!newToken) throw new Error("No token in refresh response"); // ✅

    setAccessToken(newToken);
    notifyAll(newToken);

    const result = await fetchWithAuth<T>(input, init, false);
    return result;
  } catch (err) {
    notifyAll(null); // ✅ selalu jalan sebelum redirect
    if (typeof window !== "undefined") {
      window.location.href = "/"; // ✅ aman di server
    }
    throw err;
  } finally {
    isRefreshing = false;
  }
};
