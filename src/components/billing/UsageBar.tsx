type UsageBarProps = {
  label: string;
  used: number;
  limit: number | "unlimited";
  unit?: string;
  accent?: "primary" | "emerald" | "amber" | "red";
};

export function UsageBar({ label, used, limit, unit = "", accent = "primary" }: UsageBarProps) {
  const isUnlimited = limit === "unlimited";
  const percentage = isUnlimited ? 15 : Math.min(100, (used / (limit as number)) * 100);

  const accentColors: Record<string, { bar: string; text: string }> = {
    primary: { bar: "from-primary/70 to-primary", text: "text-primary" },
    emerald: { bar: "from-emerald-500/70 to-emerald-400", text: "text-emerald-400" },
    amber: { bar: "from-amber-500/70 to-amber-400", text: "text-amber-400" },
    red: { bar: "from-red-500/70 to-red-400", text: "text-red-400" },
  };

  const color = accentColors[accent] ?? accentColors.primary;
  const displayLimit = isUnlimited ? "∞" : `${limit.toLocaleString("pt-BR")}${unit}`;
  const displayUsed = `${typeof used === "number" ? used.toLocaleString("pt-BR") : used}${unit}`;

  // Color warning when nearing limit
  const effectiveAccent =
    !isUnlimited && percentage >= 90 ? "red" : !isUnlimited && percentage >= 75 ? "amber" : accent;
  const effectiveColor = accentColors[effectiveAccent] ?? accentColors.primary;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="font-label-md text-sm text-on-surface">{label}</span>
        <span className={`font-label-sm font-semibold tabular-nums ${effectiveColor.text}`}>
          {displayUsed}
          <span className="text-on-surface-variant font-normal"> / {displayLimit}</span>
        </span>
      </div>
      <div className="h-2 bg-surface-variant rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${effectiveColor.bar} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
