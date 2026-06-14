"use client";
// import InfoCard from "@/components/shared/InfoCard";
import PageHeader from "@/components/shared/PageHeader";
// import { auditLog } from "@/data/dummy/report";
import { TYPE_STYLES } from "@/constants/styles";
import ReportCard from "@/components/feature/Admin/Report/components/ReportCard";
// import { Button } from "@/components/ui/button";
import { useReportManagement } from "@/components/feature/Admin/Report/hooks/useReportManagement";
import { useMemo } from "react";
import { AuditEntry, ReportList } from "@/types/report";

export default function AdminReportsPage() {
  const { data } = useReportManagement();
  // const stats = [
  //   {
  //     label: "Total Events",
  //     value: data?.meta.pagination.total || 0,
  //     emoji: "📊",
  //   },
  //   // { label: "Violations", value: "23", emoji: "⚠️" },
  //   // { label: "System Events", value: "856", emoji: "🔧" },
  //   {
  //     label: "User Actions",
  //     value: data?.meta.pagination.total || 0,
  //     emoji: "👤",
  //   },
  // ];

  const activityLogs: AuditEntry[] | [] = useMemo(() => {
    if (!data?.data) return [];

    return data.data.map((item: ReportList) => ({
      id: item.id,
      action: `${item.user.name} sedang melakukan aksi ${item.action}`,
      user: item.user.name,
      role: item.user.role,
      timestamp: item.timestamp,
      type:
        item.action === "login" || "register"
          ? "info"
          : item.action === "create" || "update"
            ? "success"
            : "danger",
    }));
  }, [data]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Audit Log"
        description="System activity timeline and violation reports"
      />

      {/* Quick stats */}
      {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <InfoCard key={i} {...s} />
        ))}
      </div> */}

      {/* Filter */}
      {/* <div className="flex gap-2">
        {["All", "Violations", "System", "User Actions"].map((tab, i) => (
          <Button
            key={tab}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              i === 0
                ? "bg-indigo-500 text-white"
                : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            {tab}
          </Button>
        ))}
      </div> */}

      {/* Audit timeline */}
      <div className="glass-card p-6 animate-slide-up">
        <div className="space-y-4">
          {activityLogs.map((entry) => {
            const styles = TYPE_STYLES[entry.type];
            return <ReportCard key={entry.id} entry={entry} styles={styles} />;
          })}
        </div>
      </div>
    </div>
  );
}
