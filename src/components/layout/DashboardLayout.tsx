"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useAuth } from "@/context/Auth/AuthContext";

export default function DashboardLayout({
  role,
  children,
}: {
  role: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading } = useAuth(); // ✅ tambah isLoading dari context
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (isLoading) return; // ✅ tunggu auth selesai dulu

    if (!user || user.role !== role) {
      router.push("/");
    }
  }, [role, router, user, isLoading]);

  const isAuthorized = useMemo(() => user && user.role === role, [user, role]);

  // ✅ Selama loading, tampilkan spinner — jangan redirect dulu
  if (isLoading || !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="">
          <Sidebar
            role={role}
            collapsed={false}
            onToggle={() => setMobileOpen(false)}
            isMobile={true}
            onCloseMobile={() => setMobileOpen(false)}
          />
        </SheetContent>
      </Sheet>

      <div className="hidden lg:block">
        <Sidebar
          role={role}
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
      </div>

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
