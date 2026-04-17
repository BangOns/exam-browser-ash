"use client";

import { setAccessToken } from "@/lib/token";
import { ApiResponse } from "@/types/response";
import { DataUserLogin, User } from "@/types/user";
import { createContext, useContext, useState } from "react";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (
    username: string,
    password: string,
  ) => Promise<string | User | undefined>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

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

      const data = (await res.json()) as ApiResponse<DataUserLogin>;
      setAccessToken(data.data.token);

      setUser(data.data.user);
      return data.data.user;
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

// hook
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dalam AuthProvider");
  return ctx;
};
