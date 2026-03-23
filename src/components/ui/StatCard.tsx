export default function StatCard({
  icon,
  label,
  value,
  trend,
  trendUp,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  accent: string;
}) {
  const accentMap: Record<string, { bg: string; text: string; border: string }> = {
    admin: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-l-indigo-500" },
    teacher: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-l-emerald-500" },
    student: { bg: "bg-sky-50", text: "text-sky-600", border: "border-l-sky-500" },
    info: { bg: "bg-blue-50", text: "text-blue-600", border: "border-l-blue-500" },
    warning: { bg: "bg-amber-50", text: "text-amber-600", border: "border-l-amber-500" },
    danger: { bg: "bg-red-50", text: "text-red-600", border: "border-l-red-500" },
    success: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-l-emerald-500" },
  };

  const colors = accentMap[accent] ?? accentMap.info;

  return (
    <div
      className={`glass-card border-l-4 ${colors.border} p-5 animate-slide-up`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {label}
          </p>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
          {trend && (
            <p
              className={`text-xs font-medium flex items-center gap-1 ${
                trendUp ? "text-emerald-500" : "text-red-500"
              }`}
            >
              <svg
                className={`w-3 h-3 ${trendUp ? "" : "rotate-180"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {trend}
            </p>
          )}
        </div>
        <div
          className={`w-12 h-12 rounded-2xl ${colors.bg} ${colors.text} flex items-center justify-center`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
