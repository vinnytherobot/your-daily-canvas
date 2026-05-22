export type CopilotMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  chips?: string[];
  suggestions?: string[];
};

const uid = () => `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

// Simulate analysis of document structure and content
function analyzeDocumentContext(selectedText: string): {
  academicLevel: string;
  likelySection: string;
  writingTips: string[];
} {
  const textLower = selectedText.toLowerCase();

  // Determine likely academic section based on content
  let likelySection = "geral";
  if (/metodologia|métodos|procedimentos|técnicas|material/i.test(textLower)) {
    likelySection = "metodologia";
  } else if (/introdução|objetivo|justificativa|hipótese|problema/i.test(textLower)) {
    likelySection = "introdução";
  } else if (/resultado|descoberta|encontrado|conclusão/i.test(textLower)) {
    likelySection = "resultados";
  } else if (/fundament|teórico|referencial|literatura/i.test(textLower)) {
    likelySection = "fundamentacao_teorica";
  } else if (/conclusão|consideração|implicação|recomendação/i.test(textLower)) {
    likelySection = "conclusao";
  }

  // Determine academic level based on vocabulary sophistication
  const academicTerms = ["metodologia", "hipótese", "variável", "amostra", "estatístico",
    "revisão bibliográfica", "referencial teórico", "análise crítica", "síntese"];
  const academicCount = academicTerms.filter(term => textLower.includes(term)).length;

  let academicLevel = "graduacao";
  if (academicCount >= 3) academicLevel = "mestrado";
  if (academicCount >= 5) academicLevel = "doutorado";

  // Generate contextual writing tips
  const writingTips = [];
  if (likelySection === "metodologia") {
    writingTips.push("Considere detalhar o tamanho da amostra e critérios de inclusão/exclusão");
    writingTips.push("Especifique os instrumentos de validação utilizados");
    writingTips.push("Mencione o software estatístico e versão utilizados");
  } else if (likelySection === "introdução") {
    writingTips.push("Estabeleça claramente o problema de pesquisa");
    writingTips.push("Inclua uma hipótese ou pergunta de pesquisa explícita");
    writingTips.push("Justifique a relevância atual do tema");
  } else if (likelySection === "resultados") {
    writingTips.push("Apresente os dados de forma objetiva antes da interpretação");
    writingTips.push("Utilize tabelas e figuras para complementar o texto");
    writingTips.push("Inclua medidas de dispersão junto com as médias");
  } else if (likelySection === "conclusao") {
    writingTips.push("Relacione os resultados diretamente com os objetivos iniciais");
    writingTips.push("Sugira pesquisas futuras baseadas nas limitações encontradas");
    writingTips.push("Evite introduzir novos conceitos ou dados não discutidos anteriormente");
  }

  return {
    academicLevel,
    likelySection,
    writingTips: writingTips.length > 0 ? writingTips : ["Mantenha clareza e objetividade na redação académica"]
  };
}

export function buildCopilotReply(
  userMessage: string,
  selectedText: string,
  action?: "clarity" | "abnt" | "coherence",
): CopilotMessage {
  const excerpt = selectedText.trim().slice(0, 300);
  const hasSelection = excerpt.length > 0;
  const context = analyzeDocumentContext(selectedText);

  if (action === "clarity" || /clareza|melhorar|reformul/i.test(userMessage)) {
    return {
      id: uid(),
      role: "assistant",
      content: hasSelection
        ? `Sugestão de aprimoramento para seção ${context.likelySection} (nível ${context.academicLevel}):\n\n"${excerpt}" →\n\n"${applyAcademicImprovements(excerpt, context.likelySection)}"\n\n${context.writingTips.map(tip => `• ${tip}`).join('\n')}`
        : "Selecione um parágrafo no editor e clique novamente em «Melhorar clareza» para receber sugestões contextualizadas com base no conteúdo do seu trabalho.",
      chips: hasSelection ? ["Aplicar melhoria", "Sugerir alternativa", "Explicar mudanças"] : undefined,
      suggestions: context.writingTips
    };
  }

  if (action === "abnt" || /abnt|apa|citação|bibliograf/i.test(userMessage)) {
    return {
      id: uid(),
      role: "assistant",
      content: hasSelection
        ? `Sugestão de citação para o trecho selecionado:\n\nTrecho: "${excerpt.substring(0, 100)}..."\n\nCitação sugerida (ABNT):\n(AUTOR, ANO)\n\nPara melhor fundamentação, considere buscar por:\n• ${getContextualReferences(context.likelySection)}\n• Estudos recentes (últimos 5 anos) sobre ${getKeyTopic(excerpt)}\n• Meta-análises ou revisões sistemáticas sobre o tema`
        : "Para gerar citações ABNT/APA, selecione um trecho que contenha informações que necessitem de referência ou peça sugestões de referências para uma seção específica do seu trabalho.",
      chips: hasSelection ? ["Inserir citação ABNT", "Gerar referência completa", "Buscar fontes similares"] : undefined,
      suggestions: [getContextualReferences(context.likelySection), `Buscar por: ${getKeyTopic(excerpt)}`]
    };
  }

  if (action === "coherence" || /coerência|contradi|revis/i.test(userMessage)) {
    return {
      id: uid(),
      role: "assistant",
      content: hasSelection
        ? `Análise de coerência para seção ${context.likelySection}:\n\n• ${assessCitationDensity(excerpt)}\n• ${checkTemporalConsistency(excerpt)}\n• ${evaluateArgumentFlow(excerpt, context.likelySection)}\n• ${checkTerminologyConsistency(excerpt)}\n\nSugestões de melhoria:\n${context.writingTips.map(tip => `• ${tip}`).join('\n')}`
        : "Para análise de coerência, selecione um parágrafo ou peça uma revisão geral do capítulo atual. Posso verificar consistência conceitual, temporal e terminológica.",
      chips: hasSelection ? ["Aplicar sugestões", "Verificar referências", "Sugerir reestruturação"] : undefined,
      suggestions: context.writingTips
    };
  }

  if (/introdução|gerar|escrev/i.test(userMessage)) {
    const introType = getIntroductionType(context.likelySection);
    return {
      id: uid(),
      role: "assistant",
      content: hasSelection
        ? `Sugestão de aprimoramento baseado no conteúdo selecionado:\n\nTrecho atual: "${excerpt.substring(0, 80)}..."\n\nSugestão de expansão:\n\n"${expandAcademicText(excerpt, introType)}"\n\nElementos que podem ser acrescentados:\n• Contextualização histórica do problema\n• Lacunas na literatura recente\n• Justificativa metodológica da abordagem escolhida\n• Expectativas de contribuição para o campo`
        : `Rascunho de ${introType} sugerido:\n\n«${generateAcademicIntroduction(introType, context.academicLevel)}»\n\nEste rascunho inclui: contextualização, problema de pesquisa, objetivos e justificativa.` ,
      chips: hasSelection ? ["Expandir com sugestão", "Reformular totalmente", "Adicionar fundamentação"] : ["Inserir no início", "Personalizar conforme tema", "Verificar exemplos recentes"],
      suggestions: [getContextualReferences(context.likelySection), `Definir variáveis-chave para: ${getKeyTopic(excerpt)}`]
    };
  }

  return {
    id: uid(),
    role: "assistant",
    content: hasSelection
      ? `Análise contextual do trecho (seção ${context.likelySection}, nível ${context.academicLevel}):\n\nSobre o trecho selecionado («${excerpt.slice(0, 100)}…»):\n• Tipo de conteúdo: ${getContentType(excerpt)}\n• Nível de technicalidade: ${getTechnicalLevel(excerpt)}\n• Sugestões de aprimoramento:\n  ${context.writingTips.map(tip => `  • ${tip}`).join('\n')}\n\nPosso ajudar com: reformulação acadêmica, sugestões de citações, verificação de coerência ou geração de conteúdo contextualizado.`
      : "Sou seu copiloto acadêmico contextualizado. Selecione um trecho no editor para que eu possa analisar seu conteúdo e fornecer sugestões específicas para sua seção de trabalho, nível académico e necessidades de formatação.",
    chips: hasSelection
      ? ["Aprimorar conteúdo", "Sugerir citações", "Verificar coerência", "Expandidor de ideias"]
      : ["Sugerir citações", "Revisar parágrafo", "Gerar introdução", "Planejar seção"],
    suggestions: context.writingTips
  };
}

// Helper functions for enhanced AI responses
function applyAcademicImprovements(text: string, section: string): string {
  // Simulate academic-style improvements
  const improvements: Record<string, string> = {
    introdução: text.replace(/(\b\d{4}\b)/g, "(dados de $1)").replace(/\bwe\b/gi, "neste estudo"),
    metodologia: text.replace(/\bwe used\b/gi, "utilizamos").replace(/\bdid\b/gi, "realizamos"),
    resultados: text.replace(/\bshowed\b/gi, "evidenciou").replace(/\bfound\b/gi, "constatamos"),
    conclusao: text.replace(/\bwe concluded\b/gi, "concluímos").replace(/\bit was found\b/gi, "observou-se"),
    default: text
  };

  return improvements[section] || improvements.default;
}

function getContextualReferences(section: string): string {
  const references: Record<string, string> = {
    introdução: "Silva (2023) sobre contextualização do problema",
    metodologia: "Creswell & Plano Clark (2018) - pesquisa mista",
    resultados: "Field (2018) - estatística para pesquisa",
    conclusao: "Patton (2015) - interpretação qualitativa",
    fundamentacao_teorica: "Bardin (2016) - análise de conteúdo",
    default: "Consulte fontes primárias recentes (últimos 3-5 anos)"
  };

  return references[section] || references.default;
}

function getKeyTopic(text: string): string {
  // Simple keyword extraction
  const words = text.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ")
    .split(/\s+/)
    .filter(w => w.length > 4 && !["para", "com", "este", "esse", "aquele", "nessa", "isto", "isso"].includes(w));

  const freq: Record<string, number> = {};
  words.forEach(word => {
    freq[word] = (freq[word] || 0) + 1;
  });

  return Object.entries(freq)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([word]) => word)
    .join(", ") || "tema central";
}

function assessCitationDensity(text: string): string {
  const hasCitations = /\(\s*[A-Z][a-z]+\s*\d{2,4}\s*\)/.test(text);
  return hasCitations
    ? "Densidade de citações aparente adequada para o trecho analisado"
    : "Considere aumentar a densidaded de citações para fortalecer a argumentação";
}

function checkTemporalConsistency(text: string): string {
  const years = text.match(/\b\d{4}\b/g) || [];
  if (years.length === 0) return "Não foram identificadas datas para verificação de consistência temporal";

  const recentYears = years.filter(y => parseInt(y) >= 2020);
  return recentYears.length > 0
    ? `Foram encontradas ${recentYears.length} referências recentes (a partir de 2020)`
    : "Considere incluir referências mais recentes (últimos 5 anos) para atualizar o embasamento";
}

function evaluateArgumentFlow(text: string, section: string): string {
  const indicators = {
    introdução: ["portanto", "logo", "assim", "consequentemente"],
    metodologia: ["primeiramente", "seguidamente", "em seguida", "por fim"],
    resultados: ["observou-se", "verificou-se", "constatou-se", "evidenciou-se"],
    conclusao: ["logo", "portanto", "assim", "consequentemente", "por isso"]
  };

  const sectionIndicators = indicators[section as keyof typeof indicators] || [];
  const hasFlow = sectionIndicators.some(ind => text.toLowerCase().includes(ind));

  return hasFlow
    ? "Fluxo argumentativo aparente adequado para a seção"
    : "Considere usar conectivos para melhorar a coerência interna do argumento";
}

function checkTerminologyConsistency(text: string): string {
  // Simple check for acronym consistency
  const acronyms = text.match(/\b[A-Z]{2,}\b/g) || [];
  if (acronyms.length === 0) return "Nenhum acrônimo identificado para verificação de consistência";

  return `Foram identificados ${acronyms.length} acrônimos(s): ${acronyms.join(", ")}. Verifique se foram definidos previamente no texto.`;
}

function getIntroductionType(section: string): string {
  const types: Record<string, string> = {
    introdução: "introdução contextualizada",
    metodologia: "fundamentação da escolha metodológica",
    resultados: "apresentação dos achados principais",
    conclusao: "síntese das contribuições e limitações",
    fundamentacao_teorica: "estado da arte sobre o tema",
    default: "seção acadêmica"
  };

  return types[section] || types.default;
}

function generateAcademicIntroduction(type: string, level: string): string {
  const templates: Record<string, string> = {
    "introdução contextualizada": "Este estudo aborda a problemática relacionada ao tema em questão, considerando as lacunas identificadas na literatura recente e a relevância para o campo de atuação.",
    "fundamentação da escolha metodológica": "A escolha desta metodologia fundamenta-se na adequação ao objeto de estudo, considerando os pressupostos teóricos e as constraints pragmáticas da pesquisa.",
    "apresentação dos achados principais": "Os resultados obtidos permitem identificar padrões significativos que contribuem para o entendimento do fenômeno investigado.",
    "síntese das contribuições e limitações": "Este trabalho contribui para o campo ao fornecer novas evidências empíricas, enquanto reconhece limitações que apontam para direções futuras de pesquisa.",
    "estado da arte sobre o tema": "A revisão da literatura revela um consenso parcial sobre o tema, com divergências metodológicas que justificam a presente investigação.",
    default: "Esta seção apresenta o desenvolvimento lógico do argumento central do trabalho."
  };

  return templates[type] || templates.default;
}

function expandAcademicText(text: string, type: string): string {
  const expansions: Record<string, string> = {
    "introdução contextualizada": `${text} Além disso, é relevante considerar as implicações teóricas e práticas dessas mudanças para o campo de estudos relacionados.`,
    "fundamentação da escolha metodológica": `${text} Essa abordagem metodológica foi selecionada após cuidadosa avaliação das alternativas disponíveis, considerando sua validade interna e aplicabilidade ao contexto específico da pesquisa.`,
    "apresentação dos achados principais": `${text} Os dados apresentados revelam tendências importantes que merecem investigação mais aprofundada em estudos subsequentes.`,
    "síntese das contribuições e limitações": `${text} Apesar das limitações identificadas, os resultados apresentados oferecem contribuições significativas para o avanço do conhecimento nesta área de estudo.`,
    "estado da arte sobre o tema": `${text} Lacunas identificadas na literatura atual apontam para oportunidades de pesquisa que podem contribuir para resolver contradições existentes nos achados anteriores.`,
    default: `${text} Este ponto é relevante para o desenvolvimento do argumento central e merece consideração cuidadosa nas seções subsequentes do trabalho.`
  };

  return expansions[type] || expansions.default;
}

function getContentType(text: string): string {
  const types: Record<string, string> = {
    containsNumbers: /\d/.test(text) ? "contém dados numéricos" : "predominantemente textual",
    hasQuestions: /\?/.test(text) ? "interrogativo" : "afirmativo/declarativo",
    hasCitations: /\(\s*[A-Z][a-z]+\s*\d{2,4}\s*\)/.test(text) ? "com referências" : "sem citações explícitas"
  };

  const matches = Object.entries(types).filter(([, value]) => value);
  return matches.length > 0 ? matches.map(([, value]) => value).join(", ") : "texto acadêmico padrão";
}

function getTechnicalLevel(text: string): string {
  const technicalTerms = ["metodologia", "epistemologia", "ontologia", "phenomenologia", "heurística",
    "variável independente", "variável dependente", "hipótese nula", "intervalo de confiança",
    "análise fatorial", "regressão logística", "modelagem estrutural"];

  const count = technicalTerms.filter(term => text.toLowerCase().includes(term)).length;

  if (count >= 3) return "alto (terminologia especializada)";
  if (count >= 1) return "médio (alguns termos técnicos)";
  return "básico (linguagem acessível)";
}
