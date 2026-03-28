"use client";

import StatCard from "@/components/ui/StatCard";
import DataTable from "@/components/ui/DataTable";
import PageHeader from "@/components/shared/PageHeader";
import MonitoringSection from "@/components/feature/Teacher/Dashboard/components/MonitoringSection";
import { useDashboardManagement } from "@/components/feature/Teacher/Dashboard/hooks/useDashboardManagement";
import { statsDataTeacher } from "@/data/dummy/stats";

export default function TeacherDashboardPage() {
  const { questionList, resultList, columnsQuestion, columnsResult } =
    useDashboardManagement();
  return (
    <article className="space-y-8">
      {/* Page header */}
      <PageHeader
        title="Admin Dashboard"
        description="Manage your exams, questions, and monitor student progress"
      />

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statsDataTeacher.map((stat, i) => (
          <StatCard key={i} {...stat} accent="teacher" />
        ))}
      </section>

      {/* Monitoring quick view */}
      <MonitoringSection />

      {/* Tables */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DataTable
          title="Question Bank"
          columns={columnsQuestion}
          data={questionList}
          action={
            <button className="text-xs px-4 py-2 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-colors font-semibold shadow-sm">
              + Add Question
            </button>
          }
        />
        <DataTable
          title="Recent Results"
          columns={columnsResult}
          data={resultList}
        />
      </section>
    </article>
  );
}
