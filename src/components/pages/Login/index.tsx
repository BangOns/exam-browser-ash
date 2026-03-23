"use client";

import FooterLogin from "@/components/feature/Login/FooterLogin";
import FormLogin from "@/components/feature/Login/FormLogin";
import HeaderLogin from "@/components/feature/Login/HeaderLogin";

export default function Login() {
  return (
    <main className="flex flex-col flex-1 items-center justify-center min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-sky-200/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-emerald-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <section className="relative z-10 w-full max-w-md px-6 py-12 animate-fade-in">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl shadow-slate-200/50">
          <HeaderLogin
            title="Welcome Back"
            description="Sign in to your Exam Browser account"
            icon="EB"
          />

          <FormLogin />
          <FooterLogin description="Mock Emails: admin@school.id, teacher@school.id, student@school.id" />
        </div>
      </section>
    </main>
  );
}
