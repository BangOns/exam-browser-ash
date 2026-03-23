"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const navConfig: Record<
  string,
  { items: NavItem[]; accent: string; label: string }
> = {
  admin: {
    label: "Admin",
    accent: "bg-admin",
    items: [
      { label: "Dashboard", href: "/admin", icon: <DashboardIcon /> },
      { label: "Exams", href: "/admin/exams", icon: <ExamIcon /> },
      { label: "Teacher List", href: "/admin/users/teachers", icon: <UsersIcon /> },
      { label: "Student List", href: "/admin/users/students", icon: <UsersIcon /> },
      {
        label: "Exam Schedule",
        href: "/admin/schedule",
        icon: <ScheduleIcon />,
      },
      {
        label: "Reports / Audit",
        href: "/admin/reports",
        icon: <ReportIcon />,
      },
      { label: "Settings", href: "/admin/settings", icon: <SettingsIcon /> },
    ],
  },
  teacher: {
    label: "Teacher",
    accent: "bg-teacher",
    items: [
      { label: "Dashboard", href: "/teacher", icon: <DashboardIcon /> },
      {
        label: "Question Bank",
        href: "/teacher/questions",
        icon: <QuestionIcon />,
      },
      { label: "Exams", href: "/teacher/exams", icon: <ExamIcon /> },
      {
        label: "Monitoring",
        href: "/teacher/monitoring",
        icon: <MonitorIcon />,
      },
      { label: "Exam Results", href: "/teacher/results", icon: <ResultIcon /> },
    ],
  },
  student: {
    label: "Student",
    accent: "bg-student",
    items: [
      { label: "Dashboard", href: "/student", icon: <DashboardIcon /> },
      { label: "Exam Results", href: "/student/results", icon: <ResultIcon /> },
      {
        label: "Notifications",
        href: "/student/notifications",
        icon: <BellIcon />,
      },
    ],
  },
};

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
      className={`fixed top-0 left-0 h-full bg-sidebar z-40 flex flex-col transition-all duration-300 ease-in-out ${
        collapsed && !isMobile ? "w-[72px]" : "w-[260px]"
      }`}
    >
      {/* Logo area */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-white/5">
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
          <button
            onClick={onCloseMobile}
            className="p-2 rounded-xl text-sidebar-text hover:text-white hover:bg-sidebar-hover transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Role badge */}
      <div className={`px-5 py-3 ${collapsed && !isMobile ? "flex justify-center" : ""}`}>
        {collapsed && !isMobile ? (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ background: accentColors[role] }}
          >
            {config.label[0]}
          </div>
        ) : (
          <div
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
          </div>
        )}
      </div>

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
        <div className="p-3 border-t border-white/5">
          <button
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
          </button>
        </div>
      )}

      {/* Bottom: Logout */}
      <div className="p-3 border-t border-white/5">
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
      </div>
    </aside>
  );
}

/* --- SVG Icon Components --- */

function DashboardIcon() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10-1a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5z"
      />
    </svg>
  );
}

function ExamIcon() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
}

function ScheduleIcon() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function QuestionIcon() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function ResultIcon() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
      />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  );
}
