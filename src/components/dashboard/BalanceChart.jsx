import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import SectionCard from '../ui/SectionCard';
import { formatCurrency } from '../../lib/finance';

export default function BalanceChart({ data }) {
  return (
    <SectionCard
      title="Balance timeline"
      subtitle="Watch how each transaction shifts your running balance over time."
      className="h-full"
    >
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(148, 163, 184, 0.14)" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
            />
            <Tooltip
              contentStyle={{
                background: '#020617',
                border: '1px solid rgba(148,163,184,0.18)',
                borderRadius: '18px',
              }}
              formatter={(value) => formatCurrency(value)}
            />
            <Area type="monotone" dataKey="balance" stroke="#38bdf8" strokeWidth={3} fill="url(#balanceFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}
