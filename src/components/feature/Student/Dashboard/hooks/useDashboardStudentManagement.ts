import { useGetExam } from "@/components/feature/Teacher/Exams/hooks/useGetExam";
import { ExamList } from "@/types/exam";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { usePostEnterExam } from "./mutations/usePostEnterExam";
import { ExamTokenRequest } from "@/types/exam-token";

export function useDashboardStudentManagement() {
  const { data: dataExam } = useGetExam({ status: "active,scheduled" });
  const { mutateAsync: enterExam, isPending: isPendingEnterExam } =
    usePostEnterExam();

  const [exam, setExam] = useState<ExamList[]>(dataExam?.data || []);
  const router = useRouter();
  const [verifyModal, setVerifyModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [tokenInput, setTokenInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleStartExam = useCallback((id: string) => {
    setSelectedExam(id);
    setVerifyModal(true);
    setErrorMsg("");
    setTokenInput("");
  }, []);

  const handleVerifyToken = useCallback(() => {
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
  }, [selectedExam, tokenInput, enterExam, router]);

  useEffect(() => {
    if (dataExam) {
      setExam(dataExam.data);
    }
  }, [dataExam]);
  return {
    exam,
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
  };
}
