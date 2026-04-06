import { ArrowDownCircle, ArrowUpCircle, WalletCards } from 'lucide-react';
import { formatCurrency } from '../../lib/finance';
import SummaryCard from './SummaryCard';

export default function OverviewSection({ summary }) {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <SummaryCard
        icon={WalletCards}
        label="Total Balance"
        value={formatCurrency(summary.balance)}
        delta="Net available after all recorded transactions."
        tone="blue"
      />
      <SummaryCard
        icon={ArrowUpCircle}
        label="Total Income"
        value={formatCurrency(summary.income)}
        delta="Reliable inflows across salary, business, and reimbursements."
        tone="green"
      />
      <SummaryCard
        icon={ArrowDownCircle}
        label="Total Expenses"
        value={formatCurrency(summary.expenses)}
        delta="Track fixed costs and discretionary spending in one place."
        tone="orange"
      />
    </section>
  );
}
