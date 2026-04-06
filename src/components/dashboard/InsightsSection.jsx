import { ArrowDown, ArrowUp, Landmark, Lightbulb, PiggyBank, Target } from 'lucide-react';
import SectionCard from '../ui/SectionCard';
import { formatCurrency, formatDate } from '../../lib/finance';

function InsightTile({ icon: Icon, label, value, detail, accent }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-950/40 p-4">
      <div className="flex items-center gap-3">
        <div className={`rounded-2xl p-3 ${accent}`}>
          <Icon size={18} />
        </div>
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-1 text-lg font-semibold text-white">{value}</p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-400">{detail}</p>
    </div>
  );
}

export default function InsightsSection({ insights }) {
  const changeUp = insights.monthlyDelta > 0;

  return (
    <SectionCard
      title="Actionable insights"
      subtitle="Narratives and signals generated directly from the current transaction set."
    >
      <div className="grid gap-4 lg:grid-cols-4">
        <InsightTile
          icon={Target}
          label="Highest spending category"
          value={insights.topCategory ? insights.topCategory.name : 'No data'}
          detail={
            insights.topCategory
              ? `${formatCurrency(insights.topCategory.value)} spent here so far.`
              : 'Add expense data to surface category trends.'
          }
          accent="bg-orange-500/20 text-orange-300"
        />
        <InsightTile
          icon={changeUp ? ArrowUp : ArrowDown}
          label="Monthly comparison"
          value={`${changeUp ? '+' : ''}${formatCurrency(insights.monthlyDelta)}`}
          detail="Difference in expenses between the latest two tracked months."
          accent={changeUp ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'}
        />
        <InsightTile
          icon={PiggyBank}
          label="Savings rate"
          value={`${insights.savingsRate}%`}
          detail={insights.note}
          accent="bg-sky-500/20 text-sky-300"
        />
        <InsightTile
          icon={Landmark}
          label="Largest expense"
          value={insights.largestExpense ? formatCurrency(insights.largestExpense.amount) : 'No data'}
          detail={
            insights.largestExpense
              ? `${insights.largestExpense.description} on ${formatDate(insights.largestExpense.date)}`
              : 'Add expense records to highlight major outflows.'
          }
          accent="bg-violet-500/20 text-violet-300"
        />
      </div>

      <div className="mt-5 rounded-[24px] border border-brand-500/20 bg-brand-500/10 p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-brand-500/15 p-3 text-sky-300">
            <Lightbulb size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Observation</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {insights.note} Consider setting category-specific budgets or alerts if you want tighter control.
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
