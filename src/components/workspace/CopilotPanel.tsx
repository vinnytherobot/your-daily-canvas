import { useRef, useEffect, useState } from "react";
import { Icon } from "../Icon";
import type { CopilotMessage } from "../../lib/copilot";
import { buildCopilotReply } from "../../lib/copilot";

type CopilotPanelProps = {
  open: boolean;
  onClose: () => void;
  selectedText: string;
  className?: string;
};

const QUICK_ACTIONS = [
  { id: "clarity" as const, icon: "auto_fix_high", title: "Melhorar clareza", desc: "Tom acadêmico" },
  { id: "abnt" as const, icon: "rule", title: "Aplicar ABNT/APA", desc: "Citações" },
  { id: "coherence" as const, icon: "fact_check", title: "Verificar coerência", desc: "Revisão" },
];

export function CopilotPanel({ open, onClose, selectedText, className = "" }: CopilotPanelProps) {
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Olá! Selecione um trecho no editor ou use os atalhos abaixo. Posso reformular texto, sugerir citações ABNT e revisar coerência.",
      chips: ["Gerar introdução", "Sugerir citações"],
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = (text: string, action?: "clarity" | "abnt" | "coherence") => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: CopilotMessage = { id: `u-${Date.now()}`, role: "user", content: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    window.setTimeout(() => {
      const reply = buildCopilotReply(trimmed, selectedText, action);
      setMessages((m) => [...m, reply]);
      setLoading(false);
    }, 600 + Math.random() * 400);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    sendMessage(input);
  };

  const handleChip = (chip: string) => {
    sendMessage(chip);
  };

  if (!open) return null;

  return (
    <aside
      className={`w-[300px] shrink-0 sidebar-elegant border-l border-white/6 flex flex-col h-full z-10 print:hidden ${className}`}
      aria-label="Copiloto IA"
    >
      <div className="p-lg flex flex-col h-full min-h-0">
        <div className="flex items-center justify-between mb-lg shrink-0">
          <h2 className="font-label-md font-bold text-primary flex items-center gap-sm">
            <Icon name="bolt" className="text-primary" fill size={22} />
            Copiloto IA
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-on-surface-variant hover:text-on-surface transition-colors"
            aria-label="Fechar copiloto"
            title="Fechar painel"
          >
            <Icon name="close" size={22} />
          </button>
        </div>

        {selectedText.length > 0 && (
          <div className="mb-md p-sm rounded-lg bg-primary/10 border border-primary/20 shrink-0">
            <p className="text-[10px] uppercase tracking-wider text-primary font-semibold mb-xs">Texto selecionado</p>
            <p className="text-xs text-on-surface-variant line-clamp-3 italic">&quot;{selectedText}&quot;</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-sm mb-md shrink-0">
          {QUICK_ACTIONS.map((a) => (
            <button
              key={a.id}
              type="button"
              disabled={loading}
              onClick={() => sendMessage(a.title, a.id)}
              className="thesius-card !shadow-none flex items-center gap-md p-md text-left hover:!border-primary/30 disabled:opacity-50"
            >
              <div className="bg-primary/15 text-primary p-sm rounded-lg">
                <Icon name={a.icon} size={22} />
              </div>
              <div>
                <p className="font-label-md text-on-surface">{a.title}</p>
                <p className="text-[11px] text-on-surface-variant">{a.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <div ref={listRef} className="flex-1 overflow-y-auto custom-scrollbar space-y-md mb-md min-h-0 pr-1">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-sm ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Icon name="smart_toy" className="text-on-primary" size={18} />
                </div>
              )}
              <div
                className={`max-w-[85%] p-md rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-primary/20 text-on-surface rounded-tr-sm"
                    : "bg-surface-container-high text-on-surface-variant rounded-tl-sm"
                }`}
              >
                {msg.content}
                {msg.chips && msg.role === "assistant" && (
                  <div className="flex flex-wrap gap-1.5 mt-sm">
                    {msg.chips.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => handleChip(chip)}
                        className="px-2 py-0.5 rounded-full text-[11px] border border-white/15 hover:border-primary/40 hover:text-primary transition-colors"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-sm items-center text-on-surface-variant text-sm pl-10">
              <span className="inline-flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse [animation-delay:300ms]" />
              </span>
              Analisando…
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="relative shrink-0">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            disabled={loading}
            className="w-full bg-white/5 border border-white/12 rounded-2xl p-md pr-12 pb-10 focus:ring-2 focus:ring-primary/30 focus:border-primary/40 outline-none resize-none text-sm text-on-surface placeholder:text-on-surface-variant/50 min-h-[88px] disabled:opacity-60"
            placeholder={
              selectedText
                ? "Pergunte sobre o trecho selecionado…"
                : "Pergunte à IA (Enter envia, Shift+Enter quebra linha)…"
            }
            rows={3}
            aria-label="Mensagem para o copiloto"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-3 bottom-3 p-2 rounded-xl bg-primary text-on-primary disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            aria-label="Enviar mensagem"
          >
            <Icon name="send" size={20} />
          </button>
        </form>
      </div>
    </aside>
  );
}
