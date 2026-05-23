import { Icon } from "../Icon";
import type { Plan } from "../../lib/subscription-types";
import { PLANS, COMPARISON_FEATURES, planHasFeature } from "../../lib/subscription-data";
import type { ComparisonFeatureKey } from "../../lib/subscription-data";

type PlanComparisonTableProps = {
  currentPlanTier?: string;
};

export function PlanComparisonTable({ currentPlanTier }: PlanComparisonTableProps) {
  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/8">
            <th className="text-left py-md px-md font-label-md text-on-surface-variant w-[240px]">
              Funcionalidade
            </th>
            {PLANS.map((plan) => (
              <th
                key={plan.id}
                className={`text-center py-md px-md font-label-md min-w-[140px] ${
                  plan.tier === currentPlanTier
                    ? "text-primary"
                    : plan.highlighted
                      ? "text-primary"
                      : "text-on-surface"
                }`}
              >
                <div className="flex flex-col items-center gap-xs">
                  <Icon name={plan.icon} size={22} className={plan.highlighted ? "text-primary" : ""} />
                  <span>{plan.name}</span>
                  {plan.tier === currentPlanTier && (
                    <span className="text-[9px] uppercase tracking-wider bg-primary/15 text-primary px-2 py-0.5 rounded-full font-bold">
                      Atual
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARISON_FEATURES.map((feature, i) => (
            <tr
              key={feature.key}
              className={`border-b border-white/4 hover:bg-white/[0.02] transition-colors ${
                i % 2 === 0 ? "" : "bg-white/[0.01]"
              }`}
            >
              <td className="py-3 px-md text-on-surface-variant font-body-md">{feature.label}</td>
              {PLANS.map((plan) => {
                const value = planHasFeature(plan, feature.key as ComparisonFeatureKey);
                return (
                  <td key={plan.id} className="text-center py-3 px-md">
                    <CellValue value={value} highlighted={plan.highlighted} />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CellValue({ value, highlighted }: { value: boolean | string; highlighted?: boolean }) {
  if (typeof value === "string") {
    return (
      <span className={`font-label-sm font-semibold tabular-nums ${highlighted ? "text-primary" : "text-on-surface"}`}>
        {value}
      </span>
    );
  }
  if (value) {
    return <Icon name="check_circle" size={20} className="text-primary mx-auto" />;
  }
  return <Icon name="remove" size={18} className="text-on-surface-variant/30 mx-auto" />;
}
