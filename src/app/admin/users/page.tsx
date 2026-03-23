"use client";

import Link from "next/link";

export default function AdminUsersPage() {
  const sections = [
    {
      label: "Teacher List",
      description: "Manage teacher accounts, assignments, and permissions",
      href: "/admin/users/teachers",
      count: 3,
      color: "emerald",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      label: "Student List",
      description: "Manage student accounts, enrollment, and academic records",
      href: "/admin/users/students",
      count: 5,
      color: "sky",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
        <p className="text-sm text-slate-500 mt-1">Manage all system users and their access levels</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Users", value: 8, color: "indigo" },
          { label: "Teachers", value: 3, color: "emerald" },
          { label: "Students", value: 5, color: "sky" },
        ].map((item, i) => (
          <div key={i} className="glass-card p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center`}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">{item.label}</p>
              <p className="text-2xl font-bold text-slate-800">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Section links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="glass-card p-6 group cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-${section.color}-50 text-${section.color}-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                {section.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{section.label}</h3>
                  <span className="badge badge-neutral">{section.count} users</span>
                </div>
                <p className="text-sm text-slate-500 mt-1">{section.description}</p>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-500 group-hover:gap-3 transition-all">
                  <span>Manage</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
