import { useParams } from "next/navigation";
import { useGetExamAttemptsById } from "./useGetExamAttemptsById";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ExamAttemptResource } from "@/types/result";
import { useGetResultExamById } from "./useGetResultExamById";
import { ResultColumnsDetail } from "../components/ResultColumnsDetail";
import { AnswerRequest } from "@/types/answer";
import { usePostEditExam } from "./mutations/useEditAnswerExam";
import exportExamResultsToExcel from "../utils/exportToExcel";

export function useResultByIdManagement() {
  const params = useParams<{ id?: string }>();

  const id = params?.id ?? "";
  const { data: detailResult } = useGetExamAttemptsById(id || "");

  const [idExam, setIdExam] = useState<string>("");
  const { data: resultExamById } = useGetResultExamById({ id: idExam });
  const [result, setResult] = useState<ExamAttemptResource[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [essayScores, setEssayScores] = useState<Record<string, number>>({});
  const { mutateAsync: editExam, isPending: isPendingSubmit } =
    usePostEditExam();
  const openDetail = (id: string) => {
    setIsOpenModal(true);
    setIdExam(id);
  };
  const closeDetail = () => {
    setIsOpenModal(false);
    setEssayScores({});
    setIdExam("");
  };
  const exportExcel = useCallback(() => {
    if (!result || result.length === 0) return;
    exportExamResultsToExcel(result);
  }, [result]);
  const addEssayScore = useCallback((questionId: string, points: number) => {
    setEssayScores((prev) => ({ ...prev, [questionId]: points }));
  }, []);
  const saveExamEssayScores = useCallback(() => {
    const data: AnswerRequest = {
      answers: Object.entries(essayScores).map(([question_id, answer]) => ({
        question_id,
        answer: String(answer),
      })),
    };
    const idStudent = resultExamById?.data.find((item) => item.student.id)
      ?.student.id;
    editExam(
      {
        id: id,
        studentId: idStudent ?? "",
        data,
      },
      {
        onSuccess: () => {
          closeDetail();
        },
      },
    );
  }, [essayScores, editExam, id, resultExamById]);

  const columns = useMemo(() => {
    return ResultColumnsDetail({
      openDetail,
    });
  }, []);
  useEffect(() => {
    if (detailResult) {
      setResult(detailResult.data);
    }
  }, [detailResult]);
  return {
    result,
    columns,
    resultExamById,
    isOpenModal,
    essayScores,
    addEssayScore,
    closeDetail,
    saveExamEssayScores,
    isPendingSubmit,
    exportExcel,
  };
}
