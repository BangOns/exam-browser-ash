import React from "react";

export default function CardStatsExamResult({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="glass-card p-5 text-center">
      <p className="text-xs text-slate-400 font-medium mb-1">{label}</p>
      <p className="text-3xl font-bold text-sky-600">{value}</p>
    </div>
  );
}
