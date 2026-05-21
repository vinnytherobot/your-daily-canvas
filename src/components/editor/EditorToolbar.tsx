import type { Editor } from "@tiptap/react";
import { Icon } from "../Icon";

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
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`tiptap-toolbar-btn ${active ? "is-active" : ""}`}
      aria-label={label}
      title={label}
    >
      <Icon name={icon} size={20} />
    </button>
  );
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) return null;

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
      </div>
    </div>
  );
}
