"use client";
import { AuthContext, User } from "@/context/Auth/AuthContext";
import { setAccessToken } from "@/lib/token";
import { useState } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔑 LOGIN
  const login = async (username: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Login gagal");

      const data = await res.json();

      setAccessToken(data.access_token);

      setUser(data.data);
    } catch (err: Error | unknown) {
      if (err instanceof Error) {
        return err.message || "Login gagal";
      }
    }
  };

  // 🚪 LOGOUT
  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    setAccessToken(null);
    setUser(null);

    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
