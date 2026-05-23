import { Icon } from "../Icon";
import type { Payment } from "../../lib/subscription-types";
import { formatCurrency, formatDate, getStatusLabel, getStatusColor } from "../../lib/subscription-data";

type PaymentHistoryTableProps = {
  payments: Payment[];
};

export function PaymentHistoryTable({ payments }: PaymentHistoryTableProps) {
  if (payments.length === 0) {
    return (
      <div className="thesius-card p-xl text-center">
        <Icon name="receipt_long" size={40} className="text-on-surface-variant/30 mx-auto mb-md" />
        <p className="text-on-surface-variant">Nenhum pagamento encontrado.</p>
      </div>
    );
  }

  return (
    <div className="thesius-card overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8">
              <th className="text-left py-3 px-lg font-label-md text-on-surface-variant">Data</th>
              <th className="text-left py-3 px-lg font-label-md text-on-surface-variant">Descrição</th>
              <th className="text-left py-3 px-lg font-label-md text-on-surface-variant">Método</th>
              <th className="text-right py-3 px-lg font-label-md text-on-surface-variant">Valor</th>
              <th className="text-center py-3 px-lg font-label-md text-on-surface-variant">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-b border-white/4 hover:bg-white/[0.02] transition-colors"
              >
                <td className="py-3 px-lg text-on-surface-variant whitespace-nowrap">
                  {formatDate(payment.createdAt)}
                </td>
                <td className="py-3 px-lg text-on-surface font-medium">{payment.description}</td>
                <td className="py-3 px-lg text-on-surface-variant whitespace-nowrap">
                  <div className="flex items-center gap-xs">
                    <Icon
                      name={
                        payment.method.type === "credit_card"
                          ? "credit_card"
                          : payment.method.type === "pix"
                            ? "qr_code_2"
                            : "receipt"
                      }
                      size={16}
                    />
                    {payment.method.type === "credit_card"
                      ? `${payment.method.brand} •••• ${payment.method.last4}`
                      : payment.method.type === "pix"
                        ? "PIX"
                        : "Boleto"}
                  </div>
                </td>
                <td className="py-3 px-lg text-right text-on-surface font-semibold tabular-nums whitespace-nowrap">
                  {formatCurrency(payment.amount)}
                </td>
                <td className="py-3 px-lg text-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(payment.status)}`}
                  >
                    {getStatusLabel(payment.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
