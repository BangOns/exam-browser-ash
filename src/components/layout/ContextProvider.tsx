"use client";
import AuthProvider from "@/context/Auth/AuthContext";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default ContextProvider;
