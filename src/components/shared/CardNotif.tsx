import { Notif } from "@/types/notif";
import { TriangleAlert } from "lucide-react";

export default function CardNotif({ alert }: { alert: Notif }) {
  return (
    <section
      className={`flex items-start gap-3 p-3 rounded-xl border transition-colors ${
        alert.type === "violation"
          ? "border-red-100 bg-red-50/50 hover:bg-red-50"
          : "border-amber-100 bg-amber-50/50 hover:bg-amber-50"
      }`}
    >
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
          alert.type === "violation"
            ? "bg-red-100 text-red-500"
            : "bg-amber-100 text-amber-500"
        }`}
      >
        <TriangleAlert size={20} strokeWidth={1.8} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-700">{alert.message}</p>
        <p className="text-xs text-slate-400 mt-0.5">{alert.time}</p>
      </div>
    </section>
  );
}
