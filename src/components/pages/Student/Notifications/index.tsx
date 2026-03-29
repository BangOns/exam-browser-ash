import CardNotificationStudent from "@/components/feature/Student/Notifications/components/CardNotificationStudent";
import PageHeader from "@/components/shared/PageHeader";
import { typeNotificationConfig } from "@/config/style";
import { useNotificationStudentManagement } from "@/components/feature/Student/Notifications/hooks/useNotificationStudentManagement";
import { Button } from "@/components/ui/button";

export default function StudentNotificationsPage() {
  const { notificationsStudent, unreadCount, markAllAsRead } =
    useNotificationStudentManagement();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Notifications"
          description={`You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`}
        />
        {unreadCount > 0 && (
          <Button
            onClick={markAllAsRead}
            className="text-sm text-sky-500 font-medium hover:text-sky-600 transition-colors"
          >
            Mark all as read
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {notificationsStudent.map((notif) => {
          const config = typeNotificationConfig[notif.type];
          return (
            <CardNotificationStudent
              key={notif.id}
              notif={notif}
              config={config}
            />
          );
        })}
      </div>
    </div>
  );
}
