"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth";

export default function Login() {
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
    <main className="flex flex-col flex-1 items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-sky-200/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-emerald-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 w-full max-w-md px-6 py-12 animate-fade-in">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl shadow-slate-200/50">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white font-bold text-2xl shadow-lg shadow-indigo-200 mb-6">
              EB
            </div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-500">
              Sign in to your Exam Browser account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl border border-red-100">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@school.id"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-200 transition-all duration-300"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-slate-400">
            <p>
              Mock Emails: admin@school.id, teacher@school.id, student@school.id
            </p>
            <p>Any password works.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
