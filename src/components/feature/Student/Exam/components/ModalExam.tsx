import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

interface ModalExamProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  submitText?: string;
  closeText?: string;
  handleSubmit: () => void;
  handleClose: () => void;
  isPending?: boolean;
}

export default function ModalExam({
  title,
  description,
  icon,
  submitText = "Submit",
  closeText = "Cancel",
  handleSubmit,
  handleClose,
  isPending,
}: ModalExamProps) {
  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="glass-card animate-scale-in w-full max-w-md rounded-2xl bg-white p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-500">
          {icon ?? <TriangleAlert size={32} />}
        </div>

        <h3 className="mb-2 text-xl font-bold text-slate-800">{title}</h3>

        <p className="mb-6 text-sm leading-relaxed text-slate-500">
          {description}
        </p>

        <section className="flex justify-center gap-3">
          <Button
            onClick={handleClose}
            disabled={isPending}
            className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {closeText}
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Processing..." : submitText}
          </Button>
        </section>
      </div>
    </section>
  );
}
