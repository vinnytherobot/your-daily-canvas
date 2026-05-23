import { Icon } from "../Icon";
import type { Invoice } from "../../lib/subscription-types";
import { formatCurrency, formatDate, getStatusLabel, getStatusColor } from "../../lib/subscription-data";

type InvoiceListProps = {
  invoices: Invoice[];
};

export function InvoiceList({ invoices }: InvoiceListProps) {
  if (invoices.length === 0) {
    return (
      <div className="thesius-card p-xl text-center">
        <Icon name="description" size={40} className="text-on-surface-variant/30 mx-auto mb-md" />
        <p className="text-on-surface-variant">Nenhuma fatura encontrada.</p>
      </div>
    );
  }

  return (
    <div className="space-y-sm">
      {invoices.map((invoice) => (
        <div
          key={invoice.id}
          className="thesius-card p-md flex items-center gap-md hover:border-primary/20 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-surface-variant flex items-center justify-center shrink-0">
            <Icon
              name={invoice.status === "paid" ? "check_circle" : "schedule"}
              className={invoice.status === "paid" ? "text-emerald-400" : "text-amber-400"}
              size={22}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-sm">
              <p className="font-label-md font-semibold text-on-surface truncate">
                {invoice.number}
              </p>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${getStatusColor(invoice.status)}`}
              >
                {getStatusLabel(invoice.status)}
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-0.5">{invoice.description}</p>
          </div>

          <div className="text-right shrink-0">
            <p className="font-label-md font-semibold text-on-surface tabular-nums">
              {formatCurrency(invoice.amount)}
            </p>
            <p className="text-[10px] text-on-surface-variant">
              {invoice.paidAt ? `Pago em ${formatDate(invoice.paidAt)}` : `Vence em ${formatDate(invoice.dueDate)}`}
            </p>
          </div>

          <button
            type="button"
            className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-white/5 transition-colors shrink-0"
            aria-label="Baixar fatura"
            onClick={() => {
              /* download */
            }}
          >
            <Icon name="download" size={20} />
          </button>
        </div>
      ))}
    </div>
  );
}
