import { Schedule, ScheduleRow } from "@/types/schedule";

export const scheduleData: ScheduleRow[] = [
  {
    exam: "UTS Mathematics",
    subject: "Mathematics",
    date: "Mar 25, 2026",
    time: "08:00 - 10:00",
    status: "Scheduled",
  },
  {
    exam: "UAS English",
    subject: "English",
    date: "Mar 26, 2026",
    time: "10:00 - 12:00",
    status: "Scheduled",
  },
  {
    exam: "Quiz Physics",
    subject: "Physics",
    date: "Mar 22, 2026",
    time: "13:00 - 14:00",
    status: "In Progress",
  },
  {
    exam: "UTS Biology",
    subject: "Biology",
    date: "Mar 27, 2026",
    time: "08:00 - 10:00",
    status: "Scheduled",
  },
];

export const initialSchedules: Schedule[] = [
  {
    id: 1,
    name: "UTS Mathematics",
    subject: "Mathematics",
    date: "2026-03-24",
    startTime: "08:00",
    endTime: "10:00",
    status: "Scheduled",
  },
  {
    id: 2,
    name: "Quiz Physics",
    subject: "Physics",
    date: "2026-03-25",
    startTime: "09:00",
    endTime: "10:00",
    status: "Ongoing",
  },
  {
    id: 3,
    name: "UAS English",
    subject: "English",
    date: "2026-03-26",
    startTime: "10:00",
    endTime: "11:30",
    status: "Scheduled",
  },
];
