import { AuditEntry } from "@/types/report";
import { TYPE_STYLES } from "@/constants/styles";
import { CircleAlert, Info, TriangleAlert } from "lucide-react";
import { formatDateIndonesia } from "@/utils/FormatDate";

export default function ReportCard({
  entry,
  styles,
}: {
  entry: AuditEntry;
  styles: (typeof TYPE_STYLES)[keyof typeof TYPE_STYLES];
}) {
  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-xl border-l-4 bg-white shadow-sm ${styles.border}`}
    >
      <div
        className={`w-10 h-10 rounded-xl ${styles.icon} flex items-center justify-center shrink-0`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {entry.type === "danger" ? (
            <TriangleAlert className="text-red-400" />
          ) : entry.type === "warning" ? (
            <CircleAlert className="text-orange-400" />
          ) : (
            <Info className="text-blue-400" />
          )}
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-700">{entry.action}</p>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="text-xs text-slate-400">
            {formatDateIndonesia(entry.timestamp as string)}
          </span>
          <span
            className={`badge ${
              entry.role === "Student"
                ? "badge-neutral"
                : entry.role === "Teacher"
                  ? "badge-info"
                  : entry.role === "Admin"
                    ? "badge-warning"
                    : "badge-neutral"
            }`}
          >
            {entry.user}
          </span>
        </div>
      </div>
    </div>
  );
}
