"use client";

import DataTable from "@/components/ui/DataTable";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/shared/PageHeader";
import InfoCard from "@/components/shared/InfoCard";
import TeacherFormModal from "@/components/feature/Admin/Teacher/components/TeacherFormModal";
import { useTeacherManagement } from "@/components/feature/Admin/Teacher/hooks/useTeacherManagement";

export default function AdminTeacherListPage() {
  const {
    teachers,
    modalOpen,
    editing,
    openAdd,
    handleSave,
    columns,
    setModalOpen,
    setEditing,
  } = useTeacherManagement();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <PageHeader
          title="Teacher List"
          description="Manage teacher accounts and assignments"
        />
        <Button
          onClick={openAdd}
          className="px-5 py-2.5 h-10 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-sm"
        >
          + Add Teacher
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: "Total Teachers", value: teachers.length, emoji: "👩‍🏫" },
          {
            label: "Active",
            value: teachers.filter((t) => t.status === "Active").length,
            emoji: "🟢",
          },
          {
            label: "Total Exams",
            value: teachers.reduce((s, t) => s + t.examsCreated, 0),
            emoji: "📝",
          },
        ].map((s, i) => (
          <InfoCard key={i} {...s} />
        ))}
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <DataTable
          columns={columns}
          data={teachers}
          className="col-span-full"
        />
      </section>

      {/* Add/Edit Modal */}
      <TeacherFormModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        editing={editing}
        setEditing={setEditing}
        handleSave={handleSave}
        teachers={teachers}
      />
    </div>
  );
}
