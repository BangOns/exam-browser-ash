import Modal from "@/components/ui/Modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StudentRequest } from "@/types/student";

interface StudentFormModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  editing: StudentRequest;
  setEditing: React.Dispatch<React.SetStateAction<StudentRequest | null>>;
  handleSave: () => void;
  classOptions?: Options[];
}
interface Options {
  label: string;
  value: string;
}

export default function StudentFormModal({
  modalOpen,
  setModalOpen,
  editing,
  setEditing,
  handleSave,
  classOptions,
}: StudentFormModalProps) {
  return (
    <Modal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      title={"Add Teacher"}
    >
      <form className="space-y-5">
        {/* fullname */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Full Name
          </label>
          <Input
            type="text"
            className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 transition-all shadow-none"
            value={editing?.full_name || ""}
            onChange={(e) =>
              setEditing({ ...editing, full_name: e.target.value })
            }
            placeholder="e.g. Ahmad Fauzi"
          />
        </div>
        {/* username */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            username
          </label>
          <Input
            type="text"
            className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 transition-all shadow-none"
            value={editing?.username || ""}
            onChange={(e) =>
              setEditing({ ...editing, username: e.target.value })
            }
            placeholder="Username Guru"
          />
        </div>
        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            password
          </label>
          <Input
            type="password"
            className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 transition-all shadow-none"
            value={editing?.password || ""}
            onChange={(e) =>
              setEditing({ ...editing, password: e.target.value })
            }
            placeholder="Password"
          />
        </div>
        {/* NIP */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              NISN
            </label>

            <Input
              type="text"
              className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 transition-all shadow-none"
              value={editing?.nisn || ""}
              onChange={(e) => setEditing({ ...editing, nisn: e.target.value })}
              placeholder="NISN"
            />
          </div>
        </div>
        {/* Lessons */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Kelas
            </label>
            <select
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
              value={editing?.class_id}
              onChange={(e) =>
                setEditing((prev) => {
                  if (!prev) return prev;
                  return { ...prev, class_id: e.target.value };
                })
              }
            >
              <option value="">Pilih Kelas</option>
              {classOptions?.map((cls) => (
                <option key={cls.value} value={cls.value}>
                  {cls.label}
                </option>
              ))}
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
            disabled={!editing?.username?.trim() || !editing?.nisn?.trim()}
            className="px-5 py-2.5 h-10 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Student
          </Button>
        </div>
      </form>
    </Modal>
  );
}
