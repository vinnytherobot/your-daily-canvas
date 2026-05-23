import { useState } from "react";
import { Icon } from "../Icon";

type PaymentMethodType = "credit_card" | "pix" | "boleto";

type CheckoutFormProps = {
  onSubmit: (data: { method: PaymentMethodType; cardData?: CardData }) => void;
  isProcessing?: boolean;
};

type CardData = {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
};

export function CheckoutForm({ onSubmit, isProcessing = false }: CheckoutFormProps) {
  const [method, setMethod] = useState<PaymentMethodType>("credit_card");
  const [cardData, setCardData] = useState<CardData>({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const methods: { type: PaymentMethodType; label: string; icon: string; desc: string }[] = [
    { type: "credit_card", label: "Cartão de crédito", icon: "credit_card", desc: "Visa, Mastercard, Elo, Amex" },
    { type: "pix", label: "PIX", icon: "qr_code_2", desc: "Pagamento instantâneo" },
    { type: "boleto", label: "Boleto", icon: "receipt", desc: "Prazo de 3 dias úteis" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ method, cardData: method === "credit_card" ? cardData : undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-lg">
      {/* Method selection */}
      <div>
        <p className="font-label-md font-semibold text-on-surface mb-md">Forma de pagamento</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-sm">
          {methods.map((m) => (
            <button
              key={m.type}
              type="button"
              onClick={() => setMethod(m.type)}
              className={`p-md rounded-xl border text-left transition-all group ${
                method === m.type
                  ? "border-primary/40 bg-primary/5 ring-1 ring-primary/20"
                  : "border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center gap-sm mb-xs">
                <Icon
                  name={m.icon}
                  size={20}
                  className={method === m.type ? "text-primary" : "text-on-surface-variant group-hover:text-on-surface"}
                />
                <span className={`font-label-md font-semibold ${method === m.type ? "text-primary" : "text-on-surface"}`}>
                  {m.label}
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant">{m.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Credit card form */}
      {method === "credit_card" && (
        <div className="space-y-md animate-fade-in">
          <div>
            <label htmlFor="card-number" className="block font-label-sm text-on-surface-variant mb-xs">
              Número do cartão
            </label>
            <input
              id="card-number"
              type="text"
              placeholder="0000 0000 0000 0000"
              value={cardData.number}
              onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
              className="w-full bg-white/4 border border-white/8 rounded-xl px-md py-2.5 font-body-md focus:ring-2 focus:ring-primary/25 focus:border-primary/30 outline-none placeholder:text-on-surface-variant/50 transition-shadow tabular-nums"
              maxLength={19}
            />
          </div>
          <div>
            <label htmlFor="card-name" className="block font-label-sm text-on-surface-variant mb-xs">
              Nome no cartão
            </label>
            <input
              id="card-name"
              type="text"
              placeholder="Como aparece no cartão"
              value={cardData.name}
              onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
              className="w-full bg-white/4 border border-white/8 rounded-xl px-md py-2.5 font-body-md focus:ring-2 focus:ring-primary/25 focus:border-primary/30 outline-none placeholder:text-on-surface-variant/50 transition-shadow"
            />
          </div>
          <div className="grid grid-cols-2 gap-md">
            <div>
              <label htmlFor="card-expiry" className="block font-label-sm text-on-surface-variant mb-xs">
                Validade
              </label>
              <input
                id="card-expiry"
                type="text"
                placeholder="MM/AA"
                value={cardData.expiry}
                onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                className="w-full bg-white/4 border border-white/8 rounded-xl px-md py-2.5 font-body-md focus:ring-2 focus:ring-primary/25 focus:border-primary/30 outline-none placeholder:text-on-surface-variant/50 transition-shadow tabular-nums"
                maxLength={5}
              />
            </div>
            <div>
              <label htmlFor="card-cvv" className="block font-label-sm text-on-surface-variant mb-xs">
                CVV
              </label>
              <input
                id="card-cvv"
                type="text"
                placeholder="000"
                value={cardData.cvv}
                onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                className="w-full bg-white/4 border border-white/8 rounded-xl px-md py-2.5 font-body-md focus:ring-2 focus:ring-primary/25 focus:border-primary/30 outline-none placeholder:text-on-surface-variant/50 transition-shadow tabular-nums"
                maxLength={4}
              />
            </div>
          </div>
        </div>
      )}

      {/* PIX */}
      {method === "pix" && (
        <div className="thesius-card p-lg text-center animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-emerald-400/10 flex items-center justify-center mx-auto mb-md">
            <Icon name="qr_code_2" className="text-emerald-400" size={32} />
          </div>
          <p className="text-sm text-on-surface mb-xs">
            Ao confirmar, um QR Code será gerado para pagamento via PIX.
          </p>
          <p className="text-xs text-on-surface-variant">
            O pagamento é processado instantaneamente.
          </p>
        </div>
      )}

      {/* Boleto */}
      {method === "boleto" && (
        <div className="thesius-card p-lg text-center animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-surface-variant flex items-center justify-center mx-auto mb-md">
            <Icon name="receipt" className="text-on-surface-variant" size={32} />
          </div>
          <p className="text-sm text-on-surface mb-xs">
            O boleto será gerado após a confirmação.
          </p>
          <p className="text-xs text-on-surface-variant">
            Prazo de compensação: até 3 dias úteis.
          </p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isProcessing}
        className="btn-primary w-full py-3.5 rounded-xl font-label-md flex items-center justify-center gap-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
            Processando...
          </>
        ) : (
          <>
            <Icon name="lock" size={18} />
            Confirmar pagamento
          </>
        )}
      </button>

      <p className="text-[11px] text-on-surface-variant text-center flex items-center justify-center gap-xs">
        <Icon name="verified_user" size={14} className="text-primary" />
        Pagamento seguro e criptografado
      </p>
    </form>
  );
}
