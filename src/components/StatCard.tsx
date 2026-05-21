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

  return (
    <div className="thesius-card p-lg group">
      <div className="flex items-start justify-between gap-sm mb-md">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accentMap[accent]}`}>
          <Icon name={icon} size={22} />
        </div>
        {hint && <span className={`font-label-sm font-semibold ${hintMap[accent]}`}>{hint}</span>}
      </div>
      <p className="font-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">{label}</p>
      <p className="font-headline-lg text-headline-lg text-on-surface tabular-nums">{value}</p>
    </div>
  );
}
