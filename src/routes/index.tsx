import { createFileRoute, Link } from "@tanstack/react-router";
import { Icon } from "../components/Icon";
import { useState, useEffect, useRef } from "react";
import { Logo } from "../components/Logo";

import { PlanCard } from "../components/billing/PlanCard";
import { PLANS } from "../lib/subscription-data";

import { Button } from "@/components/ui/button";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Thesius | Plataforma Acadêmica Inteligente com IA" },
      { name: "description", content: "Word 2.0 acadêmico: editor, ABNT automática, IA contextual, referências e exportação. TCC, monografia, dissertação e artigos." },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  { icon: "edit_note", title: "Editor acadêmico avançado", desc: "Workspace completo com estrutura de capítulos, autosave e histórico de versões." },
  { icon: "format_list_bulleted", title: "Formatação ABNT automática", desc: "Autoformatação inteligente em 1 clique. Margens, citações e referências normatizadas." },
  { icon: "upload_file", title: "Importação DOCX/PDF", desc: "Traga trabalhos existentes e deixe a IA reorganizar e padronizar o documento." },
  { icon: "psychology", title: "IA acadêmica contextual", desc: "Copiloto integrado: escrita, revisão, metodologia, bibliografia e coerência textual." },
  { icon: "folder_open", title: "Gestão de projetos", desc: "TCCs, monografias, dissertações e artigos em um só lugar, com templates universitários." },
  { icon: "format_quote", title: "Referências e citações", desc: "Sistema completo ABNT, APA e Vancouver com geração automática de bibliografia." },
  { icon: "spellcheck", title: "Revisão textual inteligente", desc: "Gramática, estilo científico, plágio e análise estrutural do seu trabalho." },
  { icon: "groups", title: "Colaboração em tempo real", desc: "Compartilhe com colegas, comente trechos e sincronize na nuvem." },
  { icon: "download", title: "Exportação DOCX/PDF", desc: "Entregue pronto para banca, periódico ou instituição." },
];

const AI_COPILOT = [
  "Escrita acadêmica assistida",
  "Revisão gramatical e de estilo",
  "Coerência e fluxo textual",
  "Geração de introduções",
  "Sugestões metodológicas",
  "Bibliografia e citações",
  "Correções ABNT em contexto",
  "Revisão estrutural de capítulos",
];

const DIFFERENTIALS = [
  { icon: "bolt", title: "Experiência Notion × Cursor", desc: "Interface limpa, rápida e focada em produtividade — sem a complexidade do Word." },
  { icon: "auto_fix_high", title: "Automação acadêmica real", desc: "Não é só IA generativa: formatação, normas e estrutura aplicadas de verdade." },
  { icon: "science", title: "IA para escrita científica", desc: "Treinada para rigor, citações e linguagem formal — não para posts de blog." },
  { icon: "hub", title: "Fluxo centralizado", desc: "Da pesquisa à exportação final, sem alternar entre 8 ferramentas diferentes." },
];

function Landing() {
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal,.reveal-scale');
    if (!('IntersectionObserver' in window) || !els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="font-body-md text-on-surface overflow-x-hidden relative z-10">
      <header className="top-0 sticky z-50 border-b border-white/[0.06] surface-glass animate-fade-in">
        <div className="max-w-container-max mx-auto flex justify-between items-center px-lg md:px-xl h-[72px]">
          <div className="flex items-center gap-md min-w-0">
            <Logo size={40} className="logo-glow" />
            <span className="font-headline-md font-bold text-primary">Thesius</span>
            <nav className="hidden lg:flex gap-8 ml-8">
              {[
                { href: "#features", label: "Funcionalidades" },
                { href: "#ai", label: "IA Acadêmica" },
                { href: "#pricing", label: "Planos" },
              ].map((l) => (
                <a key={l.href} className="font-label-md text-on-surface-variant hover:text-primary transition-colors" href={l.href}>
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-md">
            <Link to="/login" className="hidden sm:inline font-label-md text-on-surface-variant hover:text-primary px-md py-2">
              Entrar
            </Link>
            <Link to="/login" className="hidden sm:inline-block btn-primary font-label-md px-lg py-2.5 rounded-xl whitespace-nowrap">
              Começar grátis
            </Link>
            <Button type="button" onClick={() => setMobileNav(true)} className="lg:hidden p-2 rounded-xl hover:bg-white/5" aria-label="Menu">
              <Icon name="menu" size={26} />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile nav drawer */}
      {mobileNav && (
        <div className="lg:hidden">
          <Button type="button" className="mobile-nav-overlay" onClick={() => setMobileNav(false)} aria-label="Fechar menu" />
          <nav className="mobile-nav-drawer" style={{ animation: 'slideInFromRight 0.3s cubic-bezier(0.16,1,0.3,1)' }}>
            <div className="flex justify-between items-center mb-xl">
              <div className="flex items-center gap-md">
                <Logo size={36} className="logo-glow" />
                <span className="font-headline-md font-bold text-primary">Thesius</span>
              </div>
              <Button type="button" onClick={() => setMobileNav(false)} className="p-2 rounded-xl hover:bg-white/5" aria-label="Fechar">
                <Icon name="close" size={24} />
              </Button>
            </div>
            <div className="space-y-2">
              {[{ href: "#features", label: "Funcionalidades" }, { href: "#ai", label: "IA Acadêmica" }, { href: "#pricing", label: "Planos" }].map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMobileNav(false)} className="block px-md py-3 rounded-xl text-on-surface-variant hover:text-primary hover:bg-white/5 font-label-md transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
            <div className="mt-xl space-y-sm">
              <Link to="/login" className="btn-primary block text-center py-3 rounded-xl font-label-md">Começar grátis</Link>
              <Link to="/login" className="btn-ghost block text-center py-3 rounded-xl font-label-md">Entrar</Link>
            </div>
          </nav>
        </div>
      )}

      <main>
        {/* Hero */}
        <section className="relative pt-2xl pb-32 px-md md:px-xl hero-mesh">
          <div className="max-w-container-max mx-auto">
            <div className="grid lg:grid-cols-2 gap-2xl items-center">
              <div className="text-left relative z-10">
                <div className="inline-flex items-center gap-sm saas-badge mb-lg animate-fade-in-up">
                  <span className="w-2 h-2 rounded-full status-dot animate-pulse shrink-0" />
                  <span className="font-label-sm">Plataforma acadêmica · IA · ABNT automática</span>
                </div>
                <h1 className="font-display-lg text-display-lg text-on-surface mb-md animate-fade-in-up delay-2">
                  O <span className="gradient-text-animated">Word 2.0</span> para sua vida acadêmica
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-xl animate-fade-in-up delay-3">
                  Crie, edite, organize e formate TCCs, monografias, dissertações e artigos científicos com IA contextual, ABNT automática e workspace completo — tudo em um só lugar.
                </p>
                <div className="flex flex-col sm:flex-row gap-md mb-lg animate-fade-in-up delay-4">
                  <Link to="/login" className="btn-primary font-label-md text-center px-xl py-3.5 rounded-xl">
                    Começar grátis — 14 dias Pro
                  </Link>
                  <Link to="/workspace" className="btn-ghost font-label-md text-center px-xl py-3.5 rounded-xl">
                    Ver demonstração
                  </Link>
                </div>
                <div className="flex flex-wrap gap-lg text-sm text-on-surface-variant animate-fade-in-up delay-5">
                  {["Sem cartão", "ABNT em 1 clique", "Export DOCX/PDF"].map((t) => (
                    <span key={t} className="flex items-center gap-xs"><Icon name="check_circle" className="text-primary shrink-0" size={20} />{t}</span>
                  ))}
                </div>
              </div>
              <div className="relative z-10 animate-fade-in-up delay-4">
                <div className="surface-glass rounded-2xl p-md saas-float ambient-shadow border border-outline-variant/30">
                  <div className="flex items-center gap-xs mb-md px-sm">
                    <div className="w-3 h-3 rounded-full bg-error/60" />
                    <div className="w-3 h-3 rounded-full bg-tertiary-container/40" />
                    <div className="w-3 h-3 rounded-full bg-secondary/40" />
                    <span className="ml-auto font-label-sm text-on-surface-variant/60">dissertacao-2026.tsi</span>
                  </div>
                  <div className="bg-surface-container-lowest rounded-xl p-lg min-h-[280px] border border-outline-variant/20">
                    <p className="font-label-sm text-secondary font-bold mb-sm">Copiloto IA</p>
                    <p className="text-sm text-on-surface-variant mb-md italic">"Sugira uma introdução para o capítulo de metodologia mista..."</p>
                    <div className="space-y-sm">
                      <div className="h-2 bg-surface-variant rounded w-full" />
                      <div className="h-2 bg-surface-variant rounded w-4/5" />
                      <div className="h-2 bg-secondary/30 rounded w-3/5" />
                    </div>
                    <div className="mt-lg flex gap-sm">
                      <span className="saas-chip">ABNT ✓</span>
                      <span className="saas-chip">1.452 palavras</span>
                      <span className="saas-chip !text-primary">● Sincronizado</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 hidden md:block surface-glass p-md rounded-xl ambient-shadow">
                  <Icon name="verified" className="text-secondary" />
                  <p className="font-label-sm font-bold mt-xs">Score ABNT 94%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social proof strip */}
        <section className="py-lg border-y border-white/[0.06] bg-surface-container-low/50">
          <div className="max-w-container-max mx-auto px-md flex flex-wrap justify-center gap-x-xl gap-y-md items-center text-on-surface-variant font-label-sm">
            {["+12.000 estudantes", "ABNT · APA · Vancouver", "Colaboração em tempo real", "Nuvem segura"].map((t) => (
              <span key={t} className="flex items-center gap-sm"><Icon name="school" className="text-primary shrink-0" size={18} />{t}</span>
            ))}
          </div>
        </section>

        {/* Features grid */}
        <section className="py-xl px-md" id="features">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-2xl max-w-2xl mx-auto reveal">
              <p className="section-eyebrow mb-sm">Produto completo</p>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-sm">Do rascunho à entrega</h2>
              <p className="font-body-md text-on-surface-variant">Workspace modular, escalável e preparado para instituições — com foco total em produtividade acadêmica.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
              {FEATURES.map((f, i) => (
                <div key={f.title} className="saas-feature-card group reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-md group-hover:bg-primary group-hover:text-on-primary transition-colors text-primary">
                    <Icon name={f.icon} size={26} />
                  </div>
                  <h3 className="font-headline-md text-headline-md mb-xs">{f.title}</h3>
                  <p className="font-body-md text-sm text-on-surface-variant">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Copilot */}
        <section className="py-xl px-md md:px-xl bg-surface-container-low/80 border-y border-white/[0.06]" id="ai">
          <div className="max-w-container-max mx-auto">
            <div className="grid lg:grid-cols-2 gap-xl items-center">
              <div className="reveal">
                <p className="section-eyebrow mb-sm">Diferencial</p>
                <h2 className="font-headline-lg text-headline-lg text-primary mb-md">IA acadêmica que entende seu trabalho</h2>
                <p className="font-body-lg text-on-surface-variant mb-lg">
                  Não é um chatbot genérico. O copiloto Thesius lê seu documento, suas referências e o contexto do capítulo para sugerir com rigor científico.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
                  {AI_COPILOT.map((item) => (
                    <div key={item} className="flex items-center gap-sm text-sm">
                      <Icon name="auto_awesome" className="text-primary shrink-0" size={20} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ai-gradient-border rounded-2xl p-lg reveal" style={{ transitionDelay: '0.15s' }}>
                <div className="space-y-md">
                  <div className="bg-surface-container-low p-md rounded-xl">
                    <p className="text-xs text-on-surface-variant mb-xs">Você</p>
                    <p className="text-sm italic">"Gere citação ABNT para Silva (2024) sobre ética em IA"</p>
                  </div>
                  <div className="bg-primary/10 p-md rounded-xl border border-primary/25">
                    <p className="text-xs text-primary font-bold mb-xs">Thesius IA</p>
                    <p className="text-sm text-on-surface-variant">SILVA, M. A. A ética da inteligência artificial na educação superior. Rev. Bras. Educ., v. 12, n. 3, p. 45-62, 2024.</p>
                    <Button type="button" className="mt-sm text-primary font-label-sm hover:underline">Inserir no documento →</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Differentials */}
        <section className="py-xl px-md">
          <div className="max-w-container-max mx-auto">
            <p className="section-eyebrow text-center mb-sm reveal">Vantagens</p>
            <h2 className="font-headline-lg text-headline-lg text-on-surface text-center mb-xl reveal" style={{ transitionDelay: '0.08s' }}>Por que o Thesius?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
              {DIFFERENTIALS.map((d, i) => (
                <div key={d.title} className="thesius-card p-lg text-center reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="w-14 h-14 mx-auto mb-md rounded-2xl bg-primary/15 flex items-center justify-center">
                    <Icon name={d.icon} className="text-primary" size={28} />
                  </div>
                  <h4 className="font-headline-md text-on-surface mb-xs">{d.title}</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section className="py-xl px-md bg-surface-container-lowest">
          <div className="max-w-container-max mx-auto text-center">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-xl reveal">Do tema à entrega em 5 passos</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-md">
              {[
                { n: "01", t: "Projeto", d: "Defina tema, tipo e template universitário" },
                { n: "02", t: "Fontes", d: "Importe PDFs e organize referências" },
                { n: "03", t: "Escrita", d: "Editor + IA contextual por capítulo" },
                { n: "04", t: "Normas", d: "ABNT/APA automática em todo o doc" },
                { n: "05", t: "Exportar", d: "DOCX ou PDF pronto para entrega" },
              ].map((s) => (
                <div key={s.n} className="saas-step reveal" style={{ transitionDelay: `${Number(s.n) * 0.08}s` }}>
                  <span className="font-headline-md text-secondary">{s.n}</span>
                  <h5 className="font-label-md font-bold mt-sm">{s.t}</h5>
                  <p className="text-xs text-on-surface-variant mt-xs">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Architecture / Enterprise */}
        <section className="py-xl px-md">
          <div className="max-w-container-max mx-auto">
            <div className="rounded-3xl p-xl md:p-2xl relative overflow-hidden border border-primary/30 bg-gradient-to-br from-primary/25 via-surface-container-lowest to-surface-container-low shadow-gold reveal-scale">
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
              <div className="relative z-10 grid md:grid-cols-2 gap-xl">
                <div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface mb-md">Pronto para escalar</h2>
                  <p className="text-on-surface-variant font-body-md mb-lg max-w-md">SSO, multi-tenant, colaboração em tempo real, histórico de versões e monetização por assinatura.</p>
                  <Link to="/login" className="btn-primary inline-block font-label-md px-lg py-2.5 rounded-xl">Acessar workspace</Link>
                </div>
                <div className="grid grid-cols-2 gap-sm text-sm">
                  {["Autenticação SSO", "Multi-tenant", "Autosave na nuvem", "Painel institucional", "Integrações acadêmicas", "Segurança avançada", "Métricas acadêmicas", "API aberta"].map((item) => (
                    <div key={item} className="flex items-center gap-sm thesius-card !shadow-none px-md py-2.5 text-sm text-on-surface-variant">
                      <Icon name="check" className="text-primary shrink-0" size={18} /> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        {/* Testimonials */}
        <section className="py-xl px-md border-t border-white/[0.06]">
          <div className="max-w-container-max mx-auto">
            <p className="section-eyebrow text-center mb-sm reveal">Depoimentos</p>
            <h2 className="font-headline-lg text-headline-lg text-on-surface text-center mb-xl reveal" style={{ transitionDelay: '0.08s' }}>Quem já usa, recomenda</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              {[
                { name: "Lucas Mendes", role: "Mestrando em Computação · USP", text: "O Thesius substituiu Word, Mendeley e Grammarly de uma vez. A formatação ABNT automática me poupou semanas." },
                { name: "Ana Beatriz Souza", role: "Graduanda em Direito · UFMG", text: "A IA entende o contexto do meu TCC. As sugestões são acadêmicas de verdade, não genéricas." },
                { name: "Prof. Ricardo Lima", role: "Orientador · UNICAMP", text: "Recomendo para todos meus orientandos. A qualidade dos trabalhos entregues melhorou sensivelmente." },
              ].map((t, i) => (
                <div key={t.name} className="testimonial-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <span className="testimonial-quote" aria-hidden>\u201C</span>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-lg mt-6">{t.text}</p>
                  <div className="flex items-center gap-sm">
                    <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                      <Icon name="person" className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="font-label-md font-semibold text-on-surface">{t.name}</p>
                      <p className="text-[11px] text-on-surface-variant">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-xl px-md" id="pricing">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-2xl reveal">
              <p className="section-eyebrow mb-sm">Preços</p>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-sm">Planos para cada jornada</h2>
              <p className="font-body-md text-on-surface-variant">Monetização transparente. Comece grátis, evolua quando precisar.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
              <PlanCard plan={PLANS[0]} cycle="annual" />
              <PlanCard plan={PLANS[1]} cycle="annual" />
              <PlanCard plan={PLANS[2]} cycle="annual" />
              <PlanCard plan={PLANS[3]} cycle="annual" compact />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-md relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
          <div className="max-w-[900px] mx-auto text-center relative z-10 reveal">
            <h2 className="font-display-lg text-display-lg text-on-surface mb-md">Sua pesquisa merece um workspace à altura</h2>
            <p className="font-body-lg text-on-surface-variant mb-xl max-w-xl mx-auto">
              Junte-se a milhares de estudantes que centralizaram escrita, normas e IA em uma única plataforma.
            </p>
            <Link to="/login" className="btn-primary inline-block font-label-md px-2xl py-3.5 rounded-2xl">Criar conta grátis</Link>
          </div>
        </section>
      </main>

      <footer className="bg-surface-container-lowest border-t border-outline-variant/20 pt-xl pb-lg px-md">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-xl mb-xl">
            <div className="col-span-2">
              <span className="font-headline-md font-black text-primary block mb-md">Thesius</span>
              <p className="text-on-surface-variant max-w-xs text-sm">Plataforma acadêmica inteligente. Foco no conhecimento — automação no restante.</p>
            </div>
            {[
              { h: "Produto", items: ["Editor", "IA Acadêmica", "Referências", "Planos"] },
              { h: "Formatos", items: ["TCC", "Monografia", "Dissertação", "Artigo"] },
              { h: "Legal", items: ["Privacidade", "Termos", "Ética em IA"] },
            ].map((c) => (
              <div key={c.h}>
                <h5 className="font-label-md font-bold mb-md">{c.h}</h5>
                <ul className="space-y-sm text-sm text-on-surface-variant">
                  {c.items.map((i) => <li key={i}><a className="hover:text-secondary" href="#">{i}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-on-surface-variant text-center">© 2026 Thesius. Plataforma SaaS de produtividade acadêmica.</p>
        </div>
      </footer>
    </div>
  );
}


// Removed PricingCard as we now use PlanCard

function PricingCard({ tier, price, features, cta, highlight, priceXl = true }: {
  tier: string; price: string; features: string[]; cta: string; highlight?: "popular" | "dark"; priceXl?: boolean;
}) {
  const popular = highlight === "popular";
  const dark = highlight === "dark";
  return (
    <div className={`thesius-card p-lg flex flex-col h-full relative ${popular ? "pricing-popular scale-[1.02] z-10" : ""}`}>
      {popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-[10px] px-4 py-1 rounded-full font-bold uppercase tracking-wide">Mais popular</div>}
      <h3 className={`font-label-md font-bold uppercase tracking-wider mb-sm ${popular ? "text-primary" : "text-on-surface-variant"}`}>{tier}</h3>
      <div className="mb-lg">
        <span className={`${priceXl ? "text-4xl" : "text-3xl"} font-bold text-on-surface tabular-nums`}>{price}</span>
        {priceXl && <span className="text-on-surface-variant">/mês</span>}
      </div>
      <ul className="space-y-sm mb-xl flex-grow">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-xs text-sm">
            <Icon name="check_circle" className="text-primary shrink-0" size={20} /> {f}
          </li>
        ))}
      </ul>
      <Link to="/login" className={`w-full py-2.5 rounded-xl font-label-md text-center block transition-opacity ${popular || dark ? "btn-primary" : "btn-ghost"}`}>{cta}</Link>
    </div>
  );
}





