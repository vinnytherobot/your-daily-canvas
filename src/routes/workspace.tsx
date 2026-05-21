import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import type { Editor } from "@tiptap/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "../components/Icon";
import { Logo } from "../components/Logo";
import { AcademicEditor, type EditorStats } from "../components/editor/AcademicEditor";
import { DocumentOutline } from "../components/workspace/DocumentOutline";
import { CopilotPanel } from "../components/workspace/CopilotPanel";
import {
  type OutlineItem,
  scrollToOutlineItem,
} from "../lib/document-outline";

const COPILOT_OPEN_KEY = "thesius:copilot-open";

export const Route = createFileRoute("/workspace")({
  head: () => ({ meta: [{ title: "Thesius | Editor" }] }),
  component: Workspace,
});

function loadCopilotOpen(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const v = localStorage.getItem(COPILOT_OPEN_KEY);
    return v === null ? true : v === "true";
  } catch {
    return true;
  }
}

function saveCopilotOpen(open: boolean) {
  try {
    localStorage.setItem(COPILOT_OPEN_KEY, String(open));
  } catch {
    /* ignore */
  }
}

function Workspace() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const editorRef = useRef<Editor | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState<EditorStats>({
    words: 0,
    characters: 0,
    readingMinutes: 1,
    saved: false,
  });

  const [outline, setOutline] = useState<OutlineItem[]>([]);
  const [activeOutlineId, setActiveOutlineId] = useState<string | null>(null);
  const [collapsedOutline, setCollapsedOutline] = useState<Set<string>>(new Set());
  const [selectedText, setSelectedText] = useState("");

  const [copilotOpen, setCopilotOpen] = useState(true);

  useEffect(() => {
    setCopilotOpen(loadCopilotOpen());
  }, []);

  const handleCopilotClose = () => {
    setCopilotOpen(false);
    saveCopilotOpen(false);
  };

  const handleCopilotOpen = () => {
    setCopilotOpen(true);
    saveCopilotOpen(true);
  };

  const handleStats = useCallback((s: EditorStats) => setStats(s), []);

  const handleEditorReady = useCallback((editor: Editor) => {
    editorRef.current = editor;
  }, []);

  const handleOutlineChange = useCallback((items: OutlineItem[], activeId: string | null) => {
    setOutline(items);
    setActiveOutlineId(activeId);
  }, []);

  const handleOutlineSelect = useCallback((item: OutlineItem) => {
    setActiveOutlineId(item.id);
    if (editorRef.current) scrollToOutlineItem(editorRef.current, item.pos);
  }, []);

  const handleToggleCollapse = useCallback((id: string) => {
    setCollapsedOutline((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleAddSection = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;
    editor
      .chain()
      .focus()
      .insertContent({ type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Novo tópico" }] })
      .run();
  }, []);

  const activeOutline = outline.find((o) => o.id === activeOutlineId);
  const breadcrumbSection = activeOutline?.title ?? "Documento";

  const handleExportPdf = () => window.print();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background font-body-md text-on-surface relative z-10 print:block print:h-auto print:overflow-visible">
      <aside className="sidebar-elegant w-[260px] shrink-0 flex flex-col h-full z-30 print:hidden">
        <div className="px-lg py-lg flex flex-col flex-1 min-h-0">
          <Link to="/" className="flex items-center gap-md mb-lg shrink-0 group">
            <Logo size={40} className="logo-glow transition-transform group-hover:scale-105" />
            <h1 className="font-headline-md font-bold text-primary">Thesius</h1>
          </Link>
          <button type="button" className="btn-primary w-full py-2.5 rounded-xl font-label-md flex items-center justify-center gap-sm mb-lg shrink-0">
            <Icon name="add" size={20} /> Novo projeto
          </button>
          <nav className="space-y-1 shrink-0">
            <Link
              to="/dashboard"
              className={`flex items-center gap-md px-md py-2.5 rounded-xl transition-all ${
                path.startsWith("/dashboard") ? "nav-item-active font-semibold" : "text-on-surface-variant hover:bg-white/5"
              }`}
            >
              <Icon name="dashboard" size={22} /> <span className="font-label-md">Projetos</span>
            </Link>
            <div className="nav-item-active flex items-center gap-md px-md py-2.5 rounded-xl font-semibold">
              <Icon name="edit_note" fill size={22} /> <span className="font-label-md">Editor</span>
            </div>
            <Link
              to="/library"
              className={`flex items-center gap-md px-md py-2.5 rounded-xl transition-all ${
                path.startsWith("/library") ? "nav-item-active font-semibold" : "text-on-surface-variant hover:bg-white/5"
              }`}
            >
              <Icon name="library_books" size={22} /> <span className="font-label-md">Referências</span>
            </Link>
          </nav>
          <div className="mt-lg flex-1 min-h-0 flex flex-col">
            <div className="flex items-center justify-between mb-md shrink-0">
              <h3 className="font-label-sm text-on-surface-variant/60 uppercase tracking-widest">Estrutura</h3>
              <span className="text-[10px] text-on-surface-variant/50 tabular-nums">{outline.length} tópicos</span>
            </div>
            <div className="custom-scrollbar overflow-y-auto flex-1 min-h-0 -mx-1 px-1">
              <DocumentOutline
                items={outline}
                activeId={activeOutlineId}
                collapsed={collapsedOutline}
                onToggleCollapse={handleToggleCollapse}
                onSelect={handleOutlineSelect}
                onAddSection={handleAddSection}
              />
            </div>
          </div>
        </div>
        <div className="p-lg border-t border-white/6 shrink-0">
          <div className="flex items-center gap-md min-w-0">
            <img
              alt=""
              className="w-10 h-10 rounded-full border border-white/10 shrink-0 object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF6J24-HC4bli0NsoQFB5Ci4RS2RO8iYZDyeiJ87q4_B-NDbFYgHuWsQ6ZLCNjVfJrec95RJ_blrA3_JPCExdyPMlDTkr5oMB7HSpaKR9rhKqKjgbGqd0AU8WPFil5CM-AH6xh_WHoWhLr7-ki2jEjbkwuEPqZKQLF_lu4YKwDHXZjptR62iFnKjbDDvLYU6-9U-yNuZBoeTvHfPlUyqY-KX1qQlLrATYR0briQIsnbVOkJkM_wf9jxIOiJ3bJG7ofSfVobiDFbBlD"
            />
            <div className="min-w-0 flex-1">
              <p className="font-label-md text-primary font-bold truncate">Marina Costa</p>
              <p className="font-label-sm text-on-surface-variant/60 truncate">Plano Pro</p>
            </div>
            <button type="button" className="shrink-0 p-1 rounded-lg hover:bg-white/5" aria-label="Configurações">
              <Icon name="settings" className="text-on-surface-variant" size={22} />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden relative print:overflow-visible">
        <header className="h-[72px] flex items-center justify-between gap-md px-lg md:px-xl border-b border-white/6 surface-glass sticky top-0 z-20 shrink-0 print:hidden">
          <div className="flex items-center gap-md min-w-0 flex-1">
            <div className="flex items-center gap-sm bg-white/4 rounded-full px-md py-1.5 border border-white/8 min-w-0 max-w-sm flex-1">
              <Icon name="search" className="text-on-surface-variant shrink-0" size={18} />
              <input
                className="bg-transparent border-none focus:ring-0 text-sm w-full min-w-0 outline-none placeholder:text-on-surface-variant/50"
                placeholder="Buscar no documento..."
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.currentTarget.blur();
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-sm shrink-0">
            {!copilotOpen && (
              <button
                type="button"
                onClick={handleCopilotOpen}
                className="hidden lg:flex items-center gap-sm btn-ghost px-md py-2 rounded-xl font-label-sm"
                aria-label="Abrir copiloto IA"
              >
                <Icon name="auto_awesome" size={20} className="text-primary" />
                Copiloto IA
              </button>
            )}
            <button type="button" className="p-2 text-on-surface-variant hover:text-primary rounded-lg hover:bg-white/5" aria-label="Histórico">
              <Icon name="history" size={22} />
            </button>
            <button type="button" className="p-2 text-on-surface-variant hover:text-primary rounded-lg hover:bg-white/5" aria-label="Compartilhar">
              <Icon name="share" size={22} />
            </button>
            <button type="button" onClick={handleExportPdf} className="btn-primary px-md py-2 rounded-xl font-label-sm whitespace-nowrap">
              Exportar PDF
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar py-lg px-md md:px-xl pb-28 print:overflow-visible print:py-0">
          <div className="max-w-[816px] mx-auto print:max-w-none">
            <nav className="flex flex-wrap items-center gap-xs mb-lg text-sm print:hidden" aria-label="Trilha">
              <Link to="/dashboard" className="text-on-surface-variant/50 hover:text-primary">
                Meus projetos
              </Link>
              <Icon name="chevron_right" size={14} className="text-on-surface-variant/40" />
              <span className="text-on-surface-variant/50">TCC — IA na educação</span>
              <Icon name="chevron_right" size={14} className="text-on-surface-variant/40" />
              <span className="text-primary font-bold truncate max-w-[240px]" title={breadcrumbSection}>
                {breadcrumbSection}
              </span>
            </nav>
            <AcademicEditor
              onStatsChange={handleStats}
              searchQuery={searchQuery}
              onEditorReady={handleEditorReady}
              onOutlineChange={handleOutlineChange}
              onSelectionChange={setSelectedText}
            />
          </div>
        </div>

        <div className="absolute bottom-md left-1/2 -translate-x-1/2 z-20 flex items-center gap-md glass-panel px-lg py-sm rounded-full border border-white/10 shadow-lg max-w-[calc(100%-2rem)] print:hidden">
          <div className="flex items-center gap-xs shrink-0">
            <span className={`w-2 h-2 rounded-full ${stats.saved ? "status-dot" : "bg-amber-400 animate-pulse"}`} />
            <span className="font-label-sm text-on-surface-variant whitespace-nowrap">
              {stats.saved ? "Salvo" : "Salvando…"}
            </span>
          </div>
          <div className="h-4 w-px bg-white/10 shrink-0" />
          <span className="font-label-sm text-on-surface-variant whitespace-nowrap tabular-nums">
            {stats.words.toLocaleString("pt-BR")} palavras
          </span>
          <div className="h-4 w-px bg-white/10 shrink-0 hidden sm:block" />
          <span className="font-label-sm text-on-surface-variant whitespace-nowrap hidden sm:inline tabular-nums">
            Leitura: {stats.readingMinutes} min
          </span>
        </div>
      </main>

      <CopilotPanel
        open={copilotOpen}
        onClose={handleCopilotClose}
        selectedText={selectedText}
        className="hidden lg:flex"
      />

      {/* Mobile: drawer do copiloto */}
      {copilotOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-label="Fechar copiloto"
            onClick={handleCopilotClose}
          />
          <CopilotPanel
            open
            onClose={handleCopilotClose}
            selectedText={selectedText}
            className="relative z-10 h-full w-[min(100%,320px)] shadow-2xl"
          />
        </div>
      )}

      <button
        type="button"
        onClick={handleCopilotOpen}
        className={`fixed bottom-20 right-6 z-30 w-14 h-14 rounded-2xl bg-primary text-on-primary flex items-center justify-center logo-glow print:hidden transition-transform ${
          copilotOpen ? "lg:scale-0 lg:pointer-events-none" : "scale-100"
        }`}
        aria-label="Abrir copiloto IA"
        title="Copiloto IA"
      >
        <Icon name="auto_awesome" fill size={26} />
      </button>
    </div>
  );
}
