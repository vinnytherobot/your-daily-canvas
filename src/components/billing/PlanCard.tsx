import { Link } from "@tanstack/react-router";
import { Icon } from "../Icon";
import { PremiumBadge } from "./PremiumBadge";
import type { Plan, BillingCycle } from "../../lib/subscription-types";
import { formatCurrency } from "../../lib/subscription-data";

type PlanCardProps = {
  plan: Plan;
  cycle: BillingCycle;
  currentPlanTier?: string;
  onSelect?: (plan: Plan) => void;
  compact?: boolean;
};

export function PlanCard({ plan, cycle, currentPlanTier, onSelect, compact = false }: PlanCardProps) {
  const isCurrent = currentPlanTier === plan.tier;
  const isInstitutional = plan.tier === "institutional";
  const price = cycle === "monthly" ? plan.price.monthly : plan.price.annual;
  const monthlyEquivalent = cycle === "annual" && plan.price.annual > 0
    ? Math.round(plan.price.annual / 12)
    : plan.price.monthly;

  const tierOrder = ["free", "student", "pro", "institutional"];
  const isUpgrade = currentPlanTier
    ? tierOrder.indexOf(plan.tier) > tierOrder.indexOf(currentPlanTier)
    : false;
  const isDowngrade = currentPlanTier
    ? tierOrder.indexOf(plan.tier) < tierOrder.indexOf(currentPlanTier)
    : false;

  return (
    <div
      className={`thesius-card p-lg flex flex-col h-full relative group transition-all duration-300 ${
        plan.highlighted ? "pricing-popular scale-[1.02] z-10" : ""
      } ${isCurrent ? "border-primary/40 ring-1 ring-primary/20" : ""}`}
    >
      {/* Badge */}
      {plan.badge && !isCurrent && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-[10px] px-4 py-1 rounded-full font-bold uppercase tracking-wide whitespace-nowrap">
          {plan.badge}
        </div>
      )}
      {isCurrent && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] px-4 py-1 rounded-full font-bold uppercase tracking-wide whitespace-nowrap">
          Plano atual
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-sm mb-md">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
          plan.highlighted ? "bg-primary/20 text-primary" : "bg-surface-variant text-on-surface-variant"
        } group-hover:bg-primary group-hover:text-on-primary`}>
          <Icon name={plan.icon} size={24} />
        </div>
        <div>
          <h3 className={`font-label-md font-bold uppercase tracking-wider ${
            plan.highlighted ? "text-primary" : "text-on-surface-variant"
          }`}>
            {plan.name}
          </h3>
        </div>
      </div>

      {/* Price */}
      <div className="mb-md">
        {isInstitutional ? (
          <span className="text-2xl font-bold text-on-surface">Sob consulta</span>
        ) : (
          <>
            <span className="text-4xl font-bold text-on-surface tabular-nums">
              {formatCurrency(price === 0 ? 0 : monthlyEquivalent)}
            </span>
            {price > 0 && <span className="text-on-surface-variant text-sm">/mês</span>}
            {cycle === "annual" && price > 0 && (
              <p className="text-xs text-on-surface-variant mt-1">
                {formatCurrency(plan.price.annual)}/ano
              </p>
            )}
          </>
        )}
      </div>

      {/* Description */}
      {!compact && (
        <p className="text-sm text-on-surface-variant mb-lg">{plan.description}</p>
      )}

      {/* Features */}
      <ul className={`space-y-sm ${compact ? "mb-md" : "mb-xl"} flex-grow`}>
        {plan.features.map((f) => (
          <li key={f.text} className={`flex items-start gap-xs text-sm ${f.included ? "" : "opacity-40"}`}>
            <Icon
              name={f.included ? "check_circle" : "cancel"}
              className={`shrink-0 mt-0.5 ${f.included ? "text-primary" : "text-on-surface-variant/40"}`}
              size={18}
            />
            <span className="flex items-center gap-xs">
              {f.text}
              {f.premium && f.included && <PremiumBadge />}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      {isCurrent ? (
        <button
          type="button"
          disabled
          className="w-full py-2.5 rounded-xl font-label-md text-center bg-white/5 border border-white/10 text-on-surface-variant cursor-default"
        >
          Plano atual
        </button>
      ) : isInstitutional ? (
        <Link
          to="/pricing"
          className="btn-ghost w-full py-2.5 rounded-xl font-label-md text-center block"
        >
          Falar com vendas
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => onSelect?.(plan)}
          className={`w-full py-2.5 rounded-xl font-label-md text-center transition-opacity ${
            plan.highlighted || isUpgrade ? "btn-primary" : "btn-ghost"
          }`}
        >
          {isUpgrade ? "Fazer upgrade" : isDowngrade ? "Downgrade" : "Assinar"}
        </button>
      )}
    </div>
  );
}
