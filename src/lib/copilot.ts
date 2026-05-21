export type CopilotMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  chips?: string[];
};

const uid = () => `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export function buildCopilotReply(
  userMessage: string,
  selectedText: string,
  action?: "clarity" | "abnt" | "coherence",
): CopilotMessage {
  const excerpt = selectedText.trim().slice(0, 200);
  const hasSelection = excerpt.length > 0;

  if (action === "clarity" || /clareza|melhorar|reformul/i.test(userMessage)) {
    return {
      id: uid(),
      role: "assistant",
      content: hasSelection
        ? `Sugestão de reescrita acadêmica:\n\n"${excerpt}" →\n\n"A presente abordagem metodológica articula, de forma sistemática, os procedimentos de coleta e análise de dados, em conformidade com o rigor exigido em pesquisas de pós-graduação."`
        : "Selecione um parágrafo no editor e clique novamente em «Melhorar clareza» para receber uma reformulação com tom formal e objetivo.",
      chips: hasSelection ? ["Aplicar no documento", "Outra versão"] : undefined,
    };
  }

  if (action === "abnt" || /abnt|apa|citação|bibliograf/i.test(userMessage)) {
    return {
      id: uid(),
      role: "assistant",
      content:
        "Exemplo de citação ABNT (autoria no texto):\n\n(SILVA, 2024)\n\nReferência:\nSILVA, M. A. A ética da inteligência artificial na educação superior. Revista Brasileira de Educação, v. 12, n. 3, p. 45-62, 2024.",
      chips: ["Inserir citação", "Gerar referência completa"],
    };
  }

  if (action === "coherence" || /coerência|contradi|revis/i.test(userMessage)) {
    return {
      id: uid(),
      role: "assistant",
      content: hasSelection
        ? `Análise do trecho:\n\n• Densidade de citações adequada.\n• Sugestão: explicitar se a abordagem mista é sequencial ou concorrente.\n• Verifique concordância temporal em "${excerpt.slice(0, 40)}…"`
        : "Não encontrei inconsistências graves no capítulo. Recomendo revisar transições entre os subtópicos 2 e 2.1.",
      chips: ["Ver metodologia", "Listar pendências"],
    };
  }

  if (/introdução|gerar|escrev/i.test(userMessage)) {
    return {
      id: uid(),
      role: "assistant",
      content:
        "Rascunho de introdução sugerido:\n\n«Este estudo investiga os efeitos da inteligência artificial na produtividade da escrita acadêmica, com ênfase em fluxos de elaboração, normatização e revisão textual em ambientes digitais.»",
      chips: ["Inserir no início", "Expandir parágrafo"],
    };
  }

  return {
    id: uid(),
    role: "assistant",
    content: hasSelection
      ? `Sobre o trecho selecionado («${excerpt.slice(0, 80)}…»): posso ajudar com reformulação, citações ABNT/APA ou revisão estrutural. O que prefere?`
      : "Sou seu copiloto acadêmico. Selecione um trecho no editor ou pergunte sobre metodologia, citações, ABNT ou estrutura do trabalho.",
    chips: ["Sugerir citações", "Revisar parágrafo", "Gerar introdução"],
  };
}
