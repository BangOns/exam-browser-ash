"use client";

import { setAccessToken } from "@/lib/token";
import { ApiResponse } from "@/types/response";
import { DataUserLogin, User } from "@/types/user";
import { createContext, useContext, useState } from "react";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (
    username: string,
    password: string,
  ) => Promise<string | User | undefined>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setIsLoading: (isLoading: boolean) => void; // ✅ tambah ini
};

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🔑 LOGIN
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = (await res.json()) as ApiResponse<DataUserLogin>;
        throw new Error(data.message || "Login gagal");
      }
      const data = (await res.json()) as ApiResponse<DataUserLogin>;
      setAccessToken(data.data.token);

      setUser(data.data.user);
      return data.data.user;
    } catch (err: Error | unknown) {
      if (err instanceof Error) {
        return err.message || "Login gagal";
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 🚪 LOGOUT
  const logout = async () => {
    try {
      setIsLoading(true); // Seharusnya true saat proses
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setAccessToken(null);
      setUser(null);
      setIsLoading(false);
      window.location.href = "/";
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, setIsLoading, login, logout, setUser }}
    >
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
