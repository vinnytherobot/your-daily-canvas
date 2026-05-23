import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/PageHeader";
import { FeatureAccessMap } from "../components/billing/FeatureAccessMap";
import { UpgradePrompt } from "../components/billing/UpgradePrompt";
import { PLANS, MOCK_ACCESS } from "../lib/subscription-data";

export const Route = createFileRoute("/access-control")({
  head: () => ({ meta: [{ title: "Controle de Acesso | Thesius" }] }),
  component: AccessControlPage,
});

function AccessControlPage() {
  // Use current plan (Student) to show a mix of locked/unlocked
  const currentPlan = PLANS.find((p) => p.tier === "student")!;
  const targetPlan = PLANS.find((p) => p.tier === "pro")!;

  return (
    <AppShell>
      <div className="space-y-xl max-w-5xl mx-auto">
        <PageHeader
          title="Recursos do Plano"
          description={`Você está no plano ${currentPlan.name}. Veja o que está liberado e os limites da sua conta.`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-xl">
            <section className="reveal animate-fade-in-up">
              <FeatureAccessMap plan={currentPlan} access={MOCK_ACCESS} />
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-xl">
            <section className="reveal animate-fade-in-up reveal-delay-2">
              <UpgradePrompt currentPlanName={currentPlan.name} targetPlan={targetPlan} />
            </section>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
