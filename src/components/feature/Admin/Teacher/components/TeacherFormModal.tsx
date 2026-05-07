import Modal from "@/components/ui/Modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TeacherRequest } from "@/types/teacher";

interface TeacherFormModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  editing: TeacherRequest;
  setEditing: React.Dispatch<React.SetStateAction<TeacherRequest | null>>;
  handleSave: () => void;
  classOptions?: Options[];
  subjectOptions?: Options[];
}
interface Options {
  label: string;
  value: string;
}

export default function TeacherFormModal({
  modalOpen,
  setModalOpen,
  editing,
  setEditing,
  handleSave,
  classOptions,
  subjectOptions,
}: TeacherFormModalProps) {
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
              NIP
            </label>

            <Input
              type="text"
              className="h-10 w-full px-4 rounded-xl border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-500 transition-all shadow-none"
              value={editing?.nip || ""}
              onChange={(e) => setEditing({ ...editing, nip: e.target.value })}
              placeholder="NIP"
            />
          </div>
        </div>
        {/* Lessons */}
        <div className="space-y-4">
          {editing?.lessons?.map((lesson, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 items-end">
              {/* Mata Pelajaran */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Mata Pelajaran
                </label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                  value={lesson.subject_id}
                  onChange={(e) =>
                    setEditing((prev) => {
                      if (!prev) return prev;
                      const updated = [...(prev.lessons || [])];
                      updated[index] = {
                        ...updated[index],
                        subject_id: e.target.value,
                      };
                      return { ...prev, lessons: updated };
                    })
                  }
                >
                  <option value="">Pilih Subject</option>
                  {subjectOptions?.map((subject) => (
                    <option key={subject.value} value={subject.value}>
                      {subject.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Kelas */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Kelas
                </label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                  value={lesson.class_id}
                  onChange={(e) =>
                    setEditing((prev) => {
                      if (!prev) return prev;
                      const updated = [...(prev.lessons || [])];
                      updated[index] = {
                        ...updated[index],
                        class_id: e.target.value,
                      };
                      return { ...prev, lessons: updated };
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

              {/* Button Hapus */}
              <div className="col-span-2 flex justify-end">
                <Button
                  type="button"
                  onClick={() =>
                    setEditing((prev) => {
                      if (!prev) return prev;
                      const updated = (prev.lessons || []).filter(
                        (_, i) => i !== index,
                      );
                      return { ...prev, lessons: updated };
                    })
                  }
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  Hapus
                </Button>
              </div>
            </div>
          ))}

          {/* Button Tambah */}
          <Button
            type="button"
            onClick={() =>
              setEditing((prev) => {
                if (!prev) return prev;
                return {
                  ...prev,
                  lessons: [
                    ...(prev.lessons || []),
                    { subject_id: "", class_id: "" },
                  ],
                };
              })
            }
            className="px-4 py-2 rounded-xl bg-indigo-500 text-white text-sm hover:bg-indigo-600"
          >
            + Tambah Lesson
          </Button>
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
            disabled={!editing?.username?.trim() || !editing?.nip?.trim()}
            className=" cursor-pointer px-5 py-2.5 h-10 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Tambah Guru
          </Button>
        </div>
      </form>
    </Modal>
  );
}
