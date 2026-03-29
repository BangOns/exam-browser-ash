import { NotificationStudent } from "@/types/notif";

export default function CardNotificationStudent({
  notif,
  config,
}: {
  notif: NotificationStudent;
  config: {
    icon: string;
    dotColor: string;
  };
}) {
  return (
    <div
      className={`glass-card p-5 animate-slide-up transition-all duration-200 ${
        !notif.read ? "border-l-4 border-l-sky-400" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-10 h-10 rounded-xl ${config.icon} flex items-center justify-center shrink-0`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {notif.type === "danger" ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            ) : notif.type === "success" ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            ) : notif.type === "warning" ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            )}
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3
              className={`text-sm font-semibold ${!notif.read ? "text-slate-800" : "text-slate-600"}`}
            >
              {notif.title}
            </h3>
            {!notif.read && (
              <span
                className={`w-2 h-2 rounded-full ${config.dotColor} animate-pulse-soft`}
              />
            )}
          </div>
          <p className="text-sm text-slate-500 mt-1 leading-relaxed">
            {notif.message}
          </p>
          <p className="text-xs text-slate-400 mt-2">{notif.time}</p>
        </div>
      </div>
    </div>
  );
}
