import { useEffect, useState } from 'react';

const emptyForm = {
  description: '',
  amount: '',
  category: 'Food',
  type: 'expense',
  date: new Date().toISOString().slice(0, 10),
};

export default function TransactionForm({ categories, editingTransaction, onCancel, onSubmit }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        description: editingTransaction.description,
        amount: String(editingTransaction.amount),
        category: editingTransaction.category,
        type: editingTransaction.type,
        date: editingTransaction.date,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingTransaction]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      ...form,
      amount: Number(form.amount),
    });

    if (!editingTransaction) {
      setForm(emptyForm);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      <label className="space-y-2 xl:col-span-2">
        <span className="text-sm font-medium text-slate-300">Description</span>
        <input
          required
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="e.g. Team lunch"
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-500"
        />
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-slate-300">Amount</span>
        <input
          required
          min="0"
          step="0.01"
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-500"
        />
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-slate-300">Category</span>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-500"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-slate-300">Type</span>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-500"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-slate-300">Date</span>
        <input
          required
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-500"
        />
      </label>

      <div className="flex items-end gap-3 xl:col-span-5">
        <button
          type="submit"
          className="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-600"
        >
          {editingTransaction ? 'Save changes' : 'Add transaction'}
        </button>
        {editingTransaction ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5"
          >
            Cancel edit
          </button>
        ) : null}
      </div>
    </form>
  );
}
