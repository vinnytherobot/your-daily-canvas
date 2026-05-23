import { Icon } from "../Icon";
import type { PaymentMethod } from "../../lib/subscription-types";

type PaymentMethodCardProps = {
  method: PaymentMethod;
  onSetDefault?: (id: string) => void;
  onRemove?: (id: string) => void;
};

const BRAND_ICONS: Record<string, string> = {
  visa: "credit_card",
  mastercard: "credit_card",
  amex: "credit_card",
  elo: "credit_card",
};

export function PaymentMethodCard({ method, onSetDefault, onRemove }: PaymentMethodCardProps) {
  return (
    <div
      className={`thesius-card p-lg flex items-center gap-lg transition-all ${
        method.isDefault ? "border-primary/30 ring-1 ring-primary/15" : ""
      }`}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
          method.type === "credit_card"
            ? "bg-primary/10 text-primary"
            : method.type === "pix"
              ? "bg-emerald-400/10 text-emerald-400"
              : "bg-surface-variant text-on-surface-variant"
        }`}
      >
        <Icon
          name={
            method.type === "credit_card"
              ? BRAND_ICONS[method.brand?.toLowerCase() ?? ""] ?? "credit_card"
              : method.type === "pix"
                ? "qr_code_2"
                : "receipt"
          }
          size={24}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-sm">
          <p className="font-label-md font-semibold text-on-surface">
            {method.type === "credit_card"
              ? `${method.brand ?? "Cartão"} •••• ${method.last4}`
              : method.type === "pix"
                ? "PIX"
                : "Boleto"}
          </p>
          {method.isDefault && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/15 text-primary">
              Padrão
            </span>
          )}
        </div>
        {method.type === "pix" && method.pixKey && (
          <p className="text-xs text-on-surface-variant mt-0.5 truncate">{method.pixKey}</p>
        )}
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {!method.isDefault && onSetDefault && (
          <button
            type="button"
            onClick={() => onSetDefault(method.id)}
            className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-white/5 transition-colors"
            aria-label="Definir como padrão"
          >
            <Icon name="star" size={18} />
          </button>
        )}
        {onRemove && (
          <button
            type="button"
            onClick={() => onRemove(method.id)}
            className="p-2 rounded-lg text-on-surface-variant hover:text-red-400 hover:bg-red-400/5 transition-colors"
            aria-label="Remover"
          >
            <Icon name="delete" size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
