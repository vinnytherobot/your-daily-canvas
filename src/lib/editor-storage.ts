export const STORAGE_KEY = "thesius:document:methodology";

export const DEFAULT_DOCUMENT_HTML = `
<h1>2. Metodologia abrangente</h1>
<p>Esta pesquisa utiliza uma <strong>abordagem mista</strong> para avaliar o impacto da inteligência artificial na produtividade da escrita acadêmica. A fase quantitativa envolveu questionário aplicado a 500 estudantes de pós-graduação em diversas áreas do conhecimento.</p>
<blockquote><p>A metodologia mista permite integrar dados numéricos e narrativas qualitativas, ampliando a validade das inferências (Creswell &amp; Creswell, 2018).</p></blockquote>
<p>A coleta de dados ocorreu ao longo de seis meses. No componente qualitativo, foram realizadas entrevistas semiestruturadas com especialistas em interação humano-computador. Os resultados indicam mudança significativa nas estratégias de <em>offloading cognitivo</em> entre pesquisadores que utilizam modelos de linguagem de grande escala.</p>
<h2>2.1 Procedimentos</h2>
<p>O estudo foi aprovado pelo comitê de ética institucional sob o parecer nº 4.821/2025. Todos os participantes assinaram termo de consentimento livre e esclarecido.</p>
<ul>
  <li>Levantamento documental e revisão sistemática;</li>
  <li>Aplicação de questionário validado (escala Likert, α = 0,87);</li>
  <li>Entrevistas gravadas e transcritas para análise de conteúdo.</li>
</ul>
<p>Achados preliminares sugerem que a formatação automática (ABNT/APA) reduz em cerca de 40% o tempo administrativo, liberando foco para o desenvolvimento teórico do trabalho.</p>
`.trim();

export function loadDocument(): string {
  if (typeof window === "undefined") return DEFAULT_DOCUMENT_HTML;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved && saved.length > 0 ? saved : DEFAULT_DOCUMENT_HTML;
  } catch {
    return DEFAULT_DOCUMENT_HTML;
  }
}

export function saveDocument(html: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, html);
  } catch {
    /* quota exceeded — ignore */
  }
}

export function countWords(text: string): number {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) return 0;
  return cleaned.split(" ").length;
}

export function readingTimeMinutes(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / 200));
}
