import { studentsSessions } from "@/data/dummy/student";
import { StudentSession } from "@/types/student";
import { useMemo, useState } from "react";

export function useMonitoringManagement() {
  const [studentListSession, studentListSessionSet] =
    useState<StudentSession[]>(studentsSessions);
  const activeCount = useMemo(
    () => studentListSession.filter((s) => s.status === "active").length,
    [studentListSession],
  );
  const flaggedCount = useMemo(
    () => studentListSession.filter((s) => s.status === "flagged").length,
    [studentListSession],
  );

  return {
    studentListSession,
    studentListSessionSet,
    activeCount,
    flaggedCount,
  };
}
