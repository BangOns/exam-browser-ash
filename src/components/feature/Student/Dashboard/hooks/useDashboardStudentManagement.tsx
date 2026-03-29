import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export function useDashboardStudentManagement() {
  const router = useRouter();
  const [verifyModal, setVerifyModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState<number | null>(null);
  const [tokenInput, setTokenInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleStartExam = useCallback((id: number) => {
    // Check if suspended
    const ustr = localStorage.getItem("user");
    if (ustr) {
      try {
        const u = JSON.parse(ustr);
        if (localStorage.getItem(`suspended_user_${u.id}`) === "true") {
          alert(
            "Your access is suspended due to a rule violation. Please contact Admin.",
          );
          return;
        }
      } catch {
        // ignore
      }
    }
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

  return {
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
