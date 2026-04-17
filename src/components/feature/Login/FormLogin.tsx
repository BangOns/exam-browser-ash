import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Auth/AuthContext";
export default function FormLogin() {
  const router = useRouter();
  const { login, user } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please put in both username and password.");
      return;
    }
    try {
      // Using mock credentials logic
      const data = await login(username, password);
      if (data) {
        router.push(`/${user?.role}`);
      }
    } catch (error) {
      setError(error as string);
    }
  };
  return (
    <form onSubmit={handleLogin} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl border border-red-100">
          {error}
        </div>
      )}

      <section className="space-y-2">
        <Label className="text-sm font-medium text-slate-700">username</Label>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="masukan username"
          className="h-12 px-4 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all duration-300 shadow-none text-base"
        />
      </section>

      <section className="space-y-2">
        <Label className="text-sm font-medium text-slate-700">Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="h-12 px-4 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all duration-300 shadow-none text-base"
        />
      </section>

      <Button
        type="submit"
        className="w-full h-[52px] bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-200 transition-all duration-300 text-base"
      >
        Sign In
      </Button>
    </form>
  );
}
