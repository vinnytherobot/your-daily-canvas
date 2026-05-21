import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Icon } from "../components/AppShell";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Thesius | Dashboard Principal" }] }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <AppShell>
      <div className="max-w-6xl mx-auto space-y-xl">
        <section className="flex flex-col md:flex-row justify-between items-end gap-lg">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary">Bem-vindo, Dr. Thorne</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Seus projetos acadêmicos estão 12% mais avançados esta semana.</p>
          </div>
          <div className="gradient-border-ai">
            <button className="gradient-border-inner px-lg py-sm font-label-md text-label-md flex items-center gap-sm text-secondary">
              <Icon name="auto_awesome" fill /> Ask AI Assistant
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
          {[
            { l: "Total de Palavras", v: "42.8k", t: "+2.4k", c: "text-secondary" },
            { l: "Citações Válidas", v: "158", t: "Apuradas", c: "text-on-tertiary-container" },
            { l: "Score ABNT", v: "94%", t: "2 Erros", c: "text-error" },
            { l: "Tempo de Pesquisa", v: "12h", t: "Esta semana", c: "text-on-surface-variant" },
          ].map((m) => (
            <div key={m.l} className="bg-surface-container-lowest p-lg rounded-xl academic-glow border border-outline-variant/10">
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-sm uppercase tracking-widest">{m.l}</p>
              <div className="flex items-baseline gap-xs">
                <h3 className="font-headline-lg text-headline-lg">{m.v}</h3>
                <span className={`${m.c} text-sm font-bold`}>{m.t}</span>
              </div>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          <div className="lg:col-span-2 space-y-lg">
            <div className="flex justify-between items-center">
              <h4 className="font-headline-md text-headline-md">Projetos Recentes</h4>
              <button className="text-secondary font-label-md text-label-md hover:underline">Ver todos</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <ProjectCard
                icon="article" iconBg="bg-secondary-fixed/30" iconColor="text-secondary"
                tag="Tese de Doutorado" title="Neurociência Aplicada ao Aprendizado de Máquina"
                desc="Exploração das redes neurais biológicas como fundamento para arquiteturas de transformadores modernos."
                progress={65} barColor="bg-secondary" edited="Editado há 2h" collaborators={["AT", "JS"]} />
              <ProjectCard
                icon="history_edu" iconBg="bg-on-tertiary-container/10" iconColor="text-on-tertiary-container"
                tag="Artigo Científico" title="Impacto da IA na Ética Acadêmica Contemporânea"
                desc="Uma revisão sistemática sobre as novas fronteiras da autoria intelectual em tempos de modelos LLM."
                progress={88} barColor="bg-on-tertiary-container" edited="Editado ontem" collaborators={["AT"]} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
              {[
                { icon: "upload_file", t: "Importar PDF", d: "Extrair citações" },
                { icon: "auto_stories", t: "Gerar Bibliografia", d: "Formato ABNT/APA" },
                { icon: "search_check", t: "Checar Plágio", d: "Verificação Global" },
              ].map((a) => (
                <button key={a.t} className="flex items-center gap-md p-md rounded-xl bg-surface-container-low hover:bg-surface-variant transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Icon name={a.icon} />
                  </div>
                  <div className="text-left">
                    <p className="font-label-md text-label-md font-bold">{a.t}</p>
                    <p className="text-xs text-on-surface-variant">{a.d}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-lg">
            <div className="bg-surface-container-lowest p-lg rounded-xl academic-glow border border-outline-variant/10 h-fit">
              <h4 className="font-label-md text-label-md font-bold mb-lg">Atividade Recente</h4>
              <div className="space-y-md">
                {[
                  { c: "bg-secondary", t: "Citação adicionada", s: "Artigo: Ética em IA • Há 12m" },
                  { c: "bg-on-tertiary-container", t: "Exportação concluída", s: "Tese_V_Final.pdf • Há 1h" },
                  { c: "bg-error", t: "Erro de formatação", s: "Citação #42 inválida • Há 3h" },
                ].map((a, i, arr) => (
                  <div key={a.t} className="flex gap-md">
                    <div className="relative">
                      <div className={`w-2 h-2 mt-2 ${a.c} rounded-full`}></div>
                      {i < arr.length - 1 && <div className="absolute top-4 left-[3px] w-[1px] h-full bg-outline-variant/30"></div>}
                    </div>
                    <div>
                      <p className="text-sm font-label-md">{a.t}</p>
                      <p className="text-[11px] text-on-surface-variant">{a.s}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-lg text-xs text-outline py-xs hover:text-primary">Limpar histórico</button>
            </div>

            <div className="glass-panel p-lg rounded-xl border border-outline-variant/10 academic-glow">
              <div className="flex items-center gap-sm mb-md">
                <Icon name="bolt" className="text-on-tertiary-container" />
                <h4 className="font-label-md text-label-md font-bold">Insights do Assistente</h4>
              </div>
              <p className="text-sm text-on-surface-variant mb-lg leading-relaxed">Detectei que a seção de "Metodologia" está com densidade de citações abaixo da média acadêmica para teses de doutorado.</p>
              <div className="bg-surface-container-high/50 p-md rounded-lg mb-lg">
                <p className="text-xs font-medium text-primary">Sugestão:</p>
                <p className="text-xs text-on-surface-variant italic">"Recomendo incluir referências a Smith & Jones (2022) para embasamento estatístico."</p>
              </div>
              <button className="w-full bg-tertiary text-on-tertiary py-sm rounded-lg font-label-sm text-label-sm active:scale-95 transition-transform">Aplicar Sugestão</button>
            </div>

            <div className="bg-[#F9FAFB] p-md rounded-lg border border-dashed border-outline-variant/30">
              <div className="flex justify-between items-center mb-sm">
                <span className="text-[10px] font-bold text-outline">CITAÇÃO EM DESTAQUE</span>
                <Icon name="content_copy" className="text-sm text-outline" />
              </div>
              <p className="text-xs italic text-on-surface-variant">"A consciência não é um processo singular, mas uma sinfonia de oscilações neurais sincronizadas."</p>
              <p className="text-[10px] mt-sm font-bold">— Damásio, A. (2018)</p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function ProjectCard({ icon, iconBg, iconColor, tag, title, desc, progress, barColor, edited, collaborators }: {
  icon: string; iconBg: string; iconColor: string; tag: string; title: string; desc: string;
  progress: number; barColor: string; edited: string; collaborators: string[];
}) {
  return (
    <div className="group bg-surface-container-lowest p-lg rounded-xl academic-glow border border-outline-variant/10 hover:border-secondary/30 transition-all cursor-pointer">
      <div className="flex justify-between items-start mb-lg">
        <div className={`p-sm ${iconBg} rounded-lg`}><Icon name={icon} className={iconColor} /></div>
        <span className="px-sm py-xs bg-surface-container-high rounded text-[10px] font-bold uppercase tracking-tighter">{tag}</span>
      </div>
      <h5 className="font-headline-md text-[18px] leading-tight mb-xs group-hover:text-secondary transition-colors">{title}</h5>
      <p className="font-body-md text-sm text-on-surface-variant mb-xl line-clamp-2">{desc}</p>
      <div className="space-y-sm">
        <div className="flex justify-between text-xs font-label-md">
          <span className="text-on-surface-variant">Progresso</span>
          <span className="font-bold">{progress}%</span>
        </div>
        <div className="w-full bg-surface-variant h-1 rounded-full overflow-hidden">
          <div className={`${barColor} h-full rounded-full`} style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <div className="mt-md pt-md border-t border-outline-variant/10 flex justify-between items-center">
        <span className="text-xs text-outline italic">{edited}</span>
        <div className="flex -space-x-2">
          {collaborators.map((c, i) => (
            <div key={i} className={`w-6 h-6 rounded-full border-2 border-surface-container-lowest ${i === 0 ? "bg-primary-fixed" : "bg-secondary-fixed"} flex items-center justify-center text-[10px] font-bold`}>{c}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
