import { ArrowDownUp, Pencil, PlusCircle, RotateCcw, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import SectionCard from '../ui/SectionCard';
import EmptyState from '../ui/EmptyState';
import { filterTransactions, formatCurrency, formatDate } from '../../lib/finance';
import TransactionForm from './TransactionForm';

function sortTransactions(transactions, sortBy) {
  const sorted = [...transactions];

  if (sortBy === 'date-asc') {
    sorted.sort((left, right) => new Date(left.date) - new Date(right.date));
  } else if (sortBy === 'amount-desc') {
    sorted.sort((left, right) => right.amount - left.amount);
  } else if (sortBy === 'amount-asc') {
    sorted.sort((left, right) => left.amount - right.amount);
  } else {
    sorted.sort((left, right) => new Date(right.date) - new Date(left.date));
  }

  return sorted;
}

export default function TransactionsSection({
  role,
  categories,
  filters,
  transactions,
  isLoading,
  onFilterChange,
  onResetFilters,
  onAddTransaction,
  onEditTransaction,
  onDeleteTransaction,
  onRestoreSeedData,
}) {
  const [editingTransaction, setEditingTransaction] = useState(null);

  const filteredTransactions = useMemo(() => {
    const nextItems = filterTransactions(transactions, filters);
    return sortTransactions(nextItems, filters.sortBy);
  }, [transactions, filters]);

  const hasActiveFilters = Boolean(
    filters.search || filters.type !== 'all' || filters.category !== 'all' || filters.startDate || filters.endDate,
  );

  function handleSubmit(values) {
    if (editingTransaction) {
      onEditTransaction(editingTransaction.id, values);
      setEditingTransaction(null);
      return;
    }

    onAddTransaction({
      ...values,
      id: `txn-${crypto.randomUUID()}`,
    });
  }

  function handleDelete(transactionId) {
    const confirmed = window.confirm('Delete this transaction? This only changes the local demo data.');
    if (confirmed) {
      onDeleteTransaction(transactionId);

      if (editingTransaction?.id === transactionId) {
        setEditingTransaction(null);
      }
    }
  }

  return (
    <SectionCard
      title="Transactions"
      subtitle="Search, filter, and manage money movements across your dashboard."
      action={
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium uppercase tracking-[0.22em] text-slate-300">
          <ArrowDownUp size={14} />
          {filteredTransactions.length} visible
        </div>
      }
    >
      <div className="space-y-5">
        {role === 'admin' ? (
          <div className="rounded-[24px] border border-white/10 bg-slate-950/40 p-4">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <PlusCircle size={16} className="text-sky-300" />
                {editingTransaction ? 'Edit transaction' : 'Add a new transaction'}
              </div>
              <button
                type="button"
                onClick={onRestoreSeedData}
                className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 transition hover:bg-white/5"
              >
                <RotateCcw size={14} />
                Restore demo data
              </button>
            </div>
            <TransactionForm
              categories={categories}
              editingTransaction={editingTransaction}
              onCancel={() => setEditingTransaction(null)}
              onSubmit={handleSubmit}
            />
          </div>
        ) : (
          <div className="rounded-[24px] border border-dashed border-white/10 bg-slate-950/30 px-4 py-4 text-sm text-slate-400">
            Viewer mode is read-only. Switch to Admin if you want to add, edit, delete, or restore demo transactions.
          </div>
        )}

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
          <input
            value={filters.search}
            onChange={(event) => onFilterChange({ search: event.target.value })}
            placeholder="Search transactions"
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-500 xl:col-span-2"
          />
          <select
            value={filters.type}
            onChange={(event) => onFilterChange({ type: event.target.value })}
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-500"
          >
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            value={filters.category}
            onChange={(event) => onFilterChange({ category: event.target.value })}
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-500"
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={filters.startDate}
            onChange={(event) => onFilterChange({ startDate: event.target.value })}
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-500"
          />
          <input
            type="date"
            value={filters.endDate}
            onChange={(event) => onFilterChange({ endDate: event.target.value })}
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-500"
          />
          <select
            value={filters.sortBy}
            onChange={(event) => onFilterChange({ sortBy: event.target.value })}
            className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-500"
          >
            <option value="date-desc">Newest first</option>
            <option value="date-asc">Oldest first</option>
            <option value="amount-desc">Amount high-low</option>
            <option value="amount-asc">Amount low-high</option>
          </select>
        </div>

        {hasActiveFilters ? (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5"
            >
              <RotateCcw size={14} />
              Reset filters
            </button>
          </div>
        ) : null}

        {isLoading ? (
          <div className="grid gap-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-16 animate-pulse rounded-[20px] border border-white/10 bg-white/5"
              />
            ))}
          </div>
        ) : filteredTransactions.length === 0 && transactions.length === 0 ? (
          <EmptyState
            title="Your dashboard is ready for data"
            description="There are no transactions yet. Restore the demo dataset or add a new transaction in Admin mode to populate charts and insights."
          />
        ) : filteredTransactions.length === 0 ? (
          <EmptyState
            title="No transactions match your filters"
            description="Try a different search term, adjust the date range, or reset filters to see more activity."
          />
        ) : (
          <div className="overflow-hidden rounded-[24px] border border-white/10">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-white/5">
                  <tr>
                    {['Date', 'Description', 'Category', 'Type', 'Amount', 'Actions'].map((column) => (
                      <th
                        key={column}
                        className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-slate-950/30">
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="transition hover:bg-white/[0.03]">
                      <td className="px-4 py-4 text-sm text-slate-300">{formatDate(transaction.date)}</td>
                      <td className="px-4 py-4 text-sm font-medium text-white">{transaction.description}</td>
                      <td className="px-4 py-4 text-sm text-slate-300">{transaction.category}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                            transaction.type === 'income'
                              ? 'bg-emerald-500/15 text-emerald-300'
                              : 'bg-orange-500/15 text-orange-300'
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm font-semibold text-white">
                        {transaction.type === 'expense' ? '-' : '+'}
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td className="px-4 py-4">
                        {role === 'admin' ? (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setEditingTransaction(transaction)}
                              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-white/5"
                            >
                              <Pencil size={14} />
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(transaction.id)}
                              className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-xs font-medium text-rose-200 transition hover:bg-rose-500/20"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-500">Read only</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </SectionCard>
  );
}
