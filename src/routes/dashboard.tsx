import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Icon } from "../components/AppShell";
import { PageHeader } from "../components/PageHeader";
import { StatCard } from "../components/StatCard";
import { requireAuthOrRedirect } from "../lib/auth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: ({ location }) => {
    requireAuthOrRedirect(location.pathname);
  },
  head: () => ({ meta: [{ title: "Thesius | Meus Projetos" }] }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <AppShell>
      <div className="space-y-xl">
        <PageHeader
          eyebrow="Plano Pro · Renova em 12 dias"
          title="Olá, Marina"
          description="Seus projetos avançaram 18% esta semana. Continue no capítulo de Metodologia."
          actions={
            <>
              <Link to="/library" className="btn-ghost px-md py-2.5 font-label-md flex items-center gap-sm">
                <Icon name="library_books" size={20} /> Referências
              </Link>
              <Link to="/workspace" className="btn-primary px-lg py-2.5 font-label-md flex items-center gap-sm">
                <Icon name="edit_note" fill size={20} /> Abrir editor
              </Link>
            </>
          }
        />

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-gutter">
          <div className="animate-fade-in-up reveal-delay-1">
            <StatCard label="Palavras escritas" value="12.4k" hint="+1.8k" icon="article" accent="gold" />
          </div>
          <div className="animate-fade-in-up reveal-delay-2">
            <StatCard label="Score ABNT" value="96%" hint="1 aviso" icon="verified" accent="success" />
          </div>
          <div className="animate-fade-in-up reveal-delay-3">
            <StatCard label="Referências" value="47" hint="Válidas" icon="menu_book" accent="gold" />
          </div>
          <div className="animate-fade-in-up reveal-delay-4">
            <StatCard label="Tokens IA" value="32k" hint="de 50k" icon="auto_awesome" accent="muted" />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          <div className="lg:col-span-2 space-y-lg">
            <div className="flex justify-between items-center">
              <h2 className="font-headline-md text-headline-md text-on-surface">Meus projetos</h2>
              <Button type="button" variant="ghost" className="text-primary font-label-md hover:underline flex items-center gap-xs">
                <Icon name="add" size={18} /> Novo projeto
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="animate-fade-in-up reveal-delay-2">
                <ProjectCard
                  icon="school"
                  tag="TCC"
                  status="Em andamento"
                  title="Impacto da IA na produtividade acadêmica"
                  desc="Capítulo 2 (Metodologia) em revisão pela IA."
                  progress={72}
                  edited="Há 2h"
                />
              </div>
              <div className="animate-fade-in-up reveal-delay-3">
                <ProjectCard
                  icon="article"
                  tag="Artigo"
                  status="Qualis B1"
                  title="Ética e autoria em modelos generativos"
                  desc="Introdução e referências concluídas."
                  progress={45}
                  edited="Ontem"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
              {[
                { icon: "upload_file", t: "Importar DOCX/PDF", d: "Autoformatação" },
                { icon: "format_list_bulleted", t: "Aplicar ABNT", d: "Um clique" },
                { icon: "download", t: "Exportar", d: "DOCX ou PDF" },
              ].map((a, i) => (
                <Link key={a.t} to="/workspace" className={`thesius-card p-md flex items-center gap-md group reveal-delay-${i + 1} antigravity-card-hover`}>
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <Icon name={a.icon} size={22} />
                  </div>
                  <div>
                    <p className="font-label-md font-semibold text-on-surface">{a.t}</p>
                    <p className="text-xs text-on-surface-variant">{a.d}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-md">
            <div className="thesius-card p-lg reveal-delay-1">
              <h3 className="font-label-md font-semibold text-on-surface mb-lg flex items-center gap-sm">
                <Icon name="schedule" size={20} className="text-primary" /> Atividade recente
              </h3>
              <ul className="space-y-md">
                {[
                  { c: "bg-primary", t: "ABNT aplicada", s: "TCC IA · 12 min" },
                  { c: "bg-emerald-500", t: "PDF exportado", s: "artigo-etica-v2.pdf" },
                  { c: "bg-primary/60", t: "Citação gerada", s: "Silva (2024)" },
                ].map((a) => (
                  <li key={a.t} className="flex gap-md items-start">
                    <span className={`w-2 h-2 rounded-full mt-2 shrink-0 ${a.c}`} />
                    <div>
                      <p className="text-sm font-medium text-on-surface">{a.t}</p>
                      <p className="text-xs text-on-surface-variant">{a.s}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="thesius-card p-lg border-primary/20 reveal-delay-2 floating-element">
              <div className="flex items-center gap-sm mb-md">
                <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
                  <Icon name="auto_awesome" className="text-primary" fill size={20} />
                </div>
                <h3 className="font-label-md font-semibold">Copiloto IA</h3>
              </div>
              <p className="text-sm text-on-surface-variant mb-lg leading-relaxed">
                A Metodologia precisa de mais citações. Quer sugestões bibliográficas?
              </p>
              <Link to="/workspace" className="btn-primary block w-full text-center py-2.5 font-label-sm">
                Abrir no editor
              </Link>
            </div>

            <div className="rounded-2xl p-lg bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-primary/25 reveal-delay-3 floating-element-delayed">
              <p className="section-eyebrow mb-xs">Upgrade</p>
              <p className="text-sm text-on-surface mb-md">IA ilimitada e colaboração em tempo real.</p>
              <Button type="button" variant="ghost" className="text-sm font-semibold text-primary hover:underline">
                Ver plano Pro →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function ProjectCard({
  icon,
  tag,
  status,
  title,
  desc,
  progress,
  edited,
}: {
  icon: string;
  tag: string;
  status: string;
  title: string;
  desc: string;
  progress: number;
  edited: string;
}) {
  return (
    <Link to="/workspace" className="thesius-card p-lg block group antigravity-card-hover">
      <div className="flex justify-between items-start mb-md">
        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
          <Icon name={icon} size={24} />
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{tag}</span>
          <p className="text-[10px] text-on-surface-variant">{status}</p>
        </div>
      </div>
      <h3 className="font-headline-md text-[1.125rem] leading-snug text-on-surface group-hover:text-primary transition-colors mb-xs">
        {title}
      </h3>
      <p className="text-sm text-on-surface-variant mb-lg line-clamp-2">{desc}</p>
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-on-surface-variant">Progresso</span>
          <span className="font-semibold text-primary">{progress}%</span>
        </div>
        <div className="h-1.5 bg-surface-variant rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <p className="mt-md pt-md border-t border-white/[0.06] text-xs text-on-surface-variant italic">{edited}</p>
    </Link>
  );
}




