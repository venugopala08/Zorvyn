import { SearchX } from 'lucide-react';

export default function EmptyState({ title, description }) {
  return (
    <div className="flex min-h-60 flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-slate-900/40 px-6 py-10 text-center">
      <div className="rounded-2xl bg-white/5 p-4 text-slate-300">
        <SearchX size={28} />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}
