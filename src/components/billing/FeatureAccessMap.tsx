import { Icon } from "../Icon";
import type { PremiumAccess, Plan } from "../../lib/subscription-types";
import { COMPARISON_FEATURES, planHasFeature } from "../../lib/subscription-data";
import type { ComparisonFeatureKey } from "../../lib/subscription-data";

type FeatureAccessMapProps = {
  plan: Plan;
  access: PremiumAccess;
};

export function FeatureAccessMap({ plan, access }: FeatureAccessMapProps) {
  // Group features into accessible and locked
  const featureStatus = COMPARISON_FEATURES.map((feature) => {
    const value = planHasFeature(plan, feature.key as ComparisonFeatureKey);
    const isAccessible = value === true || typeof value === "string";
    return { ...feature, value, isAccessible };
  });

  const accessible = featureStatus.filter((f) => f.isAccessible);
  const locked = featureStatus.filter((f) => !f.isAccessible);

  return (
    <div className="space-y-lg">
      {/* Accessible features */}
      <div>
        <h3 className="font-label-md font-semibold text-on-surface mb-md flex items-center gap-sm">
          <Icon name="lock_open" size={20} className="text-emerald-400" />
          Recursos desbloqueados
          <span className="text-xs font-normal text-on-surface-variant">({accessible.length})</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-sm">
          {accessible.map((feature) => (
            <div
              key={feature.key}
              className="thesius-card p-md flex items-center gap-md hover:border-emerald-400/20 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-400/10 flex items-center justify-center shrink-0">
                <Icon name="check_circle" size={20} className="text-emerald-400" />
              </div>
              <div className="min-w-0">
                <p className="font-label-md text-sm text-on-surface truncate">{feature.label}</p>
                {typeof feature.value === "string" && (
                  <p className="text-[10px] text-primary font-semibold">{feature.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Locked features */}
      {locked.length > 0 && (
        <div>
          <h3 className="font-label-md font-semibold text-on-surface mb-md flex items-center gap-sm">
            <Icon name="lock" size={20} className="text-on-surface-variant" />
            Recursos bloqueados
            <span className="text-xs font-normal text-on-surface-variant">({locked.length})</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-sm">
            {locked.map((feature) => (
              <div
                key={feature.key}
                className="thesius-card p-md flex items-center gap-md opacity-50"
              >
                <div className="w-9 h-9 rounded-xl bg-surface-variant flex items-center justify-center shrink-0">
                  <Icon name="lock" size={20} className="text-on-surface-variant" />
                </div>
                <div className="min-w-0">
                  <p className="font-label-md text-sm text-on-surface-variant truncate">
                    {feature.label}
                  </p>
                  <p className="text-[10px] text-primary">Upgrade necessário</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
