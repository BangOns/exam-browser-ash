import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePostEnterExam } from "./mutations/usePostEnterExam";
import { ExamTokenRequest } from "@/types/exam-token";
import { useGetExamByIdStudent } from "@/hooks/exam/get-exam-student-id";

export function useDashboardStudentManagement() {
  const [page, setPage] = useState(1);
  const { data: dataExam } = useGetExamByIdStudent({
    status: "active,scheduled",
    page,
  });
  const { mutateAsync: enterExam, isPending: isPendingEnterExam } =
    usePostEnterExam();

  const router = useRouter();
  const [verifyModal, setVerifyModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [tokenInput, setTokenInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleStartExam = (id: string) => {
    setSelectedExam(id);
    setVerifyModal(true);
    setErrorMsg("");
    setTokenInput("");
  };
  const handleVerifyToken = () => {
    if (!selectedExam) return;
    const data: ExamTokenRequest = {
      id: selectedExam,
      token: tokenInput,
    };
    enterExam(data, {
      onError: (err) => setErrorMsg(err.data.message),
      onSuccess: () => {
        setVerifyModal(false);
        setErrorMsg("");
        setTokenInput("");
        router.push(`/student/exam/${selectedExam}`);
      },
    });
  };
  const handlePageChange = (page: number) => {
    setPage(page);
  }; //fungsi untuk mengubah halaman
  return {
    exam: dataExam?.data || [],
    pagination: dataExam?.meta.pagination,
    verifyModal,
    setVerifyModal,
    selectedExam,
    setSelectedExam,
    tokenInput,
    isPendingEnterExam,
    setTokenInput,
    errorMsg,
    setErrorMsg,
    handleStartExam,
    handleVerifyToken,
    handlePageChange,
  };
}
