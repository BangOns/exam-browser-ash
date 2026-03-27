import { Settings } from "lucide-react";

export default function GeneralSettings() {
  return (
    <div className="glass-card p-6 animate-slide-up">
      <h3 className="text-base font-semibold text-slate-800 mb-5 flex items-center gap-2">
        <Settings />
        General
      </h3>
      <div className="space-y-4">
        {[
          { label: "Platform Name", value: "Exam Browser" },
          { label: "Default Exam Duration", value: "90 minutes" },
          { label: "Max File Upload Size", value: "10 MB" },
          { label: "Session Timeout", value: "30 minutes" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0"
          >
            <label className="text-sm text-slate-600 font-medium">
              {item.label}
            </label>
            <input
              type="text"
              defaultValue={item.value}
              className="text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-40 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
