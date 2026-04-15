"use client";

import { useEffect } from "react";
import { useAuth } from "../../context/Auth/AuthContext";
import { setAccessToken } from "@/lib/token";

export default function AuthInitializer() {
  const { setUser } = useAuth();

  useEffect(() => {
    const init = async () => {
      try {
        const refresh = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        if (!refresh.ok) {
          throw new Error("Refresh failed");
        }

        const data = await refresh.json();
        setAccessToken(data.access_token);

        setUser(data.data);
      } catch (err: Error | unknown) {
        if (err instanceof Error) {
          return err.message || "Refresh failed";
        }
      }
    };

    init();
  }, [setUser]);

  return null;
}
