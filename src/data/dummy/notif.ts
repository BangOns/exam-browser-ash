import { Notif, NotificationStudent } from "@/types/notif";

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
export const notifications: NotificationStudent[] = [
  {
    id: 1,
    title: "Exam Rule Violation",
    message:
      "You were detected switching tabs during Quiz Physics on Mar 22. This has been reported to your teacher.",
    type: "danger",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "Quiz Physics Available",
    message:
      "Quiz Physics is now open for you to take. Duration: 60 minutes, 20 questions.",
    type: "info",
    time: "3 hours ago",
    read: false,
  },
  {
    id: 3,
    title: "UTS Mathematics Results",
    message:
      "Your results for UTS Mathematics are now available. Score: 82/100 (Grade: A-).",
    type: "success",
    time: "2 days ago",
    read: true,
  },
  {
    id: 4,
    title: "Upcoming Exam Reminder",
    message:
      "UAS English is scheduled for Mar 26, 2026 at 10:00. Please prepare accordingly.",
    type: "info",
    time: "3 days ago",
    read: true,
  },
  {
    id: 5,
    title: "System Maintenance",
    message:
      "The exam platform will be under maintenance on Mar 24 from 02:00 to 04:00. Please plan your activities accordingly.",
    type: "warning",
    time: "4 days ago",
    read: true,
  },
  {
    id: 6,
    title: "Profile Updated",
    message: "Your profile information has been successfully updated.",
    type: "success",
    time: "1 week ago",
    read: true,
  },
];
