export default function SummaryCard({ icon: Icon, label, value, delta, tone }) {
  const toneMap = {
    blue: 'from-sky-500/25 to-brand-600/10 text-sky-300',
    green: 'from-emerald-500/25 to-emerald-700/10 text-emerald-300',
    orange: 'from-orange-500/25 to-orange-700/10 text-orange-300',
  };

  return (
    <article className="glass-panel group rounded-[28px] p-5 shadow-panel transition duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-400">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-white">{value}</p>
          <p className="mt-3 text-sm text-slate-400">{delta}</p>
        </div>
        <div className={`rounded-2xl bg-gradient-to-br p-3 ${toneMap[tone]}`}>
          <Icon size={22} />
        </div>
      </div>
    </article>
  );
}
