"use client";

import DataTable from "@/components/ui/DataTable";
import { Button } from "@/components/ui/button";
import { useStudentManagement } from "@/components/feature/Admin/Student/hooks/useStudentManagement";
import InfoCard from "@/components/shared/InfoCard";
import StudentFormModal from "@/components/feature/Admin/Student/components/StudentFormModal";
import { StudentRequest, StudentRequestEdit } from "@/types/student";
import PageHeader from "@/components/shared/PageHeader";
import StudentFormModalEdit from "@/components/feature/Admin/Student/components/StudentFormModalEdit";

export default function AdminStudentListPage() {
  const {
    students,
    studentId,
    isLoadingStudents,
    editingId,
    setEditingId,
    classStudent,
    modalOpen,
    editing,
    openAdd,
    handleSave,
    handleSaveEdit,
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
        ].map((s, i) => (
          <InfoCard key={i} {...s} />
        ))}
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <DataTable
          columns={columns}
          data={students}
          className="col-span-full"
          isLoading={isLoadingStudents}
        />
      </section>

      {/* Add Modal */}
      {editing && (
        <StudentFormModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          editing={editing as StudentRequest}
          setEditing={setEditing}
          handleSave={handleSave}
          classOptions={classStudent.map((cls) => ({
            value: cls.id,
            label: cls.name,
          }))}
        />
      )}
      {studentId && (
        <StudentFormModalEdit
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          editing={editingId as StudentRequestEdit}
          setEditing={setEditingId}
          handleSave={handleSaveEdit}
          classOptions={classStudent.map((cls) => ({
            value: cls.id,
            label: cls.name,
          }))}
        />
      )}
    </div>
  );
}
