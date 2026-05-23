import { Icon } from "./Icon";

type StatCardProps = {
  label: string;
  value: string;
  hint?: string;
  icon: string;
  accent?: "gold" | "muted" | "success";
};

export function StatCard({ label, value, hint, icon, accent = "gold" }: StatCardProps) {
  const accentMap = {
    gold: "text-primary bg-primary/10",
    muted: "text-on-surface-variant bg-surface-variant/80",
    success: "text-emerald-400 bg-emerald-400/10",
  };
  const hintMap = {
    gold: "text-primary",
    muted: "text-on-surface-variant",
    success: "text-emerald-400",
  };
  const ringMap = {
    gold: "shadow-[0_0_24px_rgba(201,169,98,0.28)]",
    muted: "shadow-[0_0_24px_rgba(148,147,164,0.22)]",
    success: "shadow-[0_0_24px_rgba(74,222,128,0.26)]",
  };

  return (
    <div className="thesius-card p-lg group card-hover-lift">
      <div className="flex items-start justify-between gap-sm mb-md">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accentMap[accent]} ${ringMap[accent]}`}>
          <Icon name={icon} size={22} />
        </div>
        {hint && <span className={`font-label-sm font-semibold ${hintMap[accent]}`}>{hint}</span>}
      </div>
      <p className="font-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">{label}</p>
      <p className="font-body-md text-3xl font-bold text-on-surface tabular-nums stat-value">{value}</p>
    </div>
  );
}
