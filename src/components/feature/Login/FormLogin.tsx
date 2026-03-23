import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth";
export default function FormLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please put in both email and password.");
      return;
    }

    // Using mock credentials logic
    const user = loginUser(email);
    if (user) {
      setError("");
      // Redirect based on role
      if (user.role === "admin") router.push("/admin");
      if (user.role === "teacher") router.push("/teacher");
      if (user.role === "student") router.push("/student");
    } else {
      setError(
        "Invalid credentials. Please try admin@school.id, teacher@school.id, or student@school.id.",
      );
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
        <Label className="text-sm font-medium text-slate-700">
          Email Address
        </Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@school.id"
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
