"use client";

import DataTable from "@/components/ui/DataTable";
import ResultDetailModal from "@/components/feature/Teacher/Results/components/ResultDetailModal";
import ResultCharts from "@/components/feature/Teacher/Results/components/ResultCharts";
import { useResultsManagement } from "@/components/feature/Teacher/Results/hooks/useResultsManagement";
import { resultsData } from "@/data/dummy/result";
import { Download } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { useResultByIdManagement } from "@/components/feature/Teacher/ResultDetail/hooks/useResultByIdManagement";

export default function TeacherResultsByIdPage() {
  const {
    result,

    columns,
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
  } = useResultByIdManagement();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Exam Results Details"
          description="View and analyze student performance"
        />
        {/* <button className="px-5 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors shadow-sm flex items-center gap-2">
          <Download size={20} />
          Export
        </button> */}
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

      <DataTable columns={columns} data={result} />

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
