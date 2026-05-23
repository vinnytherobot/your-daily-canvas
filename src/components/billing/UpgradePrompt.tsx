import { Link } from "@tanstack/react-router";
import { Icon } from "../Icon";
import type { Plan } from "../../lib/subscription-types";
import { formatCurrency } from "../../lib/subscription-data";

type UpgradePromptProps = {
  currentPlanName: string;
  targetPlan: Plan;
  className?: string;
};

export function UpgradePrompt({ currentPlanName, targetPlan, className = "" }: UpgradePromptProps) {
  // Collect features the target plan has that the current doesn't (simplified)
  const newFeatures = targetPlan.features
    .filter((f) => f.included && f.premium)
    .slice(0, 3);

  return (
    <div
      className={`rounded-2xl p-lg bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-primary/25 relative overflow-hidden floating-element ${className}`}
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/15 blur-[60px] rounded-full pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-sm mb-sm">
          <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
            <Icon name="rocket_launch" className="text-primary" size={20} />
          </div>
          <div>
            <p className="section-eyebrow text-[10px]">Upgrade disponível</p>
            <p className="font-label-md font-semibold text-on-surface">
              {currentPlanName} → {targetPlan.name}
            </p>
          </div>
        </div>

        <p className="text-sm text-on-surface-variant mb-md">
          Desbloqueie recursos premium por apenas{" "}
          <span className="text-primary font-semibold">
            {formatCurrency(targetPlan.price.monthly)}/mês
          </span>
        </p>

        {newFeatures.length > 0 && (
          <ul className="space-y-xs mb-lg">
            {newFeatures.map((f) => (
              <li key={f.text} className="flex items-center gap-xs text-sm text-on-surface">
                <Icon name="add_circle" size={16} className="text-primary shrink-0" />
                {f.text}
              </li>
            ))}
          </ul>
        )}

        <Link
          to="/checkout"
          search={{ plan: targetPlan.tier }}
          className="btn-primary block w-full text-center py-2.5 font-label-sm rounded-xl"
        >
          Fazer upgrade agora
        </Link>
      </div>
    </div>
  );
}
