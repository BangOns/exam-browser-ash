"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { navConfig } from "@/config/navigation";

export default function Sidebar({
  role,
  collapsed,
  onToggle,
  isMobile = false,
  onCloseMobile,
}: {
  role: string;
  collapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}) {
  const pathname = usePathname();
  const config = navConfig[role];
  if (!config) return null;

  const accentColors: Record<string, string> = {
    admin: "#6366f1",
    teacher: "#10b981",
    student: "#0ea5e9",
  };

  const handleNavClick = () => {
    if (isMobile && onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <aside
      className={` top-0 left-0 h-full bg-sidebar z-40 flex flex-col transition-all duration-300 ease-in-out ${
        collapsed ? "w-[72px]" : "w-[260px]"
      } ${!isMobile ? "fixed" : "w-full"}`}
    >
      {/* Logo area */}
      <header className="flex items-center justify-between px-5 h-16 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
            style={{ background: accentColors[role] }}
          >
            EB
          </div>
          {(!collapsed || isMobile) && (
            <span className="text-sidebar-text-active font-semibold text-[15px] whitespace-nowrap animate-fade-in">
              Exam Browser
            </span>
          )}
        </div>
        {/* Close button for mobile */}
        {isMobile && (
          <Button
            onClick={onCloseMobile}
            className="p-2 rounded-xl text-sidebar-text hover:text-white hover:bg-sidebar-hover transition-all duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        )}
      </header>

      {/* Role badge */}
      <section
        className={`px-5 py-3 ${collapsed && !isMobile ? "flex justify-center" : ""}`}
      >
        {collapsed && !isMobile ? (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ background: accentColors[role] }}
          >
            {config.label[0]}
          </div>
        ) : (
          <section
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-white animate-fade-in"
            style={{
              background: `${accentColors[role]}22`,
              color: accentColors[role],
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: accentColors[role] }}
            />
            {config.label} Panel
          </section>
        )}
      </section>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {config.items.map((item) => {
          const isActive =
            item.href === `/${role}`
              ? pathname === item.href
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "text-white"
                  : "text-sidebar-text hover:text-sidebar-text-active hover:bg-sidebar-hover"
              } ${collapsed && !isMobile ? "justify-center" : ""}`}
              style={isActive ? { background: accentColors[role] } : undefined}
              title={collapsed && !isMobile ? item.label : undefined}
            >
              <span className="w-5 h-5 shrink-0">{item.icon}</span>
              {(!collapsed || isMobile) && (
                <span className="whitespace-nowrap">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle — desktop only */}
      {!isMobile && (
        <section className="p-3 border-t border-white/5">
          <Button
            onClick={onToggle}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sidebar-text hover:text-sidebar-text-active hover:bg-sidebar-hover transition-all duration-200 text-sm"
          >
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </Button>
        </section>
      )}

      {/* Bottom: Logout */}
      <section className="p-3 border-t border-white/5">
        <Link
          href="/"
          onClick={handleNavClick}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-sidebar-text hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 ${
            collapsed && !isMobile ? "justify-center" : ""
          }`}
          title={collapsed && !isMobile ? "Logout" : undefined}
        >
          <svg
            className="w-5 h-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          {(!collapsed || isMobile) && <span>Logout</span>}
        </Link>
      </section>
    </aside>
  );
}
