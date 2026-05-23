import { Icon } from "../Icon";
import type { CheckoutStep } from "../../lib/subscription-types";

type CheckoutStepsProps = {
  currentStep: CheckoutStep;
};

const STEPS: { key: CheckoutStep; label: string; icon: string }[] = [
  { key: "plan", label: "Plano", icon: "layers" },
  { key: "payment", label: "Pagamento", icon: "credit_card" },
  { key: "confirmation", label: "Confirmação", icon: "check_circle" },
];

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const currentIdx = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <div className="flex items-center justify-center gap-0 w-full max-w-lg mx-auto">
      {STEPS.map((step, i) => {
        const isCompleted = i < currentIdx;
        const isCurrent = i === currentIdx;

        return (
          <div key={step.key} className="flex items-center flex-1 last:flex-initial">
            {/* Step circle */}
            <div className="flex flex-col items-center gap-xs">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isCompleted
                    ? "bg-primary text-on-primary"
                    : isCurrent
                      ? "bg-primary/20 text-primary ring-2 ring-primary/40"
                      : "bg-surface-variant text-on-surface-variant"
                }`}
              >
                {isCompleted ? (
                  <Icon name="check" size={20} />
                ) : (
                  <Icon name={step.icon} size={20} />
                )}
              </div>
              <span
                className={`font-label-sm text-xs whitespace-nowrap ${
                  isCurrent ? "text-primary font-semibold" : isCompleted ? "text-primary" : "text-on-surface-variant"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div className="flex-1 mx-sm h-px relative mt-[-16px]">
                <div className="absolute inset-0 bg-surface-variant" />
                <div
                  className="absolute inset-y-0 left-0 bg-primary transition-all duration-700"
                  style={{ width: isCompleted ? "100%" : isCurrent ? "50%" : "0%" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
