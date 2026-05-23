import type { Editor } from "@tiptap/react";
import { Icon } from "../Icon";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Mock library data - in a real app, this would come from a service or context
const mockLibrary = [
  { title: "A ética da inteligência artificial na educação superior", author: "Silva, M. A.", year: "2024", type: "Artigo", format: "ABNT" },
  { title: "Metodologias mistas em pesquisa aplicada", author: "Creswell, J. W.", year: "2018", type: "Livro", format: "APA" },
  { title: "Escrita acadêmica e produtividade digital", author: "Oliveira, P. R.", year: "2023", type: "Capítulo", format: "ABNT" },
  { title: "Normas técnicas para trabalhos de conclusão", author: "NBR 14724", year: "2022", type: "Norma", format: "ABNT" },
];

type EditorToolbarProps = {
  editor: Editor | null;
};

function ToolbarButton({
  onClick,
  active,
  disabled,
  label,
  icon,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  icon: string;
}) {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`tiptap-toolbar-btn ${active ? "is-active" : ""}`}
      aria-label={label}
      title={label}
    >
      <Icon name={icon} size={20} />
    </Button>
  );
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) return null;
  const [showCitationPicker, setShowCitationPicker] = useState(false);
  const [selectedReference, setSelectedReference] = useState<typeof mockLibrary[0] | null>(null);

  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL do link:", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const headingValue = () => {
    if (editor.isActive("heading", { level: 1 })) return "h1";
    if (editor.isActive("heading", { level: 2 })) return "h2";
    if (editor.isActive("heading", { level: 3 })) return "h3";
    return "p";
  };

  const setHeading = (value: string) => {
    if (value === "p") {
      editor.chain().focus().setParagraph().run();
      return;
    }
    const level = Number(value.replace("h", "")) as 1 | 2 | 3;
    editor.chain().focus().toggleHeading({ level }).run();
  };

  const insertCitation = () => {
    if (!selectedReference) return;

    // Format citation in ABNT style (author, year)
    const citationText = `(${selectedReference.author.split(',')[0].trim()}, ${selectedReference.year})`;

    // Insert at current cursor position
    editor.chain().focus().insertContent({
      type: "text",
      text: citationText
    }).run();

    setShowCitationPicker(false);
    setSelectedReference(null);
  };

  return (
    <div className="tiptap-toolbar" role="toolbar" aria-label="Formatação do documento">
      <div className="tiptap-toolbar-group">
        <ToolbarButton
          label="Desfazer"
          icon="undo"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        />
        <ToolbarButton
          label="Refazer"
          icon="redo"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        />
      </div>

      <div className="tiptap-toolbar-group">
        <select
          className="tiptap-toolbar-select"
          value={headingValue()}
          onChange={(e) => setHeading(e.target.value)}
          aria-label="Estilo de parágrafo"
        >
          <option value="p">Parágrafo</option>
          <option value="h1">Título 1</option>
          <option value="h2">Título 2</option>
          <option value="h3">Título 3</option>
        </select>
      </div>

      <div className="tiptap-toolbar-group">
        <ToolbarButton
          label="Negrito"
          icon="format_bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          label="Itálico"
          icon="format_italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          label="Sublinhado"
          icon="format_underlined"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
        <ToolbarButton
          label="Tachado"
          icon="format_strikethrough"
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />
      </div>

      <div className="tiptap-toolbar-group">
        <ToolbarButton
          label="Lista com marcadores"
          icon="format_list_bulleted"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          label="Lista numerada"
          icon="format_list_numbered"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <ToolbarButton
          label="Citação"
          icon="format_quote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
      </div>

      <div className="tiptap-toolbar-group">
        <ToolbarButton
          label="Alinhar à esquerda"
          icon="format_align_left"
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        />
        <ToolbarButton
          label="Centralizar"
          icon="format_align_center"
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        />
        <ToolbarButton
          label="Justificar"
          icon="format_align_justify"
          active={editor.isActive({ textAlign: "justify" })}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        />
      </div>

      <div className="tiptap-toolbar-group">
        <ToolbarButton label="Inserir link" icon="link" active={editor.isActive("link")} onClick={setLink} />
        {editor.isActive("link") && (
          <ToolbarButton
            label="Remover link"
            icon="link_off"
            onClick={() => editor.chain().focus().unsetLink().run()}
          />
        )}
        <ToolbarButton
          label="Inserir citação"
          icon="format_quote"
          onClick={() => setShowCitationPicker(true)}
        />
      </div>

      {/* Citation Picker Modal */}
      {showCitationPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 w-[320px] max-h-[80vh] overflow-y-auto">
            <h3 className="font-label-md font-bold mb-4 text-primary">Selecione uma referência</h3>

            <div className="space-y-3">
              {mockLibrary.map((ref, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${selectedReference === ref ? "border-primary" : "border-white/20"} hover:border-white/10 cursor-pointer transition-all`}
                  onClick={() => setSelectedReference(ref)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-label-sm font-semibold">{ref.title}</p>
                      <p className="text-xs text-on-surface-variant">{ref.author} · {ref.year} · {ref.type}</p>
                    </div>
                    {selectedReference === ref && (
                      <Icon name="check_circle" size={20} className="text-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/10">
              <Button
                onClick={insertCitation}
                disabled={!selectedReference}
                className={`w-full btn-${selectedReference ? "primary" : "ghost"} px-md py-2.5 font-label-md flex items-center justify-center gap-sm`}
              >
                {selectedReference ? <><Icon name="content_copy" size={18} /> Inserir citação</> : "Selecione uma referência"}
              </Button>
              <Button
                onClick={() => setShowCitationPicker(false)}
                className="w-full mt-2 btn-ghost px-md py-2 font-label-sm flex items-center justify-center gap-sm"
              >
                <Icon name="close" size={18} /> Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




