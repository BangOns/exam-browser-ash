"use client";

import DataTable from "@/components/ui/DataTable";
import { Button } from "@/components/ui/button";
import { gradeOptions } from "@/components/feature/Admin/Student/constant";
import { useStudentManagement } from "@/components/feature/Admin/Student/hooks/useStudentManagement";
import InfoCard from "@/components/shared/InfoCard";
import StudentFormModal from "@/components/feature/Admin/Student/components/StudentFormModal";
import { Student } from "@/types/student";
import PageHeader from "@/components/shared/PageHeader";

export default function AdminStudentListPage() {
  const {
    students,
    modalOpen,
    editing,
    openAdd,
    handleSave,
    columns,
    setModalOpen,
    setEditing,
  } = useStudentManagement();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <PageHeader
          title="Student List"
          description="Manage student accounts and enrollment"
        />
        <Button
          onClick={openAdd}
          className="px-5 py-2.5 h-10 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-sm"
        >
          + Add Student
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Students", value: students.length, emoji: "🎓" },
          {
            label: "Active",
            value: students.filter((s) => s.status === "Active").length,
            emoji: "🟢",
          },
          {
            label: "Avg Score",
            value: Math.round(
              students.reduce((s, st) => s + st.avgScore, 0) / students.length,
            ),
            emoji: "📊",
          },
          {
            label: "Total Exams",
            value: students.reduce((s, st) => s + st.examsTaken, 0),
            emoji: "📝",
          },
        ].map((s, i) => (
          <InfoCard key={i} {...s} />
        ))}
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <DataTable
          columns={columns}
          data={students}
          className="col-span-full"
        />
      </section>

      {/* Add/Edit Modal */}
      <StudentFormModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        editing={editing as Student}
        setEditing={setEditing}
        handleSave={handleSave}
        students={students}
        gradeOptions={gradeOptions}
      />
    </div>
  );
}
