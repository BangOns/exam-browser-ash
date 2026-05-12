"use client";

import DataTable from "@/components/ui/DataTable";
import { Button } from "@/components/ui/button";
import { initialQuestions } from "@/data/dummy/questions";
import QuestionPickerModal from "@/components/feature/Teacher/Exams/components/QuestionPickerModal";
import PageHeader from "@/components/shared/PageHeader";
import { useExamTeacherManagement } from "@/components/feature/Teacher/Exams/hooks/useExamManagement";
import ExamFormModalTeacher from "@/components/feature/Teacher/Exams/components/ExamFormModal";
import { statusOptions } from "@/constants/statusOption";
import { ExamList, ExamRequest } from "@/types/exam";

export default function TeacherExamsPage() {
  const {
    lessons,
    openAdd,
    columns,
    exams,
    pickerExam,
    setPickerExam,
    pickerOpen,
    setPickerOpen,
    handlePickerSave,
    modalOpen,
    setModalOpen,
    editingExam,
    setEditingExam,
    handleSave,
  } = useExamTeacherManagement();
  console.log(exams);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <PageHeader
          title="My Exams"
          description="Create and manage your exams"
        />
        <Button
          onClick={openAdd}
          className="px-5 py-2.5 h-10 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors shadow-sm"
        >
          + Create Exam
        </Button>
      </div>

      {/* Summary */}
      {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Exams", value: exams.length, emoji: "📝" },
          {
            label: "Active",
            value: exams.filter((e) => e.status === "Active").length,
            emoji: "🟢",
          },
          {
            label: "Scheduled",
            value: exams.filter((e) => e.status === "Scheduled").length,
            emoji: "📅",
          },
          {
            label: "Draft",
            value: exams.filter((e) => e.status === "Draft").length,
            emoji: "📋",
          },
        ].map((s, i) => (
          <InfoCard key={i} {...s} />
        ))}
      </div> */}

      {/* Filters */}
      {/* <div className="flex gap-2 flex-wrap">
        {statusTabs.map((tab) => (
          <Button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-emerald-500 text-white"
                : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            {tab}
          </Button>
        ))}
      </div> */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <DataTable
          columns={columns}
          className="col-span-full"
          data={exams as ExamList[]}
        />
      </section>

      {/* Add/Edit Modal */}
      <ExamFormModalTeacher
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        editingExam={editingExam as ExamRequest}
        setEditingExam={setEditingExam}
        handleSave={handleSave}
        lessons={lessons}
        statusOptions={statusOptions}
      />

      {/* Question Picker Modal */}
      {/* {pickerExam && (
        <QuestionPickerModal
          isOpen={pickerOpen}
          onClose={() => {
            setPickerOpen(false);
            setPickerExam(null);
          }}
          examName={pickerExam.name}
          examSubject={pickerExam.subject}
          allQuestions={initialQuestions}
          selectedIds={pickerExam?.questionIds || []}
          onSave={handlePickerSave}
        />
      )} */}
    </div>
  );
}
