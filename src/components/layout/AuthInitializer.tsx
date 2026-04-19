"use client";

import { useEffect } from "react";
import { useAuth } from "../../context/Auth/AuthContext";
import { getAccessToken, setAccessToken } from "@/lib/token";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/types/response";
import { User } from "@/types/user";

export default function AuthInitializer() {
  const { setUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    // Kalau sudah ada accessToken di memory (baru saja login),
    // jangan call refresh lagi → mencegah race condition dengan proses login
    if (getAccessToken()) return;

    const init = async () => {
      try {
        const refresh = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        if (!refresh.ok) {
          router.push("/");
          // Refresh gagal (belum login / token expired) = tidak perlu throw
          return;
        }

        const data = await refresh.json();
        const me = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });
        const dataMe = (await me.json()) as User;
        if (data.access_token) {
          setAccessToken(data.access_token);
        }
        if (dataMe) {
          setUser(dataMe);
        }
      } catch {
        // Senyapkan error refresh saat initializer — bukan kondisi kritis
      }
    };

    init();
  }, [setUser]);

  return null;
}
