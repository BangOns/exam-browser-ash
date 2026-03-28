"use client";

import DataTable from "@/components/ui/DataTable";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/shared/PageHeader";
import ExamFormModal from "@/components/feature/Admin/Exams/components/ExamFormModal";
import SubjectTimerModal from "@/components/feature/Admin/Exams/components/SubjectTimerModal";
import { statusTabs } from "@/components/feature/Admin/Exams/constants";
import { useExamsManagement } from "@/components/feature/Admin/Exams/hooks/useExamsManagement";
import { statsExams } from "@/data/dummy/exams";
import InfoCard from "@/components/shared/InfoCard";
import { subjectOptions } from "@/constants/subjectOption";
import { statusOptions } from "@/constants/statusOption";
import { ExamRow } from "@/types/exam";

export default function AdminExamsPage() {
  const {
    exams,
    subjectTimers,
    modalOpen,
    timerModalOpen,
    editingExam,
    activeTab,
    filtered,
    openAdd,
    handleSave,
    columns,
    setModalOpen,
    setTimerModalOpen,
    setEditingExam,
    setActiveTab,
    setSubjectTimers,
  } = useExamsManagement();

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between flex-wrap gap-4">
        <PageHeader
          title="Exam Management"
          description="Create exams, manage tokens, and configure global subject timers"
        />
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => setTimerModalOpen(true)}
            className="px-5 py-2.5 h-10 rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition-colors shadow-sm"
          >
            Configure Timers
          </Button>
          <Button
            onClick={openAdd}
            className="px-5 py-2.5 h-10 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-sm"
          >
            + Create Exam
          </Button>
        </div>
      </header>

      {/* Summary Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statsExams.map((s, i) => (
          <InfoCard key={i} {...s} />
        ))}
      </section>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {statusTabs.map((tab) => (
          <Button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-indigo-500 text-white"
                : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            {tab}
          </Button>
        ))}
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <DataTable
          columns={columns}
          data={filtered}
          className="col-span-full"
        />
      </section>

      {/* Add/Edit Modal */}
      <ExamFormModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        editingExam={editingExam}
        setEditingExam={setEditingExam}
        handleSave={handleSave}
        subjectOptions={subjectOptions}
        statusOptions={statusOptions as ExamRow["status"][]}
        subjectTimers={subjectTimers}
        exams={exams}
      />

      {/* Timer Configuration Modal */}
      <SubjectTimerModal
        timerModalOpen={timerModalOpen}
        setTimerModalOpen={setTimerModalOpen}
        subjectTimers={subjectTimers}
        setSubjectTimers={setSubjectTimers}
      />
    </section>
  );
}
