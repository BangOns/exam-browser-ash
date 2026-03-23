"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({
  role,
  children,
}: {
  role: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const user = typeof window !== 'undefined' ? getCurrentUser() : null;
  const isAuthorized = user && user.role === role;

  useEffect(() => {
    setMounted(true);
    if (!user || user.role !== role) {
      router.push("/");
    }
  }, [user, role, router]);

  const closeMobile = () => setMobileOpen(false);

  if (!mounted || !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden animate-fade-in"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar: desktop */}
      <div className="hidden lg:block">
        <Sidebar
          role={role}
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
      </div>

      {/* Sidebar: mobile */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-40 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          role={role}
          collapsed={false}
          onToggle={closeMobile}
          isMobile={true}
          onCloseMobile={closeMobile}
        />
      </div>

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          collapsed ? "lg:pl-[72px]" : "lg:pl-[260px]"
        }`}
      >
        <Navbar role={role} onMenuToggle={() => setMobileOpen(!mobileOpen)} />
        <main className="flex-1 p-6 lg:p-8 animate-fade-in">{children}</main>
      </div>
    </div>
  );
}
