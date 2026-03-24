import { Notif } from "@/types/notif";

export const notifs: Notif[] = [
  {
    id: 1,
    message: "Student Budi Santoso attempted tab switch during Quiz Physics",
    type: "violation",
    time: "2 min ago",
  },
  {
    id: 2,
    message: "Server load exceeding 80% — consider scaling",
    type: "system",
    time: "15 min ago",
  },
  {
    id: 3,
    message: "Student Reza Pratama left fullscreen mode",
    type: "violation",
    time: "28 min ago",
  },
];
