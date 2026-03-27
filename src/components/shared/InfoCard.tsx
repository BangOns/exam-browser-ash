export default function InfoCard({
  emoji,
  label,
  value,
}: {
  emoji: string;
  label: string;
  value: string | number;
}) {
  return (
    <section className="glass-card p-4 flex items-center gap-3">
      <header className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
        <span className="text-lg">{emoji}</span>
      </header>
      <article>
        <p className="text-xs text-slate-400 font-medium">{label}</p>
        <p className="text-xl font-bold text-slate-800">{value}</p>
      </article>
    </section>
  );
}
