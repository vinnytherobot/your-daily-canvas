import { Icon } from "../Icon";
import type { Plan, BillingCycle } from "../../lib/subscription-types";
import { formatCurrency } from "../../lib/subscription-data";

type CheckoutSummaryProps = {
  plan: Plan;
  cycle: BillingCycle;
  couponDiscount?: number;
};

export function CheckoutSummary({ plan, cycle, couponDiscount = 0 }: CheckoutSummaryProps) {
  const price = cycle === "monthly" ? plan.price.monthly : plan.price.annual;
  const discount = couponDiscount > 0 ? price * (couponDiscount / 100) : 0;
  const total = price - discount;
  const cycleLabel = cycle === "monthly" ? "mensal" : "anual";

  return (
    <div className="thesius-card p-lg space-y-lg">
      <h3 className="font-label-md font-semibold text-on-surface flex items-center gap-sm">
        <Icon name="receipt_long" size={20} className="text-primary" />
        Resumo do pedido
      </h3>

      {/* Plan info */}
      <div className="flex items-center gap-md pb-md border-b border-white/6">
        <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
          <Icon name={plan.icon} className="text-primary" size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-label-md font-semibold text-on-surface">Plano {plan.name}</p>
          <p className="text-xs text-on-surface-variant">Assinatura {cycleLabel}</p>
        </div>
      </div>

      {/* Pricing */}
      <div className="space-y-sm">
        <div className="flex justify-between text-sm">
          <span className="text-on-surface-variant">Plano {plan.name} ({cycleLabel})</span>
          <span className="text-on-surface tabular-nums">{formatCurrency(price)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-emerald-400">Desconto ({couponDiscount}%)</span>
            <span className="text-emerald-400 tabular-nums">-{formatCurrency(discount)}</span>
          </div>
        )}

        <div className="pt-md border-t border-white/6 flex justify-between">
          <span className="font-label-md font-semibold text-on-surface">Total</span>
          <div className="text-right">
            <p className="text-xl font-bold text-on-surface tabular-nums">{formatCurrency(total)}</p>
            {cycle === "annual" && (
              <p className="text-[10px] text-on-surface-variant">
                ≈ {formatCurrency(Math.round(total / 12))}/mês
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Features highlight */}
      <div className="bg-surface-container-low rounded-xl p-md">
        <p className="font-label-sm text-on-surface-variant mb-sm">Incluso no plano:</p>
        <ul className="space-y-xs">
          {plan.features
            .filter((f) => f.included)
            .slice(0, 5)
            .map((f) => (
              <li key={f.text} className="flex items-center gap-xs text-xs text-on-surface">
                <Icon name="check" size={14} className="text-primary shrink-0" />
                {f.text}
              </li>
            ))}
        </ul>
      </div>

      {/* Security note */}
      <div className="flex items-start gap-sm text-[11px] text-on-surface-variant">
        <Icon name="shield" size={16} className="text-primary shrink-0 mt-0.5" />
        <span>Cancele quando quiser. Sem multa. Acesso até o fim do período pago.</span>
      </div>
    </div>
  );
}
