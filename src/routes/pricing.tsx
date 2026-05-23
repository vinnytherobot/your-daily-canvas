import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "../components/Logo";
import { Icon } from "../components/Icon";
import { PlanCard } from "../components/billing/PlanCard";
import { PlanComparisonTable } from "../components/billing/PlanComparisonTable";
import { BillingCycleToggle } from "../components/billing/BillingCycleToggle";
import { PLANS } from "../lib/subscription-data";
import type { BillingCycle } from "../lib/subscription-types";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [{ title: "Planos e Preços | Thesius" }],
  }),
  component: PricingPage,
});

function PricingPage() {
  const [cycle, setCycle] = useState<BillingCycle>("annual");

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface">
      <header className="top-0 sticky z-50 border-b border-white/6 surface-glass animate-fade-in">
        <div className="max-w-container-max mx-auto flex justify-between items-center px-lg md:px-xl h-[72px]">
          <Link to="/" className="flex items-center gap-md min-w-0">
            <Logo size={40} className="logo-glow" />
            <span className="font-headline-md font-bold text-primary">Thesius</span>
          </Link>
          <div className="flex items-center gap-md">
            <Link to="/dashboard" className="hidden sm:inline font-label-md text-on-surface-variant hover:text-primary px-md py-2">
              Entrar
            </Link>
            <Link to="/dashboard" className="btn-primary font-label-md px-lg py-2.5 rounded-xl whitespace-nowrap">
              Acessar workspace
            </Link>
          </div>
        </div>
      </header>

      <main className="py-2xl px-md md:px-xl">
        <div className="max-w-container-max mx-auto">
          {/* Header */}
          <div className="text-center mb-2xl reveal animate-fade-in-up">
            <h1 className="font-display-lg text-display-lg text-on-surface mb-sm">
              Um plano para cada jornada
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-xl">
              Centralize sua pesquisa, escrita e formatação. Economize centenas de horas e invista no que realmente importa: seu conteúdo.
            </p>

            <BillingCycleToggle cycle={cycle} onChange={setCycle} savingsPercent={17} />
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md mb-32">
            {PLANS.map((plan, i) => (
              <div key={plan.id} className={`reveal animate-fade-in-up reveal-delay-${i + 1}`}>
                <PlanCard
                  plan={plan}
                  cycle={cycle}
                  onSelect={(p) => console.log("Selected plan:", p.name)}
                />
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="mb-32 reveal">
            <div className="text-center mb-xl">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-sm">
                Compare os planos
              </h2>
              <p className="text-on-surface-variant">
                Veja detalhadamente o que cada plano oferece.
              </p>
            </div>
            <div className="thesius-card p-0 md:p-lg">
              <PlanComparisonTable />
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto reveal">
            <div className="text-center mb-xl">
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Dúvidas frequentes
              </h2>
            </div>
            <div className="space-y-md">
              {[
                {
                  q: "Posso cancelar a qualquer momento?",
                  a: "Sim. Você pode cancelar sua assinatura quando quiser, diretamente pelo painel de controle, sem multas ou taxas ocultas. Você continuará tendo acesso até o fim do período já pago.",
                },
                {
                  q: "Como funciona a renovação?",
                  a: "A renovação é automática de acordo com o ciclo escolhido (mensal ou anual). Enviaremos um e-mail 7 dias antes da renovação anual para te lembrar.",
                },
                {
                  q: "E se eu estourar o limite de tokens IA?",
                  a: "No plano Estudante, se você atingir o limite, a IA pausará até o mês seguinte. No plano Pro e Institucional, o uso é ilimitado (sujeito à política de uso justo).",
                },
                {
                  q: "Os trabalhos ficam salvos se eu cancelar?",
                  a: "Seus dados são seus. Se cancelar, seu plano volta para o Free. Projetos além do limite (1) ficarão em modo somente-leitura e poderão ser exportados livremente.",
                },
              ].map((faq) => (
                <div key={faq.q} className="thesius-card p-lg">
                  <h4 className="font-label-md font-semibold text-on-surface mb-xs flex items-center gap-sm">
                    <Icon name="help_outline" className="text-primary" size={20} />
                    {faq.q}
                  </h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed pl-[28px]">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
