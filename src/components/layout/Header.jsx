import { Download, MoonStar, SunMedium } from 'lucide-react';

export default function Header({
  role,
  onRoleChange,
  darkMode,
  onDarkModeToggle,
  onExportJson,
  onExportCsv,
}) {
  return (
    <header className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/80 px-5 py-6 shadow-panel sm:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.22),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(249,115,22,0.18),_transparent_28%)]" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.32em] text-sky-300/80">Finance command center</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            See your cash flow, spot patterns, and act with confidence.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
            A responsive finance dashboard designed for fast decision-making, with role-aware controls and insight-first storytelling.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-full border border-white/10 bg-slate-950/60 p-1">
            {['viewer', 'admin'].map((nextRole) => (
              <button
                key={nextRole}
                type="button"
                onClick={() => onRoleChange(nextRole)}
                className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
                  role === nextRole
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {nextRole}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onDarkModeToggle}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-4 py-2 text-sm font-medium text-slate-200 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/5"
          >
            {darkMode ? <SunMedium size={16} /> : <MoonStar size={16} />}
            {darkMode ? 'Light accents' : 'Dark accents'}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onExportCsv}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:bg-white/5"
            >
              <Download size={16} />
              Export CSV
            </button>
            <button
              type="button"
              onClick={onExportJson}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-200"
            >
              <Download size={16} />
              Export JSON
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
