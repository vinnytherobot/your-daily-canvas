import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Thesius | O Futuro da Escrita Acadêmica" },
      { name: "description", content: "Escreva, organize, formate e exporte trabalhos acadêmicos em um workspace inteligente." },
    ],
  }),
  component: Landing,
});

const Icon = ({ name, className = "" }: { name: string; className?: string }) => (
  <span className={`material-symbols-outlined ${className}`}>{name}</span>
);

function Landing() {
  return (
    <div className="font-body-md text-on-surface">
      <header className="top-0 sticky z-40 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/20 flex justify-between items-center w-full px-lg py-sm h-16">
        <div className="flex items-center gap-md">
          <span className="font-headline-md text-headline-md font-black text-primary">Thesius</span>
          <nav className="hidden md:flex gap-lg ml-xl">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#features">Funcionalidades</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#types">Formatos</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#pricing">Preços</a>
          </nav>
        </div>
        <div className="flex items-center gap-md">
          <Link to="/dashboard" className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary px-md py-sm">Entrar</Link>
          <Link to="/dashboard" className="bg-primary text-on-primary font-label-sm text-label-sm px-lg py-sm rounded-lg hover:opacity-90 transition-opacity">Começar grátis</Link>
        </div>
      </header>
      <main>
        {/* Hero */}
        <section className="relative pt-xl pb-32 px-md overflow-hidden">
          <div className="max-w-container-max mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-sm bg-surface-container-high px-md py-xs rounded-full mb-lg ambient-shadow">
              <Icon name="auto_awesome" className="text-[16px] text-secondary" />
              <span className="font-label-sm text-label-sm text-on-surface-variant">A nova era da pesquisa acadêmica</span>
            </div>
            <h1 className="font-display-lg text-display-lg text-primary max-w-[800px] mx-auto mb-md leading-tight">
              O Word 2.0 para escrever seu <span className="text-secondary">TCC com IA</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[650px] mx-auto mb-xl">
              Escreva, organize, formate e exporte trabalhos acadêmicos em um workspace inteligente. Onde o rigor acadêmico encontra a eficiência da IA.
            </p>
            <div className="flex flex-col sm:flex-row gap-md justify-center mb-xl">
              <Link to="/dashboard" className="bg-primary text-on-primary font-headline-md text-headline-md px-xl py-md rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg">Começar grátis</Link>
              <Link to="/workspace" className="bg-surface-container-lowest border border-outline-variant text-primary font-headline-md text-headline-md px-xl py-md rounded-xl hover:bg-surface-container-low transition-colors ambient-shadow">Testar demonstração</Link>
            </div>
            <div className="relative mt-xl max-w-[1100px] mx-auto">
              <div className="surface-glass rounded-xl p-md ambient-shadow border border-white/40">
                <img alt="Thesius Workspace Editor" className="rounded-lg w-full h-auto object-cover border border-outline-variant/30"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYAJXmVh2ze0W5RF0XvhP0U_zgzHh08k24DneqyBi_dehg0aXsvwg1Ia6ipghboShR4AKGQ0OicrDCgsl3nvbg8sDeMfOKt_hd1vQwb0aAvZJmiqdta05XNIj3asms5UFetkoUkSuyMbp2SQZysiVNenfPQkkVislLG0NoZ90EtZe6D8UKu9UBoGjX_3kty6gt36CKhREH_ZXUNfNU2aduYeEdmfO1GtCucb_wG_NshwrARbgI5lO6PthCzOmHYyrMPYDR0OBZTxMB" />
              </div>
              <div className="absolute -top-12 -right-12 hidden lg:block surface-glass p-md rounded-xl ambient-shadow w-48 text-left">
                <Icon name="verified" className="text-secondary block mb-xs" />
                <p className="font-label-sm text-label-sm font-bold">ABNT Automática</p>
                <p className="text-[10px] text-on-surface-variant">Todas as normas aplicadas em 1 clique.</p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-40">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary-fixed-dim blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-tertiary-fixed blur-[100px] rounded-full"></div>
          </div>
        </section>

        {/* Features */}
        <section className="py-xl px-md bg-surface-container-lowest" id="features">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-xl">
              <h2 className="font-headline-lg text-headline-lg text-primary mb-sm">Ferramentas de precisão para acadêmicos</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Tudo o que você precisa para sair da página em branco até a aprovação.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
              <div className="md:col-span-8 bg-surface-container-low rounded-3xl p-lg flex flex-col justify-between overflow-hidden relative group">
                <div className="relative z-10">
                  <Icon name="edit_note" className="text-primary text-3xl mb-md" />
                  <h3 className="font-headline-lg text-headline-lg mb-sm">Editor Acadêmico IA</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-md">O copiloto que entende seu tema. Sugestões de parágrafos, expansão de argumentos e correção semântica focada em rigor científico.</p>
                </div>
                <div className="mt-lg relative group-hover:translate-y-[-10px] transition-transform duration-500">
                  <img alt="Editor IA" className="rounded-xl ambient-shadow w-full h-48 object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh7V-hwIRy5e2mOXkaxpTrSKBAJtcAQs_L0cgcVIYhbDDoCZP_Eg9a7vH2n0VD-OzRDAOMT-GAXDE00ZlCI9RKu0QnvMuGePqR0AU03FQTQFmyVkvRhxtZp5rAOyfo4buFUWVvCpz_IpYpQKOCHCDfsZFHkR-TrfAgKrajmrW3qAtDsgng5YjcnyDecnq7CSE5m8k1C63OjOc1jd3w-AhWFhu5cPPUUYnqHOjCozHSqmpwq80bYTNikrhumXTm7wcYi6dFA8h5E7bM" />
                </div>
              </div>
              <div className="md:col-span-4 bg-primary text-on-primary rounded-3xl p-lg flex flex-col justify-between">
                <div>
                  <Icon name="format_list_bulleted" className="text-secondary-fixed-dim text-3xl mb-md" />
                  <h3 className="font-headline-md text-headline-md mb-sm">Formatação Automática</h3>
                  <p className="font-body-md text-body-md text-primary-fixed-dim">Esqueça a dor de cabeça da ABNT ou APA. O Thesius aplica estilos instantaneamente em todo o documento.</p>
                </div>
                <div className="bg-primary-container p-md rounded-xl mt-md">
                  <div className="flex gap-sm mb-xs"><div className="w-full h-2 bg-on-primary-fixed-variant rounded"></div></div>
                  <div className="flex gap-sm">
                    <div className="w-2/3 h-2 bg-on-primary-fixed-variant rounded"></div>
                    <div className="w-1/3 h-2 bg-secondary rounded"></div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-4 bg-surface-container-high rounded-3xl p-lg">
                <Icon name="library_books" className="text-primary text-3xl mb-md" />
                <h3 className="font-headline-md text-headline-md mb-sm">Gestor de Fontes</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Importe PDFs, extraia citações e gere bibliografias completas automaticamente enquanto você escreve.</p>
              </div>
              <div className="md:col-span-8 ai-gradient-border rounded-3xl p-lg flex flex-col md:flex-row gap-lg items-center">
                <div className="flex-1">
                  <Icon name="psychology" className="text-on-tertiary-container text-3xl mb-md" />
                  <h3 className="font-headline-lg text-headline-lg mb-sm">IA Contextual</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Converse com seu próprio banco de referências. Faça perguntas aos seus PDFs e receba respostas com citação direta da página.</p>
                </div>
                <div className="flex-1 w-full">
                  <div className="bg-surface-container-low p-md rounded-xl space-y-sm">
                    <div className="bg-surface-container-lowest p-sm rounded-lg border border-outline-variant/30 font-label-sm text-label-sm italic text-on-surface-variant">"O que Silva (2022) diz sobre ética em IA?"</div>
                    <div className="bg-secondary/10 p-sm rounded-lg border border-secondary/20 font-label-sm text-label-sm">"Silva argumenta que a transparência é o pilar central..."</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Types */}
        <section className="py-xl px-md" id="types">
          <div className="max-w-container-max mx-auto text-center mb-xl">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-sm">Feito para qualquer desafio acadêmico</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-lg mt-xl">
              {[
                { icon: "school", title: "TCC & Monografia", desc: "Estruturas prontas para graduação com templates específicos por universidade." },
                { icon: "article", title: "Artigos Científicos", desc: "Foco em submissão para periódicos nacionais e internacionais (Qualis/CAPES)." },
                { icon: "history_edu", title: "Teses & Dissertações", desc: "Suporte para projetos de longa duração com gestão complexa de capítulos e referências." },
              ].map((t) => (
                <div key={t.title} className="p-lg bg-surface-container-lowest rounded-2xl ambient-shadow hover:translate-y-[-4px] transition-transform">
                  <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-md">
                    <Icon name={t.icon} className="text-primary" />
                  </div>
                  <h4 className="font-headline-md text-headline-md mb-xs">{t.title}</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How */}
        <section className="py-xl px-md bg-surface-container-low">
          <div className="max-w-container-max mx-auto">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-xl text-center">Do rascunho à entrega em 5 passos</h2>
            <div className="flex flex-col md:flex-row justify-between items-start gap-lg relative">
              <div className="hidden md:block absolute top-10 left-0 w-full h-[2px] bg-outline-variant -z-0"></div>
              {[
                { n: "1", t: "Definição", d: "Insira seu tema e objetivos de pesquisa." },
                { n: "2", t: "Curadoria", d: "A IA busca e organiza fontes relevantes." },
                { n: "3", t: "Escrita", d: "Escreva com auxílio da IA contextual." },
                { n: "4", t: "Normatização", d: "Formate citações em ABNT/APA/Vancouver." },
                { n: "5", t: "Exportação", d: "Baixe seu trabalho pronto em PDF ou Word." },
              ].map((s) => (
                <div key={s.n} className="flex-1 flex flex-col items-center text-center relative z-10 group">
                  <div className="w-20 h-20 bg-surface-container-lowest rounded-full border-4 border-surface-container-low flex items-center justify-center mb-md ambient-shadow group-hover:border-secondary transition-colors">
                    <span className="font-headline-md text-headline-md text-primary">{s.n}</span>
                  </div>
                  <h5 className="font-label-md text-label-md font-bold mb-xs">{s.t}</h5>
                  <p className="text-xs text-on-surface-variant">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-xl px-md" id="pricing">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-xl">
              <h2 className="font-headline-lg text-headline-lg text-primary mb-sm">Preços simples e transparentes</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Escolha o plano que melhor se adapta à sua jornada.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-md">
              <PricingCard tier="Free" price="R$ 0" features={["1 Projeto acadêmico", "Editor padrão", "Exportação básica"]} cta="Começar grátis" />
              <PricingCard tier="Student" price="R$ 29" features={["Projetos ilimitados", "Assistente IA (50k tokens)", "Normas ABNT/APA"]} cta="Assinar agora" highlight="dark" />
              <PricingCard tier="Pro" price="R$ 59" features={["IA Sem Limites", "Consultoria de referências", "Colaboração em tempo real", "Exportação Word/Latex"]} cta="Assinar agora" highlight="popular" />
              <PricingCard tier="Institutional" price="Sob consulta" features={["SSO Integration", "Painel administrativo", "Treinamento de equipe"]} cta="Falar com vendas" priceXl={false} />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-md">
          <div className="max-w-[800px] mx-auto bg-primary rounded-3xl p-xl text-center text-on-primary relative overflow-hidden">
            <h2 className="font-headline-lg text-headline-lg mb-md relative z-10">Pronto para transformar sua pesquisa?</h2>
            <p className="font-body-md text-body-md text-primary-fixed-dim mb-xl relative z-10">Junte-se a mais de 10.000 pesquisadores que já otimizaram seus trabalhos acadêmicos com o Thesius.</p>
            <div className="flex flex-col sm:flex-row gap-md justify-center relative z-10">
              <Link to="/dashboard" className="bg-on-primary text-primary font-headline-md text-headline-md px-xl py-md rounded-xl hover:scale-105 transition-transform inline-block">Começar Agora Grátis</Link>
            </div>
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-secondary opacity-20 blur-[60px] rounded-full"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-tertiary-container opacity-40 blur-[60px] rounded-full"></div>
          </div>
        </section>
      </main>

      <footer className="bg-surface-container-lowest border-t border-outline-variant/20 pt-xl pb-lg px-md">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-xl mb-xl">
            <div className="col-span-2">
              <span className="font-headline-md text-headline-md font-black text-primary block mb-md">Thesius</span>
              <p className="text-on-surface-variant max-w-xs text-sm">O workspace inteligente para a nova geração de acadêmicos. Foco no conhecimento, automação no restante.</p>
            </div>
            {[
              { h: "Produto", items: ["Funcionalidades", "Templates", "IA Acadêmica", "Preços"] },
              { h: "Recursos", items: ["Blog", "Guias de Normas", "Ajuda", "API"] },
              { h: "Legal", items: ["Privacidade", "Termos", "Ética em IA"] },
            ].map((c) => (
              <div key={c.h}>
                <h5 className="font-label-md text-label-md font-bold mb-md">{c.h}</h5>
                <ul className="space-y-sm text-sm text-on-surface-variant">
                  {c.items.map((i) => <li key={i}><a className="hover:text-secondary" href="#">{i}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-lg border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-md">
            <p className="text-[12px] text-on-surface-variant">© 2026 Thesius AI Research. Todos os direitos reservados.</p>
            <div className="flex gap-md">
              <a className="text-on-surface-variant hover:text-secondary" href="#"><Icon name="public" /></a>
              <a className="text-on-surface-variant hover:text-secondary" href="#"><Icon name="alternate_email" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PricingCard({ tier, price, features, cta, highlight, priceXl = true }: {
  tier: string; price: string; features: string[]; cta: string; highlight?: "popular" | "dark"; priceXl?: boolean;
}) {
  const popular = highlight === "popular";
  const dark = highlight === "dark";
  return (
    <div className={`bg-surface-container-lowest p-lg rounded-2xl flex flex-col ${popular ? "border-2 border-secondary shadow-xl relative scale-105 z-10" : "border border-outline-variant/30"}`}>
      {popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-on-secondary text-[10px] px-md py-1 rounded-full font-bold uppercase">Mais Popular</div>}
      <h3 className={`font-label-md text-label-md font-bold uppercase tracking-wider mb-sm ${popular ? "text-secondary" : "text-on-surface-variant"}`}>{tier}</h3>
      <div className="mb-lg">
        <span className={`${priceXl ? "text-4xl" : "text-3xl"} font-bold text-primary`}>{price}</span>
        {priceXl && <span className="text-on-surface-variant">/mês</span>}
      </div>
      <ul className="space-y-sm mb-xl flex-grow">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-xs text-sm">
            <Icon name="check_circle" className="text-secondary text-lg" /> {f}
          </li>
        ))}
      </ul>
      <button className={`w-full py-sm rounded-lg font-label-md transition-opacity ${popular ? "bg-secondary text-on-secondary hover:opacity-90" : dark ? "bg-primary text-on-primary hover:opacity-90" : "border border-outline-variant hover:bg-surface-container-low"}`}>{cta}</button>
    </div>
  );
}
