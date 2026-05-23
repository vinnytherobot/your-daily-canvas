import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "../components/Logo";
import { CheckoutSteps } from "../components/billing/CheckoutSteps";
import { CheckoutForm } from "../components/billing/CheckoutForm";
import { CheckoutSummary } from "../components/billing/CheckoutSummary";
import { PLANS } from "../lib/subscription-data";
import type { CheckoutStep } from "../lib/subscription-types";
import { Icon } from "../components/Icon";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout | Thesius" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<CheckoutStep>("payment");
  const [isProcessing, setIsProcessing] = useState(false);

  // Hardcode 'pro' plan for demo
  const plan = PLANS.find((p) => p.tier === "pro")!;
  const cycle = "monthly";

  const handlePaymentSubmit = (data: any) => {
    console.log("Processing payment...", data);
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setStep("confirmation");
    }, 2000);
  };

  if (step === "confirmation") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-md text-center">
        <div className="w-20 h-20 bg-emerald-400/20 rounded-full flex items-center justify-center mb-lg animate-scale-in">
          <Icon name="check_circle" className="text-emerald-400" size={48} />
        </div>
        <h1 className="font-display-lg text-4xl text-on-surface mb-sm animate-fade-in-up">
          Pagamento confirmado!
        </h1>
        <p className="text-on-surface-variant mb-xl max-w-md animate-fade-in-up delay-1">
          Sua assinatura do plano {plan.name} foi ativada com sucesso. Você já tem acesso a todos os recursos premium.
        </p>
        <button
          type="button"
          onClick={() => navigate({ to: "/subscription" })}
          className="btn-primary px-xl py-3 rounded-xl font-label-md animate-fade-in-up delay-2"
        >
          Ir para minha conta
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface flex flex-col">
      <header className="border-b border-white/6 surface-glass h-[72px] flex items-center justify-center shrink-0">
        <div className="flex items-center gap-sm">
          <Logo size={32} className="logo-glow" />
          <span className="font-headline-md font-bold text-primary">Thesius Checkout</span>
        </div>
      </header>

      <main className="flex-1 py-xl px-md overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-xl">
          <CheckoutSteps currentStep={step} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
            <div className="lg:col-span-2">
              <div className="thesius-card p-xl reveal animate-fade-in-up">
                <h2 className="font-headline-md text-headline-md text-on-surface mb-xl">
                  Detalhes do pagamento
                </h2>
                <CheckoutForm onSubmit={handlePaymentSubmit} isProcessing={isProcessing} />
              </div>
            </div>

            <div className="reveal animate-fade-in-up reveal-delay-2">
              <CheckoutSummary plan={plan} cycle={cycle} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
