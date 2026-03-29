"use client";

import CardInfoMonitoring from "@/components/feature/Teacher/Monitoring/components/CardInfoMonitoring";
import ExamInfoBar from "@/components/feature/Teacher/Monitoring/components/ExamInfoBar";
import { statusConfig } from "@/components/feature/Teacher/Monitoring/constants";
import PageHeader from "@/components/shared/PageHeader";
import { useMonitoringManagement } from "@/components/feature/Teacher/Monitoring/hooks/useMonitoringManagement";

export default function TeacherMonitoringPage() {
  const { studentListSession, activeCount, flaggedCount } =
    useMonitoringManagement();
  return (
    <article className="space-y-6">
      <header className="flex items-center justify-between">
        <PageHeader
          title="Student Monitoring"
          description="Real-time monitoring of Quiz Physics"
        />
        <section className="flex items-center gap-3">
          <span className="badge badge-success flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-soft" />
            {activeCount} Active
          </span>
          {flaggedCount > 0 && (
            <span className="badge badge-danger flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse-soft" />
              {flaggedCount} Flagged
            </span>
          )}
        </section>
      </header>

      {/* Exam info bar */}
      <ExamInfoBar students={studentListSession} />

      {/* Student grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {studentListSession.map((student, i) => {
          const config = statusConfig[student.status];
          return (
            <CardInfoMonitoring key={i} student={student} config={config} />
          );
        })}
      </section>
    </article>
  );
}
