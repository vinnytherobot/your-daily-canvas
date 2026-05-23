import type { BillingCycle } from "../../lib/subscription-types";

type BillingCycleToggleProps = {
  cycle: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
  savingsPercent?: number;
};

export function BillingCycleToggle({ cycle, onChange, savingsPercent = 17 }: BillingCycleToggleProps) {
  return (
    <div className="inline-flex items-center gap-md bg-surface-container-high rounded-2xl p-1.5 border border-white/6">
      <button
        type="button"
        onClick={() => onChange("monthly")}
        className={`px-lg py-2.5 rounded-xl font-label-md transition-all duration-300 ${
          cycle === "monthly"
            ? "bg-primary text-on-primary font-semibold shadow-gold"
            : "text-on-surface-variant hover:text-on-surface hover:bg-white/5"
        }`}
      >
        Mensal
      </button>
      <button
        type="button"
        onClick={() => onChange("annual")}
        className={`px-lg py-2.5 rounded-xl font-label-md transition-all duration-300 flex items-center gap-sm ${
          cycle === "annual"
            ? "bg-primary text-on-primary font-semibold shadow-gold"
            : "text-on-surface-variant hover:text-on-surface hover:bg-white/5"
        }`}
      >
        Anual
        {savingsPercent > 0 && (
          <span
            className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full transition-colors ${
              cycle === "annual"
                ? "bg-on-primary/20 text-on-primary"
                : "bg-emerald-400/15 text-emerald-400"
            }`}
          >
            -{savingsPercent}%
          </span>
        )}
      </button>
    </div>
  );
}
