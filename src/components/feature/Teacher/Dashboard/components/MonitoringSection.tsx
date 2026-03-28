import React from "react";

export default function MonitoringSection() {
  return (
    <section className="glass-card p-5 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-800">
          Live Monitoring
        </h3>
        <span className="badge badge-success flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-soft" />
          3 Active Sessions
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            name: "Siti Nurhaliza",
            exam: "Quiz Physics",
            status: "active",
            progress: 65,
          },
          {
            name: "Reza Pratama",
            exam: "Quiz Physics",
            status: "idle",
            progress: 42,
          },
          {
            name: "Maya Anggraeni",
            exam: "Quiz Physics",
            status: "flagged",
            progress: 30,
          },
        ].map((s, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl border transition-colors ${
              s.status === "active"
                ? "border-emerald-200 bg-emerald-50/50"
                : s.status === "flagged"
                  ? "border-red-200 bg-red-50/50"
                  : "border-amber-200 bg-amber-50/50"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  s.status === "active"
                    ? "bg-emerald-500 animate-pulse-soft"
                    : s.status === "flagged"
                      ? "bg-red-500 animate-pulse-soft"
                      : "bg-amber-500"
                }`}
              />
              <span className="text-sm font-semibold text-slate-700">
                {s.name}
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-2">{s.exam}</p>
            <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${s.progress}%`,
                  background: s.status === "flagged" ? "#ef4444" : "#10b981",
                }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {s.progress}% complete
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
