import React, { useState } from "react";

import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { usePostClass } from "@/hooks/class/post-class";
import { useUpdateClass } from "@/hooks/class/update-class";
import { useDeleteClass } from "@/hooks/class/delete-class";
import { ClassList, ClassRequest } from "@/types/class";

interface Props {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  classList?: ClassList[];
}

interface FormState {
  level: string;
  department: string;
}

const initialForm: FormState = {
  level: "",
  department: "",
};

export default function ClassModal({
  modalOpen,
  setModalOpen,
  classList,
}: Props) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [classId, setClassId] = useState<string>("");

  const { mutate: createClass, isPending: isPendingCreate } = usePostClass();

  const { mutate: updateClass, isPending: isPendingUpdate } = useUpdateClass();

  const {
    mutate: deleteClass,
    isPending: isPendingDelete,
    isError: isErrorDeleteClass,
    error: errorDeleteClass,
  } = useDeleteClass();

  const isEditMode = Boolean(classId);

  const isLoading = isPendingCreate || isPendingUpdate || isPendingDelete;

  const handleChange = (key: keyof FormState, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setClassId("");
  };

  const handleClose = () => {
    setModalOpen(false);
    resetForm();
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: ClassRequest = {
      level: form.level,
      department: form.department,
      name: `${form.level} ${form.department}`,
    };

    if (isEditMode) {
      updateClass(
        {
          id: classId,
          ...payload,
        },
        {
          onSuccess: resetForm,
        },
      );

      return;
    }

    createClass(payload, {
      onSuccess: resetForm,
    });
  };

  const handleEdit = (item: ClassList) => {
    const [level = "", department = ""] = item.name.split(" ");

    setForm({
      level,
      department,
    });

    setClassId(item.id);
  };

  const handleDelete = (id: string) => {
    deleteClass({ id });
  };

  return (
    <Modal isOpen={modalOpen} onClose={handleClose} title="Daftar Pelajaran">
      <form onSubmit={handleSubmit} className="space-y-4">
        <section className="flex gap-3">
          <Input
            type="text"
            placeholder="Masukkan level"
            value={form.level}
            onChange={(e) => handleChange("level", e.target.value)}
          />

          <Input
            type="text"
            placeholder="Masukkan jurusan"
            value={form.department}
            onChange={(e) => handleChange("department", e.target.value)}
          />
        </section>
        <section className="flex gap-2">
          <Button
            type="submit"
            disabled={isLoading || !form.level || !form.department}
          >
            {isEditMode
              ? isPendingUpdate
                ? "Mengupdate..."
                : "Update"
              : isPendingCreate
                ? "Menyimpan..."
                : "Simpan"}
          </Button>

          {isEditMode && (
            <Button type="button" variant="outline" onClick={resetForm}>
              Batal
            </Button>
          )}
        </section>
      </form>
      {isErrorDeleteClass && (
        <section className="w-full border border-red-500 py-1.5 text-red-500 mt-3 rounded-md bg-red-100 text-center">
          {errorDeleteClass?.data.message}
        </section>
      )}
      <ul className="mt-5 flex flex-col gap-3">
        {classList?.length ? (
          classList.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <p className="text-sm font-medium text-slate-700">{item.name}</p>

              <section className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </Button>

                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  disabled={isPendingDelete}
                  onClick={() => handleDelete(item.id)}
                >
                  Hapus
                </Button>
              </section>
            </li>
          ))
        ) : (
          <li className="py-5 text-center text-sm text-slate-500">
            Tidak ada data pelajaran
          </li>
        )}
      </ul>
    </Modal>
  );
}
