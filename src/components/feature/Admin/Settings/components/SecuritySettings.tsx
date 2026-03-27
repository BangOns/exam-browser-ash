import { ShieldCheck } from "lucide-react";
import React from "react";

export default function SecuritySettings() {
  return (
    <div className="glass-card p-6 animate-slide-up">
      <h3 className="text-base font-semibold text-slate-800 mb-5 flex items-center gap-2">
        <ShieldCheck />
        Security & Exam Rules
      </h3>
      <div className="space-y-4">
        {[
          { label: "Block Tab Switching", enabled: true },
          { label: "Block Copy/Paste", enabled: true },
          { label: "Fullscreen Enforcement", enabled: true },
          { label: "Auto-Submit on Violation", enabled: false },
          { label: "Face Detection", enabled: false },
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
