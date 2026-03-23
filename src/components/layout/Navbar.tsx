"use client";

export default function Navbar({
  role,
  onMenuToggle,
}: {
  role: string;
  onMenuToggle: () => void;
}) {
  const roleLabels: Record<string, string> = {
    admin: "Administrator",
    teacher: "Teacher",
    student: "Student",
  };

  const roleColors: Record<string, string> = {
    admin: "#6366f1",
    teacher: "#10b981",
    student: "#0ea5e9",
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-lg border-b border-surface-border flex items-center justify-between px-6 gap-4">
      {/* Left: menu toggle + breadcrumb */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200 lg:hidden"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className="hidden sm:flex items-center gap-2 text-sm text-slate-400">
          <span className="font-semibold" style={{ color: roleColors[role] }}>
            {roleLabels[role]}
          </span>
          <span>/</span>
          <span className="text-slate-600 font-medium">Dashboard</span>
        </div>
      </div>

      {/* Right: search, notifications, profile */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/60 text-sm text-slate-400 w-56 hover:border-slate-300 transition-colors">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span>Search...</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200">
          <svg
            className="w-5 h-5"
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
          <span className="notification-dot" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold"
            style={{ background: roleColors[role] }}
          >
            {roleLabels[role]?.[0] ?? "U"}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-700">
              {roleLabels[role]}
            </p>
            <p className="text-xs text-slate-400">Online</p>
          </div>
        </div>
      </div>
    </header>
  );
}
