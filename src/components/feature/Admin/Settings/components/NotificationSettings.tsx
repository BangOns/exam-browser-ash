import { Bell } from "lucide-react";
import React from "react";

export default function NotificationSettings() {
  return (
    <div className="glass-card p-6 animate-slide-up">
      <h3 className="text-base font-semibold text-slate-800 mb-5 flex items-center gap-2">
        <Bell />
        Notifications
      </h3>
      <div className="space-y-4">
        {[
          { label: "Email Notifications", enabled: true },
          { label: "Violation Alerts", enabled: true },
          { label: "Exam Completion Alerts", enabled: true },
          { label: "System Status Updates", enabled: false },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0"
          >
            <label className="text-sm text-slate-600 font-medium">
              {item.label}
            </label>
            <div
              className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${item.enabled ? "bg-indigo-500" : "bg-slate-200"}`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${item.enabled ? "translate-x-5.5" : "translate-x-0.5"}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
