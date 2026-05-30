"use client";

import DataTable from "@/components/ui/DataTable";
// import ResultDetailModal from "@/components/feature/Teacher/ResultDetail/components/ResultDetailModal";
// import ResultCharts from "@/components/feature/Teacher/Results/components/ResultCharts";
import { useResultsManagement } from "@/components/feature/Teacher/Results/hooks/useResultsManagement";
// import { resultsData } from "@/data/dummy/result";
// import { Download } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Pagination from "@/components/shared/Pagination";

export default function TeacherResultsPage() {
  const {
    exams,
    columnsTableResult,
    pagination,
    handlePageChange,
    isLoadingExam,
    // selectedSubmission,
    // essayScores,
    // saved,
    // closeDetail,
    // setEssayScore,
    // saveGrading,
    // columns,
    // resultDataSubmission,
    // avg,
    // highest,
    // lowest,
    // passed,
  } = useResultsManagement();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Exam Results"
          description="View and analyze student performance"
        />
      </div>

      {/* Summary stats */}
      {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Average Score", value: avg, color: "emerald" },
          { label: "Highest Score", value: highest, color: "sky" },
          { label: "Lowest Score", value: lowest, color: "amber" },
          {
            label: "Pass Rate",
            value: `${Math.round((passed / resultsData.length) * 100)}%`,
            color: "violet",
          },
        ].map((s, i) => (
          <div key={i} className="glass-card p-5 text-center">
            <p className="text-xs text-slate-400 font-medium mb-1">{s.label}</p>
            <p className={`text-3xl font-bold text-${s.color}-600`}>
              {s.value}
            </p>
          </div>
        ))}
      </div> */}

      {/* <ResultCharts /> */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <DataTable
          columns={columnsTableResult}
          data={exams}
          className="col-span-full"
          isLoading={isLoadingExam}
        />
        {pagination && (
          <Pagination
            currentPage={pagination.current_page}
            total={pagination.total}
            perPage={pagination.per_page}
            lastPage={pagination.last_page}
            onPageChange={handlePageChange}
          />
        )}
      </section>

      {/* <ResultDetailModal
        submission={selectedSubmission}
        essayScores={essayScores}
        saved={saved}
        onClose={closeDetail}
        onSetEssayScore={setEssayScore}
        onSave={saveGrading}
      /> */}
    </div>
  );
}
