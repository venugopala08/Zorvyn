import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import SectionCard from '../ui/SectionCard';
import { categoryPalette } from '../../data/seed';
import { formatCurrency } from '../../lib/finance';

export default function CategoryChart({ data }) {
  const totalExpenses = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <SectionCard
      title="Expense breakdown"
      subtitle="Understand which categories take the biggest share of your budget."
      className="h-full"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,260px)] lg:items-center">
        <div className="relative mx-auto h-[320px] w-full max-w-[340px]">
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <div className="rounded-full border border-white/10 bg-slate-950/85 px-6 py-5 text-center shadow-panel backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Total spend</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white">{formatCurrency(totalExpenses)}</p>
              <p className="mt-1 text-sm text-slate-400">{data.length} categories tracked</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={84}
                outerRadius={138}
                paddingAngle={2}
                stroke="#0f172a"
                strokeWidth={2}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={categoryPalette[entry.name] ?? '#38bdf8'} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#020617',
                  border: '1px solid rgba(148,163,184,0.18)',
                  borderRadius: '18px',
                }}
                formatter={(value) => formatCurrency(value)}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="min-w-0 space-y-3">
          {data.map((entry) => (
            <div
              key={entry.name}
              className="flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3 transition hover:border-white/15 hover:bg-white/[0.07]"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: categoryPalette[entry.name] ?? '#38bdf8' }}
                />
                <div className="min-w-0">
                  <span className="block truncate text-sm font-medium text-slate-200">{entry.name}</span>
                  <p className="text-xs text-slate-400">
                    {Math.round((entry.value / totalExpenses) * 100)}% of expenses
                  </p>
                </div>
              </div>
              <span className="shrink-0 text-sm font-semibold text-white">{formatCurrency(entry.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
