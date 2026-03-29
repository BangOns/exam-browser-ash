"use client";

import StatCard from "@/components/ui/StatCard";

import PageHeader from "@/components/shared/PageHeader";
import CardExamNow from "@/components/feature/Student/Dashboard/components/CardExamNow";
import { TriangleAlert } from "lucide-react";
import { examsQuestionNow } from "@/data/dummy/exams";
import { recentResults } from "@/data/dummy/result";
import CardRecentResult from "@/components/feature/Student/Dashboard/components/CardRecentResult";
import TokenVerifyModal from "@/components/feature/Student/Dashboard/components/TokenVerifyModal";
import { statsDataStudent } from "@/data/dummy/stats";
import { useDashboardStudentManagement } from "@/components/feature/Student/Dashboard/hooks/useDashboardStudentManagement";

export default function StudentDashboard() {
  const {
    verifyModal,
    setVerifyModal,
    tokenInput,
    setTokenInput,
    handleVerifyToken,
    errorMsg,
    handleStartExam,
  } = useDashboardStudentManagement();

  return (
    <article className="space-y-8">
      {/* Page header */}
      <PageHeader
        title="Student Dashboard"
        description="View your exams, results, and notifications"
      />

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statsDataStudent.map((stat, i) => (
          <StatCard
            key={i}
            {...stat}
            accent={i === 3 ? "warning" : "student"}
          />
        ))}
      </section>

      {/* Available Exams */}
      <section className="glass-card overflow-hidden animate-slide-up">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-base font-semibold text-slate-800">
            Available & Upcoming Exams
          </h3>
        </div>
        <div className="p-4 space-y-3">
          {examsQuestionNow.map((exam) => (
            <CardExamNow
              key={exam.id}
              exam={exam}
              handleStartExam={handleStartExam}
            />
          ))}
        </div>
      </section>

      {/* Recent Results */}
      <div className="glass-card overflow-hidden animate-slide-up">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-base font-semibold text-slate-800">
            Recent Results
          </h3>
        </div>
        <div className="p-4 space-y-3">
          {recentResults.map((result, i) => (
            <CardRecentResult result={result} key={i} />
          ))}
        </div>
      </div>

      {/* Violation Warning card */}
      <div className="glass-card border-l-4 border-l-amber-400 p-5 animate-slide-up">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <TriangleAlert />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800">
              Exam Rules Reminder
            </h4>
            <p className="text-sm text-slate-500 mt-1">
              Do not switch tabs, open other applications, or exit fullscreen
              during an exam. Violations will be recorded and reported to your
              teacher.
            </p>
          </div>
        </div>
      </div>
      {/* Token Verification Modal */}
      <TokenVerifyModal
        verifyModal={verifyModal}
        setVerifyModal={setVerifyModal}
        tokenInput={tokenInput}
        setTokenInput={setTokenInput}
        handleVerifyToken={handleVerifyToken}
        errorMsg={errorMsg}
      />
    </article>
  );
}
