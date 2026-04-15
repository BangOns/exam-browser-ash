import { ApiResponse } from "@/types/response";
import { getAccessToken, setAccessToken } from "./token";

let isRefreshing = false;
let queue: (() => void)[] = [];

const waitForRefresh = () =>
  new Promise<void>((resolve) => queue.push(resolve));

const notifyAll = () => {
  queue.forEach((resolve) => resolve());
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
      ...(init.headers || {}),
      Authorization: token ? `Bearer ${token}` : "",
    },
    credentials: "include",
  });

  // ✅ kalau bukan 401
  if (res.status !== 401) {
    const data = await res.json();

    if (!res.ok) {
      throw {
        status: res.status,
        data,
      };
    }

    return {
      data,
      status: res.status,
      message: data.message,
      code: data.code,
    };
  }

  // ❌ kalau sudah retry tapi masih 401
  if (!retry) {
    throw {
      status: 401,
      data: null,
    };
  }

  // 🔁 kalau lagi refresh → tunggu
  if (isRefreshing) {
    await waitForRefresh();
    return fetchWithAuth<T>(input, init, false);
  }

  isRefreshing = true;

  try {
    const refreshRes = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!refreshRes.ok) {
      throw new Error("Refresh failed");
    }

    const refreshData = await refreshRes.json();
    setAccessToken(refreshData.access_token);

    notifyAll();

    return fetchWithAuth<T>(input, init, false);
  } catch (err) {
    window.location.href = "/";
    throw err;
  } finally {
    isRefreshing = false;
  }
};
