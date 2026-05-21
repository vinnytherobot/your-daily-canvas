import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Icon } from "../components/AppShell";

export const Route = createFileRoute("/advisor")({
  head: () => ({ meta: [{ title: "Thesius | Painel do Orientador" }] }),
  component: Advisor,
});

const students = [
  {
    name: "Beatriz Vasconcelos",
    level: "Doutorado em Ciência da Computação",
    levelClass: "text-secondary-container bg-secondary-container/10",
    topic: "Algoritmos de IA Generativa para Revisão por Pares Acadêmica",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwBmia9bMH5hNQbeXTDcDDYPvEXC502GU9zvDs6DiHQjeg4yHgjZogc8zXHtlBfY7jQUcVZmYCf5U4Vavd2ejkp-1O4sXw12XjGGze_i0ekWf_lFsgQR5zZ361cv2d54_cBaEUn7AvXX92HyjEecS2DAg8SlxX9xl8ECgST1YhLJ5crUm8go55l2MyWEwzp7B8XArDjRXpe21NoITPdFh6IuElNJruucmWEsYTiOIQGQmkh5NTQzjlNeh5ljKyqcfArycoEpimS9tS",
    progress: 85, progressColor: "bg-secondary", progressTextColor: "text-secondary",
    chapters: [
      { icon: "check_circle", t: "Fundamentação", s: "Concluído em 12/05", style: "bg-surface-container-lowest border-outline-variant/10" },
      { icon: "history_edu", t: "Metodologia", s: "Aguardando Revisão", style: "bg-secondary/5 border-secondary/20", textHighlight: true },
    ],
    aiNote: { bg: "bg-tertiary-fixed/30 border-tertiary-fixed", text: "text-on-tertiary-fixed-variant", icon: "psychology", msg: "Thesius AI detectou 3 possíveis inconsistências nas referências bibliográficas do Cap. 3." },
    primaryBtn: { icon: "rate_review", label: "Revisar" },
    secondaryIcon: "chat_bubble",
    lastAccess: "Último acesso: há 14 minutos",
  },
  {
    name: "Henrique Almeida",
    level: "Mestrado em Engenharia Civil",
    levelClass: "text-on-tertiary-container bg-tertiary-container/10",
    topic: "Durabilidade de Estruturas de Concreto em Ambientes Litorâneos",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuACFp7MNWZDutKRQCmSdD05IXwklDAIOAzlagyjnybpQlGbMjUsy9KYejie-bV8prcXGdkm8Bb5ccf1EnQlTiLoaF4mhHzqQNky-TK9XKVdxCjEnQvp04fP0rBnZ_-_jRZx-kvA6IZMGW_x-aHn8uz5J63_mwHpoUPiYkPmNEneT4dlPrOdIk5HF1oPKbeL3Poarw46h_cVQP2EF1KNutLMK4m09w8R32TnDoyPQfJvmUz-rqxAGtE0NtFaJA73komagkhFf0-1z19H",
    progress: 42, progressColor: "bg-error", progressTextColor: "text-error",
    chapters: [
      { icon: "check_circle", t: "Introdução", s: "Concluído em 04/04", style: "bg-surface-container-lowest border-outline-variant/10" },
      { icon: "pending", t: "Análise de Dados", s: "Previsto para Junho", style: "bg-surface-container-lowest border-outline-variant/10 opacity-50" },
    ],
    aiNote: { bg: "bg-error-container/10 border-error-container/20", text: "text-on-error-container", icon: "warning", msg: "Inativo por mais de 15 dias. Sugerido agendar reunião de acompanhamento." },
    primaryBtn: { icon: "calendar_month", label: "Agendar", style: "bg-surface-container-highest text-primary hover:bg-surface-variant" },
    secondaryIcon: "mail",
    lastAccess: "Último acesso: há 18 dias",
  },
];

function Advisor() {
  return (
    <AppShell user={{ name: "Dr. Ricardo Silva", role: "Full Professor", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuyJSJ3HzMHtqoYPF6WBTkFiw4F5IYTYnKl8IO4QeM1ov907dwKZMnViN5hucVL07oh3DPMfTp8NEOEdDWJUzqY2O-kSgmAM-_ACBPXFjwfd5YPy1OpiLmW2NjdIs58kKyS5xxp8se8HU75piPQeIJ9SDCs-h59HcyP0Ivc1NSSzSv-rp7SRPkBT7h6fn60keoP7zA9o78T7jkZemBW7-uFDe6_VNgoDWLV5kwp7WxLV9DwkRqUiy4k6W5D6B9D59_Y-7w_cjshtAl" }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-lg flex justify-between items-end">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">Painel do Orientador</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">Gerencie seus orientandos e acompanhe o progresso acadêmico em tempo real.</p>
          </div>
          <div className="flex gap-sm">
            <button className="flex items-center gap-sm px-md py-sm bg-surface-container-high rounded-lg font-label-md text-label-md hover:bg-surface-variant">
              <Icon name="filter_list" /> Filtrar Status
            </button>
            <button className="flex items-center gap-sm px-md py-sm bg-primary text-on-primary rounded-lg font-label-md text-label-md shadow-sm hover:opacity-90">
              <Icon name="export_notes" /> Relatório Semestral
            </button>
          </div>
        </div>

        <div className="bento-grid mb-lg">
          {[
            { i: "groups", l: "Total de Alunos", v: "14", iconBg: "bg-secondary/10 text-secondary" },
            { i: "pending_actions", l: "Revisões Pendentes", v: "06", iconBg: "bg-error-container/20 text-error" },
            { i: "auto_awesome", l: "Média de Progresso", v: "78%", iconBg: "bg-tertiary-fixed text-on-tertiary-fixed-variant" },
          ].map((m) => (
            <div key={m.l} className="col-span-12 md:col-span-4 surface_glass p-lg rounded-xl flex items-center gap-lg">
              <div className={`w-14 h-14 ${m.iconBg} flex items-center justify-center rounded-xl`}>
                <Icon name={m.i} className="text-4xl" />
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{m.l}</p>
                <p className="font-headline-md text-headline-md text-primary">{m.v}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-md">
          <h3 className="font-headline-md text-headline-md text-primary flex items-center gap-md">
            Orientandos em Atividade
            <span className="px-sm py-0.5 bg-surface-container-high rounded text-label-sm font-bold">12 Ativos</span>
          </h3>
          {students.map((s) => (
            <div key={s.name} className="group bg-surface-container-lowest rounded-xl border border-outline-variant/10 hover:border-secondary/30 hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="p-lg md:w-1/3 border-b md:border-b-0 md:border-r border-outline-variant/10">
                  <div className="flex items-start gap-md mb-md">
                    <img alt="" className="w-14 h-14 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src={s.avatar} />
                    <div>
                      <h4 className="font-headline-md text-headline-md text-primary leading-tight">{s.name}</h4>
                      <p className={`font-label-sm text-label-sm px-2 py-0.5 rounded inline-block mt-1 ${s.levelClass}`}>{s.level}</p>
                    </div>
                  </div>
                  <div className="space-y-sm">
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-tighter">Tema da Pesquisa</p>
                    <p className="font-body-md text-body-md font-semibold text-primary">{s.topic}</p>
                  </div>
                </div>
                <div className="p-lg md:w-2/5 bg-surface-container-low/30">
                  <div className="flex justify-between items-end mb-sm">
                    <span className="font-label-md text-label-md font-bold text-primary">Progresso Geral</span>
                    <span className={`font-label-sm text-label-sm font-bold ${s.progressTextColor}`}>{s.progress}%</span>
                  </div>
                  <div className="w-full bg-surface-variant rounded-full h-2 mb-lg">
                    <div className={`${s.progressColor} h-2 rounded-full`} style={{ width: `${s.progress}%` }}></div>
                  </div>
                  <div className="grid grid-cols-2 gap-md">
                    {s.chapters.map((c) => (
                      <div key={c.t} className={`p-sm rounded-lg border ${c.style}`}>
                        <div className="flex items-center gap-sm mb-xs">
                          <Icon name={c.icon} className={`text-sm ${c.textHighlight ? "text-secondary" : "text-secondary"}`} />
                          <span className={`font-label-sm text-label-sm ${c.textHighlight ? "font-bold" : ""}`}>{c.t}</span>
                        </div>
                        <p className={`text-[10px] ${c.textHighlight ? "text-secondary" : "text-on-surface-variant"}`}>{c.s}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-lg md:w-1/4 flex flex-col justify-between">
                  <div className="space-y-md">
                    <div className={`flex items-start gap-sm p-sm rounded-lg border ${s.aiNote.bg}`}>
                      <span className={`material-symbols-outlined text-md ${s.aiNote.text}`}>{s.aiNote.icon}</span>
                      <p className={`text-[12px] leading-tight ${s.aiNote.text}`}>{s.aiNote.msg}</p>
                    </div>
                    <div className="flex gap-sm">
                      <button className={`flex-1 py-sm rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-xs ${s.primaryBtn.style ?? "bg-primary text-on-primary hover:bg-on-surface"}`}>
                        <Icon name={s.primaryBtn.icon} className="text-sm" /> {s.primaryBtn.label}
                      </button>
                      <button className="p-sm border border-outline-variant rounded-lg hover:bg-surface-variant">
                        <Icon name={s.secondaryIcon} className="text-on-surface-variant" />
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-on-surface-variant text-right mt-md">{s.lastAccess}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-xl grid grid-cols-12 gap-lg">
          <div className="col-span-12 lg:col-span-8">
            <div className="surface_glass rounded-xl p-lg border border-outline-variant/10">
              <div className="flex justify-between items-center mb-lg">
                <h4 className="font-headline-md text-headline-md text-primary">Fila de Revisão Prioritária</h4>
                <span className="text-label-sm font-bold text-secondary cursor-pointer hover:underline">Ver todas (6)</span>
              </div>
              <div className="space-y-md">
                {[
                  { c: "bg-secondary", t: "Capítulo 4: Discussão de Resultados", a: "Beatriz Vasconcelos", d: "Enviado ontem às 23:45 • Documento em PDF • 4.2 MB" },
                  { c: "bg-error", t: "Cronograma de Campo Atualizado", a: "Carlos Eduardo", d: "Enviado há 3 dias • Planilha Excel • 1.1 MB" },
                ].map((r) => (
                  <div key={r.t} className="flex items-center gap-md p-md hover:bg-surface-container rounded-lg group border-b border-outline-variant/10 last:border-0">
                    <div className={`w-2 h-12 ${r.c} rounded-full group-hover:h-full transition-all`}></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h5 className="font-label-md text-label-md font-bold text-primary">{r.t}</h5>
                        <span className="text-label-sm text-on-surface-variant">{r.a}</span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant line-clamp-1">{r.d}</p>
                    </div>
                    <div className="flex gap-sm">
                      <button className="px-md py-1.5 bg-primary text-on-primary rounded-md font-label-sm text-label-sm hover:opacity-90">Aprovar</button>
                      <button className="px-md py-1.5 border border-outline-variant rounded-md font-label-sm text-label-sm hover:bg-surface-variant">Revisar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-primary text-on-primary rounded-xl p-lg shadow-xl relative overflow-hidden h-full">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-secondary-container/20 rounded-full blur-3xl"></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-md mb-lg">
                  <Icon name="auto_awesome" className="text-3xl text-secondary-fixed-dim" />
                  <div>
                    <h4 className="font-headline-md text-headline-md font-bold">Thesius Insight</h4>
                    <p className="font-label-sm text-label-sm text-primary-fixed-dim">Assistente de Orientação</p>
                  </div>
                </div>
                <div className="space-y-lg mb-xl">
                  <div>
                    <p className="font-label-sm text-label-sm text-primary-fixed-dim uppercase tracking-widest mb-sm">Resumo da Semana</p>
                    <p className="font-body-md text-body-md">Seu tempo de resposta médio está em 1.4 dias. Ótimo desempenho!</p>
                  </div>
                  <div className="p-md bg-on-primary-container/10 rounded-lg border border-on-primary-container/20">
                    <p className="font-label-md text-label-md font-bold mb-xs">Alerta de Plágio</p>
                    <p className="font-body-md text-body-md text-primary-fixed-dim leading-snug">Beatriz Vasconcelos enviou o Cap. 4. O scanner detectou 8% de similaridade em citações não formatadas.</p>
                  </div>
                  <button className="w-full py-md bg-secondary text-on-secondary rounded-lg font-label-md text-label-md shadow-lg flex items-center justify-center gap-md hover:brightness-110">
                    <Icon name="psychology" /> Gerar Feedback IA
                  </button>
                </div>
                <div className="mt-auto pt-lg border-t border-on-primary-container/20">
                  <p className="font-label-sm text-label-sm text-primary-fixed-dim italic">"A ciência é feita de perguntas, não de respostas prontas."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
