import Modal from "@/components/ui/Modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Schedule } from "@/types/schedule";

export default function SheduleFormModal({
  modalOpen,
  setModalOpen,
  editing,
  setEditing,
  schedules,
  subjectOptions,
  handleSave,
}: {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  editing: Schedule | null;
  setEditing: (editing: Schedule | null) => void;
  schedules: Schedule[];
  subjectOptions: string[];
  handleSave: () => void;
}) {
  return (
    <Modal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      title={
        editing?.id && schedules.find((s) => s.id === editing.id)
          ? "Edit Schedule"
          : "Add Schedule"
      }
    >
      {editing && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Exam Name
            </label>
            <Input
              type="text"
              className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-sky-500/30 focus-visible:border-sky-500 transition-all shadow-none"
              value={editing.name}
              onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              placeholder="e.g. UTS Mathematics"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Subject
              </label>
              <select
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all bg-white"
                value={editing.subject}
                onChange={(e) =>
                  setEditing({ ...editing, subject: e.target.value })
                }
              >
                {subjectOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Date
              </label>
              <Input
                type="date"
                className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-sky-500/30 focus-visible:border-sky-500 transition-all shadow-none bg-white"
                value={editing.date}
                onChange={(e) =>
                  setEditing({ ...editing, date: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Start Time
              </label>
              <Input
                type="time"
                className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-sky-500/30 focus-visible:border-sky-500 transition-all shadow-none bg-white"
                value={editing.startTime}
                onChange={(e) =>
                  setEditing({ ...editing, startTime: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                End Time
              </label>
              <Input
                type="time"
                className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-sky-500/30 focus-visible:border-sky-500 transition-all shadow-none bg-white"
                value={editing.endTime}
                onChange={(e) =>
                  setEditing({ ...editing, endTime: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Status
            </label>
            <select
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all bg-white"
              value={editing.status}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  status: e.target.value as Schedule["status"],
                })
              }
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              variant="ghost"
              onClick={() => setModalOpen(false)}
              className="px-5 py-2.5 h-10 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              title="Cancel"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={
                !editing.name.trim() ||
                !editing.date ||
                !editing.startTime ||
                !editing.endTime
              }
              className="px-5 py-2.5 h-10 rounded-xl bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              title="Save Schedule"
            >
              {schedules.find((s) => s.id === editing.id)
                ? "Save Changes"
                : "Save Schedule"}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
