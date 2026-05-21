import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Icon } from "../components/AppShell";
import { PageHeader } from "../components/PageHeader";
import { StatCard } from "../components/StatCard";

export const Route = createFileRoute("/library")({
  head: () => ({ meta: [{ title: "Thesius | Biblioteca de Referências" }] }),
  component: Library,
});

const sources = [
  { title: "A ética da inteligência artificial na educação superior", author: "Silva, M. A.", year: "2024", type: "Artigo", format: "ABNT", cited: 12 },
  { title: "Metodologias mistas em pesquisa aplicada", author: "Creswell, J. W.", year: "2018", type: "Livro", format: "APA", cited: 8 },
  { title: "Escrita acadêmica e produtividade digital", author: "Oliveira, P. R.", year: "2023", type: "Capítulo", format: "ABNT", cited: 5 },
  { title: "Normas técnicas para trabalhos de conclusão", author: "NBR 14724", year: "2022", type: "Norma", format: "ABNT", cited: 24 },
];

function Library() {
  return (
    <AppShell>
      <div className="space-y-xl">
        <PageHeader
          eyebrow="Gestão bibliográfica"
          title="Biblioteca de referências"
          description="Importe PDFs e DOCX, extraia citações e gere bibliografias em ABNT, APA ou Vancouver."
          actions={
            <>
              <button type="button" className="btn-ghost px-md py-2.5 font-label-md flex items-center gap-sm">
                <Icon name="upload_file" size={20} /> Importar
              </button>
              <button type="button" className="btn-primary px-lg py-2.5 font-label-md flex items-center gap-sm">
                <Icon name="add" size={20} /> Nova referência
              </button>
            </>
          }
        />

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-gutter">
          <StatCard label="Total de fontes" value="47" icon="library_books" accent="gold" />
          <StatCard label="Citações geradas" value="158" icon="format_quote" accent="gold" />
          <StatCard label="Conformidade ABNT" value="96%" icon="verified" accent="success" />
          <StatCard label="PDFs indexados" value="23" icon="picture_as_pdf" accent="muted" />
        </section>

        <div className="thesius-card overflow-hidden">
          <div className="p-lg border-b border-white/6 flex flex-col lg:flex-row gap-md lg:items-center lg:justify-between">
            <div className="relative flex-1 max-w-md w-full">
              <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" size={20} />
              <input
                className="w-full bg-white/4 border border-white/8 rounded-full pl-11 pr-lg py-2.5 outline-none focus:ring-2 focus:ring-primary/25 placeholder:text-on-surface-variant/60"
                placeholder="Autor, título ou DOI..."
                type="search"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {["Todas", "ABNT", "APA", "Vancouver"].map((f, i) => (
                <button
                  type="button"
                  key={f}
                  className={`px-4 py-1.5 rounded-full font-label-sm transition-colors ${
                    i === 0 ? "bg-primary text-on-primary font-semibold" : "btn-ghost !py-1.5 !px-4 text-sm"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <ul className="divide-y divide-white/6">
            {sources.map((s) => (
              <li key={s.title} className="p-lg flex flex-col md:flex-row md:items-center gap-md hover:bg-white/[0.02] transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon name="menu_book" className="text-primary" size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-label-md font-semibold text-on-surface group-hover:text-primary transition-colors truncate">
                    {s.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant mt-0.5">
                    {s.author} · {s.year} · {s.type}
                  </p>
                </div>
                <div className="flex items-center gap-md shrink-0">
                  <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wide">
                    {s.format}
                  </span>
                  <span className="text-xs text-on-surface-variant tabular-nums">{s.cited} citações</span>
                  <button type="button" className="p-2 rounded-lg hover:bg-white/5 text-primary" aria-label="Copiar">
                    <Icon name="content_copy" size={20} />
                  </button>
                  <button type="button" className="p-2 rounded-lg hover:bg-white/5 text-on-surface-variant" aria-label="Mais">
                    <Icon name="more_vert" size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="ai-gradient-border p-lg rounded-2xl">
          <div className="flex flex-col md:flex-row gap-lg items-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0">
              <Icon name="psychology" className="text-primary" size={32} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">IA bibliográfica</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Pergunte à sua biblioteca e receba respostas com citação direta da página.
              </p>
            </div>
            <button type="button" className="btn-primary px-lg py-2.5 font-label-md shrink-0">
              Experimentar busca
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
