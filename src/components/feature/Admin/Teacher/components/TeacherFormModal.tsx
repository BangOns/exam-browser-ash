import Modal from "@/components/ui/Modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Teacher } from "@/types/teacher";
import { subjectOptions } from "@/constants/subjectOption";

interface TeacherFormModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  editing: Teacher | null;
  setEditing: (teacher: Teacher | null) => void;
  handleSave: () => void;
  teachers: Teacher[];
}

export default function TeacherFormModal({
  modalOpen,
  setModalOpen,
  editing,
  setEditing,
  handleSave,
  teachers,
}: TeacherFormModalProps) {
  return (
    <Modal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      title={
        editing?.id && teachers.find((t) => t.id === editing.id)
          ? "Edit Teacher"
          : "Add Teacher"
      }
    >
      {editing && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Full Name
            </label>
            <Input
              type="text"
              className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 transition-all shadow-none"
              value={editing.name}
              onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              placeholder="e.g. Ahmad Fauzi"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Email
            </label>
            <Input
              type="email"
              className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 transition-all shadow-none"
              value={editing.email}
              onChange={(e) =>
                setEditing({ ...editing, email: e.target.value })
              }
              placeholder="e.g. ahmad@school.id"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Subject Specialty
              </label>
              <select
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all bg-white"
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
                Status
              </label>
              <select
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all bg-white"
                value={editing.status}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    status: e.target.value as "Active" | "Inactive",
                  })
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              variant="ghost"
              onClick={() => setModalOpen(false)}
              className="px-5 py-2.5 h-10 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!editing.name.trim() || !editing.email.trim()}
              className="px-5 py-2.5 h-10 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {teachers.find((t) => t.id === editing.id)
                ? "Save Changes"
                : "Add Teacher"}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
