import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/PageHeader";
import { SubscriptionStatusCard } from "../components/billing/SubscriptionStatusCard";
import { PaymentMethodCard } from "../components/billing/PaymentMethodCard";
import { PaymentHistoryTable } from "../components/billing/PaymentHistoryTable";
import { 
  MOCK_SUBSCRIPTION, 
  MOCK_ACCESS, 
  MOCK_PAYMENT_METHODS,
  MOCK_PAYMENTS 
} from "../lib/subscription-data";

export const Route = createFileRoute("/subscription")({
  head: () => ({ meta: [{ title: "Assinatura | Thesius" }] }),
  component: SubscriptionPage,
});

function SubscriptionPage() {
  return (
    <AppShell>
      <div className="space-y-xl max-w-5xl mx-auto">
        <PageHeader
          title="Minha Assinatura"
          description="Gerencie seu plano, método de pagamento e acompanhe seu uso."
        />

        {/* Hero Card */}
        <section className="reveal animate-fade-in-up">
          <SubscriptionStatusCard
            subscription={MOCK_SUBSCRIPTION}
            access={MOCK_ACCESS}
          />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-xl">
            {/* Payment Methods */}
            <section className="reveal animate-fade-in-up reveal-delay-2">
              <div className="flex justify-between items-center mb-md">
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Formas de pagamento
                </h3>
                <button type="button" className="text-primary font-label-sm hover:underline">
                  + Adicionar novo
                </button>
              </div>
              <div className="space-y-md">
                {MOCK_PAYMENT_METHODS.map((pm) => (
                  <PaymentMethodCard
                    key={pm.id}
                    method={pm}
                    onSetDefault={(id) => console.log("Set default", id)}
                    onRemove={pm.isDefault ? undefined : (id) => console.log("Remove", id)}
                  />
                ))}
              </div>
            </section>

            {/* Recent Payments Preview */}
            <section className="reveal animate-fade-in-up reveal-delay-3">
              <div className="flex justify-between items-center mb-md">
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Últimos pagamentos
                </h3>
              </div>
              <PaymentHistoryTable payments={MOCK_PAYMENTS.slice(0, 3)} />
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-md">
            {/* Quick Actions */}
            <div className="thesius-card p-lg reveal animate-fade-in-up reveal-delay-1">
              <h3 className="font-label-md font-semibold text-on-surface mb-md">Ações</h3>
              <ul className="space-y-sm">
                <li>
                  <button type="button" className="w-full text-left font-label-md text-on-surface-variant hover:text-primary transition-colors py-2">
                    Atualizar dados cadastrais
                  </button>
                </li>
                <li>
                  <button type="button" className="w-full text-left font-label-md text-on-surface-variant hover:text-primary transition-colors py-2">
                    Alterar ciclo de cobrança
                  </button>
                </li>
                <li>
                  <button type="button" className="w-full text-left font-label-md text-red-400/80 hover:text-red-400 transition-colors py-2">
                    Cancelar assinatura
                  </button>
                </li>
              </ul>
            </div>

            {/* Need Help */}
            <div className="rounded-2xl p-lg bg-surface-container-low border border-white/6 reveal animate-fade-in-up reveal-delay-2">
              <p className="font-label-md font-semibold text-on-surface mb-xs">Precisa de ajuda?</p>
              <p className="text-xs text-on-surface-variant mb-md">
                Nossa equipe está pronta para ajudar com dúvidas sobre faturamento.
              </p>
              <button type="button" className="text-sm font-semibold text-primary hover:underline">
                Falar com suporte →
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
