// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Thesius — Módulo Financeiro: Tipos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── Planos ──

export type PlanTier = "free" | "student" | "pro" | "institutional";
export type BillingCycle = "monthly" | "annual";

export interface PlanFeature {
  text: string;
  included: boolean;
  premium?: boolean;
}

export interface PlanLimits {
  projects: number | "unlimited";
  aiTokensPerMonth: number | "unlimited";
  collaborators: number | "unlimited";
  storageGb: number | "unlimited";
  exportFormats: string[];
}

export interface Plan {
  id: string;
  tier: PlanTier;
  name: string;
  description: string;
  price: { monthly: number; annual: number };
  features: PlanFeature[];
  limits: PlanLimits;
  highlighted?: boolean;
  badge?: string;
  icon: string;
}

// ── Assinaturas ──

export type SubscriptionStatus = "active" | "past_due" | "canceled" | "trialing";

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  plan: Plan;
  cycle: BillingCycle;
  status: SubscriptionStatus;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  trialEnd?: Date;
  createdAt: Date;
}

// ── Pagamentos ──

export type PaymentStatus = "succeeded" | "pending" | "failed" | "refunded";

export interface PaymentMethod {
  id: string;
  type: "credit_card" | "pix" | "boleto";
  brand?: string;
  last4?: string;
  pixKey?: string;
  isDefault: boolean;
}

export interface Payment {
  id: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  description: string;
  createdAt: Date;
  invoiceId?: string;
}

// ── Faturas ──

export type InvoiceStatus = "paid" | "open" | "void" | "draft";

export interface Invoice {
  id: string;
  number: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  description: string;
  issuedAt: Date;
  dueDate: Date;
  paidAt?: Date;
  downloadUrl: string;
}

// ── Controle de Acesso Premium ──

export interface PremiumAccess {
  canUseAi: boolean;
  aiTokensUsed: number;
  aiTokensLimit: number | "unlimited";
  canCollaborate: boolean;
  canExportDocx: boolean;
  canExportPdf: boolean;
  canImportDocx: boolean;
  canUseAbnt: boolean;
  canUseApa: boolean;
  canUseVancouver: boolean;
  canUseStructuralReview: boolean;
  projectsUsed: number;
  projectsLimit: number | "unlimited";
  storageUsedGb: number;
  storageLimitGb: number | "unlimited";
  collaboratorsUsed: number;
  collaboratorsLimit: number | "unlimited";
}

// ── Métricas Financeiras ──

export interface FinancialMetrics {
  totalRevenue: number;
  mrr: number;
  activeSubscriptions: number;
  churnRate: number;
  averageRevenuePerUser: number;
  revenueByMonth: { month: string; revenue: number; subscriptions: number }[];
}

// ── Checkout ──

export type CheckoutStep = "plan" | "payment" | "confirmation";

export interface CheckoutState {
  selectedPlan: Plan | null;
  selectedCycle: BillingCycle;
  step: CheckoutStep;
  couponCode?: string;
  couponDiscount?: number;
  paymentMethod?: PaymentMethod;
}
