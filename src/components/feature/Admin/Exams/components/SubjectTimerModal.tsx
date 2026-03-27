import Modal from "@/components/ui/Modal";
import React from "react";
import { Button } from "@/components/ui/button";

export default function SubjectTimerModal({
  timerModalOpen,
  setTimerModalOpen,
  subjectTimers,
  setSubjectTimers,
}: {
  timerModalOpen: boolean;
  setTimerModalOpen: (open: boolean) => void;
  subjectTimers: Record<string, string>;
  setSubjectTimers: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
}) {
  return (
    <Modal
      isOpen={timerModalOpen}
      onClose={() => setTimerModalOpen(false)}
      title="Global Subject Timers"
    >
      <section className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        {Object.entries(subjectTimers).map(([subject, duration]) => (
          <div
            key={subject}
            className="flex items-center justify-between border-b border-slate-100 pb-3"
          >
            <span className="text-sm font-semibold text-slate-700">
              {subject}
            </span>
            <select
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 bg-white"
              value={duration}
              onChange={(e) =>
                setSubjectTimers((prev) => ({
                  ...prev,
                  [subject]: e.target.value,
                }))
              }
            >
              {[
                "30 min",
                "45 min",
                "60 min",
                "90 min",
                "120 min",
                "150 min",
                "180 min",
              ].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div className="flex justify-end pt-4">
          <Button
            onClick={() => setTimerModalOpen(false)}
            className="px-5 py-2.5 h-10 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-sm"
          >
            Done Settings
          </Button>
        </div>
      </section>
    </Modal>
  );
}
