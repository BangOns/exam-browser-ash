export default function Progress({ value }: { value: number }) {
  return (
    <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
      <circle
        cx="18"
        cy="18"
        r="16"
        fill="none"
        stroke="#e2e8f0"
        strokeWidth="3"
      />
      <circle
        cx="18"
        cy="18"
        r="16"
        fill="none"
        stroke={value >= 85 ? "#22c55e" : value >= 70 ? "#0ea5e9" : "#f59e0b"}
        strokeWidth="3"
        strokeDasharray={`${value} ${100 - value}`}
        strokeLinecap="round"
      />
    </svg>
  );
}
