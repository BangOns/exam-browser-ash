export default function StudentNotificationsPage() {
  type Notification = {
    id: number;
    title: string;
    message: string;
    type: "info" | "warning" | "success" | "danger";
    time: string;
    read: boolean;
  };

  const notifications: Notification[] = [
    { id: 1, title: "Exam Rule Violation", message: "You were detected switching tabs during Quiz Physics on Mar 22. This has been reported to your teacher.", type: "danger", time: "2 hours ago", read: false },
    { id: 2, title: "Quiz Physics Available", message: "Quiz Physics is now open for you to take. Duration: 60 minutes, 20 questions.", type: "info", time: "3 hours ago", read: false },
    { id: 3, title: "UTS Mathematics Results", message: "Your results for UTS Mathematics are now available. Score: 82/100 (Grade: A-).", type: "success", time: "2 days ago", read: true },
    { id: 4, title: "Upcoming Exam Reminder", message: "UAS English is scheduled for Mar 26, 2026 at 10:00. Please prepare accordingly.", type: "info", time: "3 days ago", read: true },
    { id: 5, title: "System Maintenance", message: "The exam platform will be under maintenance on Mar 24 from 02:00 to 04:00. Please plan your activities accordingly.", type: "warning", time: "4 days ago", read: true },
    { id: 6, title: "Profile Updated", message: "Your profile information has been successfully updated.", type: "success", time: "1 week ago", read: true },
  ];

  const typeConfig = {
    info: { icon: "bg-blue-50 text-blue-500", dotColor: "bg-blue-500" },
    warning: { icon: "bg-amber-50 text-amber-500", dotColor: "bg-amber-500" },
    success: { icon: "bg-emerald-50 text-emerald-500", dotColor: "bg-emerald-500" },
    danger: { icon: "bg-red-50 text-red-500", dotColor: "bg-red-500" },
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Notifications</h1>
          <p className="text-sm text-slate-500 mt-1">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
              : "All caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button className="text-sm text-sky-500 font-medium hover:text-sky-600 transition-colors">
            Mark all as read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map((notif) => {
          const config = typeConfig[notif.type];
          return (
            <div
              key={notif.id}
              className={`glass-card p-5 animate-slide-up transition-all duration-200 ${
                !notif.read ? "border-l-4 border-l-sky-400" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl ${config.icon} flex items-center justify-center shrink-0`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    {notif.type === "danger" ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    ) : notif.type === "success" ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    ) : notif.type === "warning" ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`text-sm font-semibold ${!notif.read ? "text-slate-800" : "text-slate-600"}`}>
                      {notif.title}
                    </h3>
                    {!notif.read && (
                      <span className={`w-2 h-2 rounded-full ${config.dotColor} animate-pulse-soft`} />
                    )}
                  </div>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">{notif.message}</p>
                  <p className="text-xs text-slate-400 mt-2">{notif.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
