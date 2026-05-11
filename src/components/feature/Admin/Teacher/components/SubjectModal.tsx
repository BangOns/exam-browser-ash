import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/Modal";

import { SubjectList, SubjectRequest } from "@/types/subject";
import { usePostSubject } from "@/hooks/subject/post-subject";
import { useUpdateSubject } from "@/hooks/subject/update-subject";
import { useDeleteSubject } from "@/hooks/subject/delete-subject";

interface Props {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  subjectList?: SubjectList[];
}

export default function SubjectModal({
  modalOpen,
  setModalOpen,
  subjectList,
}: Props) {
  const [subject, setSubject] = useState("");
  const [subjectId, setSubjectId] = useState("");

  const { mutate: createSubject, isPending: isPendingCreate } =
    usePostSubject();

  const { mutate: updateSubject, isPending: isPendingUpdate } =
    useUpdateSubject();

  const { mutate: deleteSubject, isPending: isPendingDelete } =
    useDeleteSubject();

  const isEditMode = !!subjectId;
  const isLoading = isPendingCreate || isPendingUpdate || isPendingDelete;

  const resetForm = () => {
    setSubject("");
    setSubjectId("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: SubjectRequest = {
      name: subject,
    };

    if (isEditMode) {
      updateSubject(
        {
          id: subjectId,
          name: subject,
        },
        {
          onSuccess: () => {
            resetForm();
          },
        },
      );

      return;
    }

    createSubject(payload, {
      onSuccess: () => {
        resetForm();
      },
    });
  };

  const handleEdit = (item: SubjectList) => {
    setSubject(item.name);
    setSubjectId(item.id);
  };

  const handleDelete = (id: string) => {
    deleteSubject({ id });
  };

  return (
    <Modal
      isOpen={modalOpen}
      onClose={() => {
        setModalOpen(false);
        resetForm();
      }}
      title="Daftar Pelajaran"
    >
      <form onSubmit={handleSubmit} className="flex w-full gap-3">
        <Input
          type="text"
          placeholder="Masukkan nama pelajaran"
          className="w-full"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <Button type="submit" disabled={isLoading || !subject}>
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
      </form>

      <ul className="flex flex-col gap-3 pt-5">
        {subjectList?.length ? (
          subjectList.map((item) => (
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
