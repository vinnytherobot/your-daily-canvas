// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Thesius — Módulo Financeiro: Dados Mockados
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import type {
  Plan,
  Subscription,
  Payment,
  PaymentMethod,
  Invoice,
  PremiumAccess,
  FinancialMetrics,
} from "./subscription-types";

// ── Planos ──

export const PLANS: Plan[] = [
  {
    id: "plan_free",
    tier: "free",
    name: "Gratuito",
    description: "Para quem está começando sua jornada acadêmica.",
    icon: "school",
    price: { monthly: 0, annual: 0 },
    features: [
      { text: "1 projeto acadêmico", included: true },
      { text: "Editor padrão", included: true },
      { text: "Exportação PDF básica", included: true },
      { text: "5.000 tokens IA/mês", included: true },
      { text: "Formatação ABNT básica", included: true },
      { text: "Importação DOCX/PDF", included: false },
      { text: "Colaboração em tempo real", included: false },
      { text: "IA ilimitada", included: false, premium: true },
      { text: "Revisão estrutural IA", included: false, premium: true },
      { text: "Exportação DOCX", included: false },
    ],
    limits: {
      projects: 1,
      aiTokensPerMonth: 5000,
      collaborators: 0,
      storageGb: 1,
      exportFormats: ["pdf"],
    },
  },
  {
    id: "plan_student",
    tier: "student",
    name: "Estudante",
    description: "Para estudantes sérios que querem produtividade real.",
    icon: "auto_stories",
    price: { monthly: 29, annual: 290 },
    badge: "Economia de R$ 58/ano",
    features: [
      { text: "Projetos ilimitados", included: true },
      { text: "Editor avançado", included: true },
      { text: "ABNT / APA / Vancouver", included: true },
      { text: "50.000 tokens IA/mês", included: true },
      { text: "Importação DOCX/PDF", included: true },
      { text: "Exportação PDF + DOCX", included: true },
      { text: "Histórico de versões", included: true },
      { text: "Colaboração em tempo real", included: false },
      { text: "IA ilimitada", included: false, premium: true },
      { text: "Revisão estrutural IA", included: false, premium: true },
    ],
    limits: {
      projects: "unlimited",
      aiTokensPerMonth: 50000,
      collaborators: 0,
      storageGb: 10,
      exportFormats: ["pdf", "docx"],
    },
  },
  {
    id: "plan_pro",
    tier: "pro",
    name: "Pro",
    description: "Produtividade máxima com IA ilimitada e colaboração.",
    icon: "workspace_premium",
    price: { monthly: 59, annual: 590 },
    highlighted: true,
    badge: "Mais popular",
    features: [
      { text: "Projetos ilimitados", included: true },
      { text: "Editor avançado completo", included: true },
      { text: "ABNT / APA / Vancouver", included: true },
      { text: "IA ilimitada", included: true, premium: true },
      { text: "Importação DOCX/PDF", included: true },
      { text: "Exportação PDF + DOCX", included: true },
      { text: "Colaboração em tempo real", included: true },
      { text: "Revisão estrutural IA", included: true, premium: true },
      { text: "Métricas avançadas", included: true },
      { text: "Suporte prioritário", included: true },
    ],
    limits: {
      projects: "unlimited",
      aiTokensPerMonth: "unlimited",
      collaborators: 10,
      storageGb: 50,
      exportFormats: ["pdf", "docx"],
    },
  },
  {
    id: "plan_institutional",
    tier: "institutional",
    name: "Institucional",
    description: "Para universidades e instituições de ensino.",
    icon: "account_balance",
    price: { monthly: 0, annual: 0 },
    features: [
      { text: "Tudo do plano Pro", included: true },
      { text: "SSO + multi-tenant", included: true },
      { text: "Painel administrativo", included: true },
      { text: "Templates por universidade", included: true },
      { text: "API aberta", included: true },
      { text: "Suporte dedicado 24/7", included: true },
      { text: "Onboarding personalizado", included: true },
      { text: "Relatórios institucionais", included: true },
      { text: "Gestão de alunos", included: true },
      { text: "SLA garantido", included: true },
    ],
    limits: {
      projects: "unlimited",
      aiTokensPerMonth: "unlimited",
      collaborators: "unlimited",
      storageGb: "unlimited",
      exportFormats: ["pdf", "docx"],
    },
  },
];

// ── Método de Pagamento ──

export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "pm_1",
    type: "credit_card",
    brand: "Visa",
    last4: "4242",
    isDefault: true,
  },
  {
    id: "pm_2",
    type: "pix",
    pixKey: "marina@email.com",
    isDefault: false,
  },
];

// ── Assinatura Ativa ──

export const MOCK_SUBSCRIPTION: Subscription = {
  id: "sub_1",
  userId: "user_marina",
  planId: "plan_pro",
  plan: PLANS[2], // Pro
  cycle: "monthly",
  status: "active",
  currentPeriodStart: new Date("2026-05-01"),
  currentPeriodEnd: new Date("2026-06-01"),
  cancelAtPeriodEnd: false,
  createdAt: new Date("2025-11-15"),
};

// ── Histórico de Pagamentos ──

export const MOCK_PAYMENTS: Payment[] = [
  {
    id: "pay_6",
    subscriptionId: "sub_1",
    amount: 59,
    currency: "BRL",
    status: "succeeded",
    method: MOCK_PAYMENT_METHODS[0],
    description: "Plano Pro — Maio 2026",
    createdAt: new Date("2026-05-01"),
    invoiceId: "inv_6",
  },
  {
    id: "pay_5",
    subscriptionId: "sub_1",
    amount: 59,
    currency: "BRL",
    status: "succeeded",
    method: MOCK_PAYMENT_METHODS[0],
    description: "Plano Pro — Abril 2026",
    createdAt: new Date("2026-04-01"),
    invoiceId: "inv_5",
  },
  {
    id: "pay_4",
    subscriptionId: "sub_1",
    amount: 59,
    currency: "BRL",
    status: "succeeded",
    method: MOCK_PAYMENT_METHODS[0],
    description: "Plano Pro — Março 2026",
    createdAt: new Date("2026-03-01"),
    invoiceId: "inv_4",
  },
  {
    id: "pay_3",
    subscriptionId: "sub_1",
    amount: 59,
    currency: "BRL",
    status: "succeeded",
    method: MOCK_PAYMENT_METHODS[0],
    description: "Plano Pro — Fevereiro 2026",
    createdAt: new Date("2026-02-01"),
    invoiceId: "inv_3",
  },
  {
    id: "pay_2",
    subscriptionId: "sub_1",
    amount: 59,
    currency: "BRL",
    status: "succeeded",
    method: MOCK_PAYMENT_METHODS[0],
    description: "Plano Pro — Janeiro 2026",
    createdAt: new Date("2026-01-01"),
    invoiceId: "inv_2",
  },
  {
    id: "pay_1",
    subscriptionId: "sub_1",
    amount: 59,
    currency: "BRL",
    status: "succeeded",
    method: MOCK_PAYMENT_METHODS[0],
    description: "Plano Pro — Dezembro 2025",
    createdAt: new Date("2025-12-01"),
    invoiceId: "inv_1",
  },
  {
    id: "pay_0",
    subscriptionId: "sub_1",
    amount: 29,
    currency: "BRL",
    status: "refunded",
    method: MOCK_PAYMENT_METHODS[0],
    description: "Plano Estudante — Novembro 2025 (upgrade)",
    createdAt: new Date("2025-11-15"),
  },
];

// ── Faturas ──

export const MOCK_INVOICES: Invoice[] = [
  {
    id: "inv_6",
    number: "THE-2026-0006",
    amount: 59,
    currency: "BRL",
    status: "paid",
    description: "Plano Pro — Maio 2026",
    issuedAt: new Date("2026-05-01"),
    dueDate: new Date("2026-05-05"),
    paidAt: new Date("2026-05-01"),
    downloadUrl: "#",
  },
  {
    id: "inv_5",
    number: "THE-2026-0005",
    amount: 59,
    currency: "BRL",
    status: "paid",
    description: "Plano Pro — Abril 2026",
    issuedAt: new Date("2026-04-01"),
    dueDate: new Date("2026-04-05"),
    paidAt: new Date("2026-04-01"),
    downloadUrl: "#",
  },
  {
    id: "inv_4",
    number: "THE-2026-0004",
    amount: 59,
    currency: "BRL",
    status: "paid",
    description: "Plano Pro — Março 2026",
    issuedAt: new Date("2026-03-01"),
    dueDate: new Date("2026-03-05"),
    paidAt: new Date("2026-03-01"),
    downloadUrl: "#",
  },
  {
    id: "inv_3",
    number: "THE-2026-0003",
    amount: 59,
    currency: "BRL",
    status: "paid",
    description: "Plano Pro — Fevereiro 2026",
    issuedAt: new Date("2026-02-01"),
    dueDate: new Date("2026-02-05"),
    paidAt: new Date("2026-02-01"),
    downloadUrl: "#",
  },
  {
    id: "inv_2",
    number: "THE-2026-0002",
    amount: 59,
    currency: "BRL",
    status: "paid",
    description: "Plano Pro — Janeiro 2026",
    issuedAt: new Date("2026-01-01"),
    dueDate: new Date("2026-01-05"),
    paidAt: new Date("2026-01-01"),
    downloadUrl: "#",
  },
  {
    id: "inv_1",
    number: "THE-2025-0012",
    amount: 59,
    currency: "BRL",
    status: "paid",
    description: "Plano Pro — Dezembro 2025",
    issuedAt: new Date("2025-12-01"),
    dueDate: new Date("2025-12-05"),
    paidAt: new Date("2025-12-01"),
    downloadUrl: "#",
  },
  {
    id: "inv_next",
    number: "THE-2026-0007",
    amount: 59,
    currency: "BRL",
    status: "open",
    description: "Plano Pro — Junho 2026",
    issuedAt: new Date("2026-06-01"),
    dueDate: new Date("2026-06-05"),
    downloadUrl: "#",
  },
];

// ── Acesso Premium (Usuário Atual) ──

export const MOCK_ACCESS: PremiumAccess = {
  canUseAi: true,
  aiTokensUsed: 32000,
  aiTokensLimit: "unlimited",
  canCollaborate: true,
  canExportDocx: true,
  canExportPdf: true,
  canImportDocx: true,
  canUseAbnt: true,
  canUseApa: true,
  canUseVancouver: true,
  canUseStructuralReview: true,
  projectsUsed: 3,
  projectsLimit: "unlimited",
  storageUsedGb: 2.4,
  storageLimitGb: 50,
  collaboratorsUsed: 2,
  collaboratorsLimit: 10,
};

// ── Métricas Financeiras ──

export const MOCK_FINANCIAL_METRICS: FinancialMetrics = {
  totalRevenue: 383,
  mrr: 59,
  activeSubscriptions: 1,
  churnRate: 0,
  averageRevenuePerUser: 59,
  revenueByMonth: [
    { month: "Nov/25", revenue: 29, subscriptions: 1 },
    { month: "Dez/25", revenue: 59, subscriptions: 1 },
    { month: "Jan/26", revenue: 59, subscriptions: 1 },
    { month: "Fev/26", revenue: 59, subscriptions: 1 },
    { month: "Mar/26", revenue: 59, subscriptions: 1 },
    { month: "Abr/26", revenue: 59, subscriptions: 1 },
    { month: "Mai/26", revenue: 59, subscriptions: 1 },
  ],
};

// ── Helpers ──

export function formatCurrency(value: number, currency = "BRL"): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency }).format(value);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatDateShort(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function daysUntil(date: Date): number {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function getPlanByTier(tier: string): Plan | undefined {
  return PLANS.find((p) => p.tier === tier);
}

export function getStatusLabel(status: string): string {
  const map: Record<string, string> = {
    active: "Ativa",
    past_due: "Pagamento pendente",
    canceled: "Cancelada",
    trialing: "Em teste",
    succeeded: "Aprovado",
    pending: "Pendente",
    failed: "Falhou",
    refunded: "Reembolsado",
    paid: "Pago",
    open: "Em aberto",
    void: "Anulada",
    draft: "Rascunho",
  };
  return map[status] ?? status;
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    active: "text-emerald-400 bg-emerald-400/10",
    trialing: "text-blue-400 bg-blue-400/10",
    past_due: "text-amber-400 bg-amber-400/10",
    canceled: "text-red-400 bg-red-400/10",
    succeeded: "text-emerald-400 bg-emerald-400/10",
    pending: "text-amber-400 bg-amber-400/10",
    failed: "text-red-400 bg-red-400/10",
    refunded: "text-on-surface-variant bg-surface-variant",
    paid: "text-emerald-400 bg-emerald-400/10",
    open: "text-amber-400 bg-amber-400/10",
    void: "text-on-surface-variant bg-surface-variant",
    draft: "text-on-surface-variant bg-surface-variant",
  };
  return map[status] ?? "text-on-surface-variant bg-surface-variant";
}

/** Comparison features for the plan comparison table */
export const COMPARISON_FEATURES = [
  { key: "projects", label: "Projetos" },
  { key: "editor", label: "Editor avançado" },
  { key: "abnt", label: "Formatação ABNT" },
  { key: "apa", label: "Formatação APA" },
  { key: "vancouver", label: "Formatação Vancouver" },
  { key: "ai_tokens", label: "Tokens IA / mês" },
  { key: "ai_unlimited", label: "IA ilimitada" },
  { key: "import", label: "Importação DOCX/PDF" },
  { key: "export_pdf", label: "Exportação PDF" },
  { key: "export_docx", label: "Exportação DOCX" },
  { key: "collab", label: "Colaboração em tempo real" },
  { key: "structural_review", label: "Revisão estrutural IA" },
  { key: "version_history", label: "Histórico de versões" },
  { key: "metrics", label: "Métricas avançadas" },
  { key: "storage", label: "Armazenamento" },
  { key: "support", label: "Suporte prioritário" },
  { key: "sso", label: "SSO + Multi-tenant" },
  { key: "admin_panel", label: "Painel administrativo" },
] as const;

export type ComparisonFeatureKey = (typeof COMPARISON_FEATURES)[number]["key"];

/** Returns whether a plan has a comparison feature */
export function planHasFeature(plan: Plan, key: ComparisonFeatureKey): boolean | string {
  switch (key) {
    case "projects":
      return plan.limits.projects === "unlimited" ? "Ilimitados" : `${plan.limits.projects}`;
    case "editor":
      return plan.tier !== "free";
    case "abnt":
      return true;
    case "apa":
      return plan.tier !== "free";
    case "vancouver":
      return plan.tier !== "free";
    case "ai_tokens":
      return plan.limits.aiTokensPerMonth === "unlimited"
        ? "Ilimitados"
        : `${(plan.limits.aiTokensPerMonth as number).toLocaleString("pt-BR")}`;
    case "ai_unlimited":
      return plan.limits.aiTokensPerMonth === "unlimited";
    case "import":
      return plan.tier !== "free";
    case "export_pdf":
      return true;
    case "export_docx":
      return plan.tier !== "free";
    case "collab":
      return plan.tier === "pro" || plan.tier === "institutional";
    case "structural_review":
      return plan.tier === "pro" || plan.tier === "institutional";
    case "version_history":
      return plan.tier !== "free";
    case "metrics":
      return plan.tier === "pro" || plan.tier === "institutional";
    case "storage":
      return plan.limits.storageGb === "unlimited"
        ? "Ilimitado"
        : `${plan.limits.storageGb} GB`;
    case "support":
      return plan.tier === "pro" || plan.tier === "institutional";
    case "sso":
      return plan.tier === "institutional";
    case "admin_panel":
      return plan.tier === "institutional";
    default:
      return false;
  }
}
