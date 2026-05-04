"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "../../context/Auth/AuthContext";
import { getAccessToken, setAccessToken } from "@/lib/token";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";

export default function AuthInitializer() {
  const { setUser, setIsLoading } = useAuth();
  const router = useRouter();
  const initialized = useRef(false); // ✅ cegah jalan lebih dari sekali

  useEffect(() => {
    if (initialized.current) return; // ✅ sudah pernah init, skip
    initialized.current = true;
    if (getAccessToken()) {
      setIsLoading(false); // ✅ token sudah ada, langsung selesai
      return;
    }

    const init = async () => {
      try {
        const refresh = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        if (!refresh.ok) {
          router.push("/"); // redirect ke login
          return;
        }

        const data = await refresh.json();

        if (data.access_token) {
          setAccessToken(data.access_token);
        }

        const me = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (me.ok) {
          const dataMe = (await me.json()) as User;
          setUser(dataMe);
        }
      } catch {
        router.push("/");
      } finally {
        setIsLoading(false); // ✅ ini yang paling penting
      }
    };

    init();
  }, []); // ✅ dependency array kosong — hanya jalan sekali saat mount

  return null;
}
