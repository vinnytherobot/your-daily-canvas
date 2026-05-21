import type { Editor } from "@tiptap/react";

export type OutlineItem = {
  id: string;
  level: 1 | 2 | 3;
  title: string;
  pos: number;
  depth: number;
};

export function extractOutline(editor: Editor): OutlineItem[] {
  const raw: { level: 1 | 2 | 3; title: string; pos: number }[] = [];

  editor.state.doc.descendants((node, pos) => {
    if (node.type.name !== "heading") return;
    const level = node.attrs.level as 1 | 2 | 3;
    const title = node.textContent.trim();
    if (!title) return;
    raw.push({ level, title, pos });
  });

  return raw.map((item, index) => ({
    id: `outline-${item.pos}`,
    level: item.level,
    title: item.title,
    pos: item.pos,
    depth: Math.max(0, item.level - 1),
  }));
}

export function scrollToOutlineItem(editor: Editor, pos: number): void {
  editor
    .chain()
    .focus()
    .setTextSelection(pos + 1)
    .scrollIntoView()
    .run();
}

/** Índice do tópico ativo com base na posição do cursor */
export function getActiveOutlineIndex(outline: OutlineItem[], cursorPos: number): number {
  if (outline.length === 0) return -1;
  let active = 0;
  for (let i = 0; i < outline.length; i++) {
    if (outline[i].pos <= cursorPos) active = i;
    else break;
  }
  return active;
}
