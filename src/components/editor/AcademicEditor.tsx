import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import { useCallback, useEffect, useRef, useState } from "react";
import { EditorToolbar } from "./EditorToolbar";
import {
  loadDocument,
  saveDocument,
  countWords,
  readingTimeMinutes,
  STORAGE_KEY,
} from "../../lib/editor-storage";
import { extractOutline, getActiveOutlineIndex, type OutlineItem } from "../../lib/document-outline";
import "./editor.css";

export type EditorStats = {
  words: number;
  characters: number;
  readingMinutes: number;
  saved: boolean;
};

type AcademicEditorProps = {
  onStatsChange?: (stats: EditorStats) => void;
  searchQuery?: string;
  onEditorReady?: (editor: Editor) => void;
  onOutlineChange?: (outline: OutlineItem[], activeId: string | null) => void;
  onSelectionChange?: (text: string) => void;
};

const AUTOSAVE_MS = 1500;

export function AcademicEditor({
  onStatsChange,
  searchQuery = "",
  onEditorReady,
  onOutlineChange,
  onSelectionChange,
}: AcademicEditorProps) {
  const [mounted, setMounted] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const publishStats = useCallback(
    (ed: Editor) => {
      const text = ed.state.doc.textContent;
      onStatsChange?.({
        words: countWords(text),
        characters: ed.storage.characterCount.characters(),
        readingMinutes: readingTimeMinutes(countWords(text)),
        saved: !!lastSaved,
      });
    },
    [onStatsChange, lastSaved],
  );

  const publishOutline = useCallback(
    (ed: Editor) => {
      const outline = extractOutline(ed);
      const { from } = ed.state.selection;
      const activeIndex = getActiveOutlineIndex(outline, from);
      const activeId = activeIndex >= 0 ? outline[activeIndex].id : null;
      onOutlineChange?.(outline, activeId);
    },
    [onOutlineChange],
  );

  const publishSelection = useCallback(
    (ed: Editor) => {
      const { from, to } = ed.state.selection;
      const text = ed.state.doc.textBetween(from, to, " ");
      onSelectionChange?.(text.trim());
    },
    [onSelectionChange],
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Comece a escrever seu trabalho acadêmico…",
      }),
      CharacterCount,
    ],
    content: mounted ? loadDocument() : "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "tiptap-editor-content",
        spellcheck: "true",
        lang: "pt-BR",
      },
    },
    onCreate: ({ editor: e }) => {
      onEditorReady?.(e);
      publishStats(e);
      publishOutline(e);
      publishSelection(e);
    },
    onUpdate: ({ editor: e }) => {
      publishStats(e);
      publishOutline(e);
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        saveDocument(e.getHTML());
        setLastSaved(new Date());
        publishStats(e);
      }, AUTOSAVE_MS);
    },
    onSelectionUpdate: ({ editor: e }) => {
      publishOutline(e);
      publishSelection(e);
    },
  });

  useEffect(() => {
    if (!editor || !mounted) return;
    const html = loadDocument();
    if (editor.isEmpty) {
      editor.commands.setContent(html, { emitUpdate: false });
    }
    try {
      if (localStorage.getItem(STORAGE_KEY)) setLastSaved(new Date());
    } catch {
      /* ignore */
    }
    publishStats(editor);
    publishOutline(editor);
    onEditorReady?.(editor);
  }, [editor, mounted, publishStats, publishOutline, onEditorReady]);

  useEffect(() => {
    if (!editor || !searchQuery.trim()) return;
    // Busca simples: seleciona primeira ocorrência no documento
    const q = searchQuery.trim().toLowerCase();
    const { doc } = editor.state;
    let from: number | null = null;
    let to: number | null = null;
    doc.descendants((node, pos) => {
      if (from !== null || !node.isText) return;
      const text = node.text?.toLowerCase() ?? "";
      const idx = text.indexOf(q);
      if (idx >= 0) {
        from = pos + idx;
        to = from + q.length;
      }
    });
    if (from !== null && to !== null) {
      editor.chain().focus().setTextSelection({ from, to }).scrollIntoView().run();
    }
  }, [editor, searchQuery]);

  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="tiptap-editor-wrap editor-page rounded-2xl min-h-[720px] flex items-center justify-center text-on-surface-variant/60">
        Carregando editor…
      </div>
    );
  }

  return (
    <div className="tiptap-editor-wrap editor-page rounded-2xl shadow-elegant-lg overflow-hidden">
      <EditorToolbar editor={editor} />
      <div className="tiptap-editor-page">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
