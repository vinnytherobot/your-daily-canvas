import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/PageHeader";
import { StatCard } from "../components/StatCard";
import { RevenueChart } from "../components/billing/RevenueChart";
import { PaymentHistoryTable } from "../components/billing/PaymentHistoryTable";
import { InvoiceList } from "../components/billing/InvoiceList";
import { formatCurrency } from "../lib/subscription-data";
import {
  MOCK_FINANCIAL_METRICS,
  MOCK_PAYMENTS,
  MOCK_INVOICES,
} from "../lib/subscription-data";

export const Route = createFileRoute("/billing")({
  head: () => ({ meta: [{ title: "Gestão Financeira | Thesius" }] }),
  component: BillingPage,
});

function BillingPage() {
  return (
    <AppShell>
      <div className="space-y-xl max-w-6xl mx-auto">
        <PageHeader
          title="Gestão Financeira"
          description="Acompanhe pagamentos, faturas e métricas do seu plano."
        />

        {/* Resumo Financeiro */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-gutter reveal animate-fade-in-up">
          <StatCard
            label="Total Gasto (2026)"
            value={formatCurrency(MOCK_FINANCIAL_METRICS.totalRevenue)}
            icon="payments"
            accent="gold"
          />
          <StatCard
            label="Plano Atual"
            value="Pro"
            hint={formatCurrency(MOCK_FINANCIAL_METRICS.mrr) + "/mês"}
            icon="workspace_premium"
            accent="success"
          />
          <StatCard
            label="Próxima Fatura"
            value="01 Jun"
            hint={formatCurrency(59)}
            icon="event"
            accent="muted"
          />
          <StatCard
            label="Status"
            value="Em dia"
            icon="check_circle"
            accent="success"
          />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-xl">
            {/* Gráfico */}
            <section className="reveal animate-fade-in-up reveal-delay-2">
              <RevenueChart metrics={MOCK_FINANCIAL_METRICS} />
            </section>

            {/* Histórico */}
            <section className="reveal animate-fade-in-up reveal-delay-3">
              <div className="flex justify-between items-center mb-md">
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Histórico de Transações
                </h3>
                <div className="flex gap-2">
                  <button type="button" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                    Filtrar
                  </button>
                  <button type="button" className="text-sm text-primary hover:underline transition-colors">
                    Baixar CSV
                  </button>
                </div>
              </div>
              <PaymentHistoryTable payments={MOCK_PAYMENTS} />
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-xl">
            {/* Faturas */}
            <section className="reveal animate-fade-in-up reveal-delay-2">
              <div className="flex justify-between items-center mb-md">
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Faturas
                </h3>
              </div>
              <InvoiceList invoices={MOCK_INVOICES} />
            </section>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
