import { notifications } from "@/data/dummy/notif";
import { NotificationStudent } from "@/types/notif";
import { useCallback, useEffect, useState } from "react";

export function useNotificationStudentManagement() {
  const [notificationsStudent, setNotificationsStudent] =
    useState<NotificationStudent[]>(notifications);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const markAllAsRead = useCallback(() => {
    setNotificationsStudent(
      notificationsStudent.map((n) => ({ ...n, read: true })),
    );
    setUnreadCount(0);
  }, [notificationsStudent]);

  useEffect(() => {
    setUnreadCount(notificationsStudent.filter((n) => !n.read).length);
  }, [notificationsStudent]);
  return {
    notificationsStudent,
    unreadCount,
    markAllAsRead,
  };
}
