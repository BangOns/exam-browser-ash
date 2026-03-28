import { initialQuestions } from "@/data/dummy/questions";
import { Question } from "@/types/question";
import { ResultRow } from "@/types/result";
import { useMemo, useState } from "react";
import { resultsData } from "@/data/dummy/result";
import { questionColumns } from "../components/QuestionColumns";
import { resultColumns } from "../components/ResultColumns";

export function useDashboardManagement() {
  const [questionList, questionListSet] =
    useState<Question[]>(initialQuestions);
  const [resultList, resultListSet] = useState<ResultRow[]>(resultsData);

  const columnsQuestion = useMemo(() => {
    return questionColumns();
  }, []);
  const columnsResult = useMemo(() => {
    return resultColumns();
  }, []);

  return {
    questionList,
    questionListSet,
    resultList,
    resultListSet,
    columnsQuestion,
    columnsResult,
  };
}
