import { Link } from "@tanstack/react-router";
import { Icon } from "../Icon";
import { UsageBar } from "./UsageBar";
import type { Subscription, PremiumAccess } from "../../lib/subscription-types";
import { formatCurrency, formatDate, daysUntil, getStatusLabel, getStatusColor } from "../../lib/subscription-data";

type SubscriptionStatusCardProps = {
  subscription: Subscription;
  access: PremiumAccess;
};

export function SubscriptionStatusCard({ subscription, access }: SubscriptionStatusCardProps) {
  const daysLeft = daysUntil(subscription.currentPeriodEnd);
  const cycleLabel = subscription.cycle === "monthly" ? "mensal" : "anual";
  const price = subscription.cycle === "monthly"
    ? subscription.plan.price.monthly
    : subscription.plan.price.annual;

  return (
    <div className="thesius-card p-xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-lg mb-xl">
          <div className="flex items-start gap-lg">
            <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0">
              <Icon name={subscription.plan.icon} className="text-primary" size={28} />
            </div>
            <div>
              <div className="flex items-center gap-sm mb-xs">
                <h2 className="font-headline-md text-headline-md text-on-surface">
                  Plano {subscription.plan.name}
                </h2>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(subscription.status)}`}>
                  {getStatusLabel(subscription.status)}
                </span>
              </div>
              <p className="text-sm text-on-surface-variant">
                Assinatura {cycleLabel} · {formatCurrency(price)}/{subscription.cycle === "monthly" ? "mês" : "ano"}
              </p>
              <p className="text-xs text-on-surface-variant mt-1">
                Membro desde {formatDate(subscription.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-sm shrink-0">
            <div className="text-right">
              <p className="text-xs text-on-surface-variant">Próxima cobrança</p>
              <p className="font-label-md font-semibold text-on-surface">
                {formatDate(subscription.currentPeriodEnd)}
              </p>
              <p className="text-xs text-primary font-semibold">{daysLeft} dias restantes</p>
            </div>
            <div className="flex gap-sm">
              <Link
                to="/pricing"
                className="btn-primary px-md py-2 rounded-xl font-label-sm flex items-center gap-xs"
              >
                <Icon name="upgrade" size={16} />
                Trocar plano
              </Link>
              <Link
                to="/billing"
                className="btn-ghost px-md py-2 rounded-xl font-label-sm flex items-center gap-xs"
              >
                <Icon name="receipt_long" size={16} />
                Faturas
              </Link>
            </div>
          </div>
        </div>

        {/* Usage bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {access.aiTokensLimit !== "unlimited" ? (
            <UsageBar
              label="Tokens IA"
              used={access.aiTokensUsed}
              limit={access.aiTokensLimit}
              accent="primary"
            />
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="font-label-md text-sm text-on-surface">Tokens IA</span>
                <span className="font-label-sm font-semibold text-primary flex items-center gap-1">
                  <Icon name="all_inclusive" size={14} /> Ilimitados
                </span>
              </div>
              <div className="h-2 bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary/40 to-primary rounded-full w-[15%]" />
              </div>
            </div>
          )}

          <UsageBar
            label="Armazenamento"
            used={access.storageUsedGb}
            limit={access.storageLimitGb}
            unit=" GB"
            accent="emerald"
          />

          <UsageBar
            label="Colaboradores"
            used={access.collaboratorsUsed}
            limit={access.collaboratorsLimit}
            accent="primary"
          />
        </div>
      </div>
    </div>
  );
}
