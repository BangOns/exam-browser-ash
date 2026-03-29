export const statusConfig = {
  active: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
    label: "Active",
    labelBg: "badge-success",
  },
  idle: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    dot: "bg-amber-500",
    label: "Idle",
    labelBg: "badge-warning",
  },
  flagged: {
    bg: "bg-red-50",
    border: "border-red-200",
    dot: "bg-red-500",
    label: "Flagged",
    labelBg: "badge-danger",
  },
  completed: {
    bg: "bg-slate-50",
    border: "border-slate-200",
    dot: "bg-slate-400",
    label: "Done",
    labelBg: "badge-neutral",
  },
} as const;
