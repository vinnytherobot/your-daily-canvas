import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { FinancialMetrics } from "../../lib/subscription-types";
import { formatCurrency } from "../../lib/subscription-data";

type RevenueChartProps = {
  metrics: FinancialMetrics;
};

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="surface-glass rounded-xl p-md border border-white/10 shadow-elegant text-sm">
      <p className="font-label-sm text-on-surface-variant mb-xs">{label}</p>
      <p className="font-label-md font-semibold text-primary tabular-nums">
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
}

export function RevenueChart({ metrics }: RevenueChartProps) {
  return (
    <div className="thesius-card p-lg">
      <h3 className="font-label-md font-semibold text-on-surface mb-lg">Receita mensal</h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={metrics.revenueByMonth} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C9A962" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#C9A962" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#9493A4", fontSize: 11 }}
              axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#9493A4", fontSize: 11 }}
              axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
              tickLine={false}
              tickFormatter={(v) => `R$${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#C9A962"
              strokeWidth={2.5}
              fill="url(#revenueGradient)"
              dot={{ fill: "#C9A962", stroke: "#06060A", strokeWidth: 2, r: 4 }}
              activeDot={{ fill: "#C9A962", stroke: "#06060A", strokeWidth: 2, r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
