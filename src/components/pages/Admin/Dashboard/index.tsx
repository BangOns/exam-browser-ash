import StatCard from "@/components/ui/StatCard";
import DataTable from "@/components/ui/DataTable";
import { UserRow } from "@/types/user";
import { ScheduleRow } from "@/types/schedule";
import { usersData } from "@/data/dummy/user";
import { scheduleData } from "@/data/dummy/schedule";
import { statsData } from "@/data/dummy/stats";
import PageHeader from "@/components/shared/PageHeader";
import Link from "next/link";
import RecentNotif from "@/components/feature/Admin/Dashboard/components/RecentNotif";
import { DashboardUserColumns } from "@/components/feature/Admin/Dashboard/components/DashboardUserColumns";
import { DashboardScheduleColumns } from "@/components/feature/Admin/Dashboard/components/DashboardScheduleColumns";

export default function AdminDashboard() {
  const userColumns = DashboardUserColumns();
  const scheduleColumns = DashboardScheduleColumns();
  return (
    <article className="space-y-8">
      {/* Page header */}
      <PageHeader
        title="Admin Dashboard"
        description="System overview and management controls"
      />

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statsData.map((stat, i) => (
          <StatCard key={i} {...stat} accent={i === 3 ? "danger" : "admin"} />
        ))}
      </section>

      {/* Alerts panel */}
      <RecentNotif />

      {/* Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DataTable
          title="Recent Users"
          columns={userColumns}
          data={usersData}
          action={
            <Link
              href="/admin/users/students"
              className="text-xs px-4 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-colors font-semibold shadow-sm"
            >
              + Add User
            </Link>
          }
        />
        <DataTable
          title="Exam Schedule"
          columns={scheduleColumns}
          data={scheduleData}
          action={
            <Link
              href="/admin/schedule"
              className="text-xs px-4 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-colors font-semibold shadow-sm"
            >
              + Schedule Exam
            </Link>
          }
        />
      </div>
    </article>
  );
}
