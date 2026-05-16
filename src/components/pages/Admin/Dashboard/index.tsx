import PageHeader from "@/components/shared/PageHeader";

export default function AdminDashboard() {
  return (
    <article className="space-y-8">
      {/* Page header */}
      <PageHeader
        title="Admin Dashboard"
        description="System overview and management controls"
      />

      {/* Stats */}
      {/* <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statsData.map((stat, i) => (
          <StatCard key={i} {...stat} accent={i === 3 ? "danger" : "admin"} />
        ))}
      </section> */}

      {/* Alerts panel */}
      {/* <div className="glass-card p-6 animate-slide-up">
          <div className="space-y-4">
            {activityLogs.map((entry) => {
              const styles = TYPE_STYLES[entry.type];
              return <ReportCard key={entry.id} entry={entry} styles={styles} />;
            })}
          </div>
        </div> */}

      {/* Tables */}
      {/* <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
        /> */}
      {/* <DataTable
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
        /> */}
      {/* </div> */}
    </article>
  );
}
