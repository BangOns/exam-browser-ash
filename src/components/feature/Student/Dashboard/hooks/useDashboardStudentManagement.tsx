import { useGetExam } from "@/components/feature/Teacher/Exams/hooks/useGetExam";
import { ExamList } from "@/types/exam";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function useDashboardStudentManagement() {
  const { data: dataExam } = useGetExam({ status: "active" });

  const [exam, setExam] = useState<ExamList[]>(dataExam?.data || []);
  const router = useRouter();
  const [verifyModal, setVerifyModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [tokenInput, setTokenInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleStartExam = useCallback((id: string) => {
    // Check if suspended

    setSelectedExam(id);
    setVerifyModal(true);
    setErrorMsg("");
    setTokenInput("");
  }, []);

  const handleVerifyToken = useCallback(() => {
    if (!selectedExam) return;
    const correctToken = localStorage.getItem(`exam_token_${selectedExam}`);
    if (correctToken && correctToken === tokenInput) {
      // verification success
      localStorage.setItem(
        "exam_session",
        Math.random().toString(36).substring(2, 10),
      );
      router.push("/student/exam");
    } else {
      setErrorMsg(
        "Invalid token. Please ask your admin for the correct access token.",
      );
    }
  }, [selectedExam, tokenInput, router]);

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
    setTokenInput,
    errorMsg,
    setErrorMsg,
    handleStartExam,
    handleVerifyToken,
  };
}
