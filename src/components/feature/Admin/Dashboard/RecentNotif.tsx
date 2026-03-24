import CardNotif from "@/components/shared/CardNotif";
import { notifs } from "@/data/dummy/notif";

export default function RecentNotif() {
  return (
    <section className="glass-card p-5 animate-slide-up">
      <header className="flex items-center gap-2 mb-4">
        <span className="notification-dot relative w-2.5 h-2.5 inline-block" />
        <h3 className="text-base font-semibold text-slate-800">
          Recent Notifications
        </h3>
      </header>
      <section className="space-y-3">
        {notifs.map((alert) => (
          <CardNotif alert={alert} key={alert.id} />
        ))}
      </section>
    </section>
  );
}
