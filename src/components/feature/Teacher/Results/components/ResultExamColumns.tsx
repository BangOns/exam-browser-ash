import { ExamList } from "@/types/exam";
import Link from "next/link";
export function ResultExamColumns() {
  return [
    {
      key: "name",
      label: "Exam Name",
      render: (row: ExamList) => (
        <p className="font-medium text-slate-700">{row.name}</p>
      ),
    },
    {
      key: "subject",
      label: "Subject",
      render: (row: ExamList) => (
        <span className="badge badge-info">{row.lesson.subject.name}</span>
      ),
    },
    {
      key: "targetClass",
      label: "Class",
      render: (row: ExamList) => (
        <span className="badge badge-neutral">{row.lesson.class.name}</span>
      ),
    },

    {
      key: "status",
      label: "Status",
      render: (row: ExamList) => (
        <span
          className={`badge ${
            row.status === "Active"
              ? "badge-success"
              : row.status === "Scheduled"
                ? "badge-info"
                : row.status === "Draft"
                  ? "badge-neutral"
                  : "badge-warning"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: ExamList) => (
        <div className="flex gap-2 flex-wrap">
          <Link
            href={`/teacher/results/${row.id}`}
            className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors font-medium"
            title="Select questions from bank"
          >
            📋 Detail
          </Link>
        </div>
      ),
    },
  ];
}
