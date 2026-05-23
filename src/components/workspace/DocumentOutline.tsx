import { Icon } from "../Icon";
import type { OutlineItem } from "../../lib/document-outline";
import { Button } from "@/components/ui/button";

type DocumentOutlineProps = {
  items: OutlineItem[];
  activeId: string | null;
  collapsed: Set<string>;
  onToggleCollapse: (id: string) => void;
  onSelect: (item: OutlineItem) => void;
  onAddSection?: () => void;
};

function hasChildren(items: OutlineItem[], index: number): boolean {
  const next = items[index + 1];
  const current = items[index];
  return !!next && !!current && next.level > current.level;
}

function isVisible(items: OutlineItem[], index: number, collapsed: Set<string>): boolean {
  const item = items[index];
  for (let i = index - 1; i >= 0; i--) {
    const ancestor = items[i];
    if (ancestor.level < item.level && collapsed.has(ancestor.id)) return false;
  }
  return true;
}

export function DocumentOutline({
  items,
  activeId,
  collapsed,
  onToggleCollapse,
  onSelect,
  onAddSection,
}: DocumentOutlineProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-md px-sm">
        <p className="text-xs text-on-surface-variant leading-relaxed">
          Use <strong className="text-primary">Título 1, 2 ou 3</strong> na barra do editor para criar tópicos e subtópicos.
        </p>
        {onAddSection && (
          <Button type="button" onClick={onAddSection} className="mt-sm text-xs text-primary hover:underline">
            + Inserir tópico
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-0.5">
      {items.map((item, index) => {
        if (!isVisible(items, index, collapsed)) return null;

        const isActive = activeId === item.id;
        const isCollapsed = collapsed.has(item.id);
        const showExpand = hasChildren(items, index);

        return (
          <div key={item.id} className="flex items-stretch" style={{ paddingLeft: `${item.depth * 12}px` }}>
            <Button
              type="button"
              onClick={() => onSelect(item)}
              className={`flex-1 flex items-center gap-xs py-1.5 px-2 text-left rounded-lg transition-colors min-w-0 group ${
                isActive
                  ? "bg-primary/15 text-primary font-semibold ring-1 ring-primary/25"
                  : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
              }`}
            >
              {showExpand ? (
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleCollapse(item.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.stopPropagation();
                      onToggleCollapse(item.id);
                    }
                  }}
                  className="shrink-0 rounded hover:bg-white/10 p-0.5"
                  aria-label={isCollapsed ? "Expandir" : "Recolher"}
                >
                  <Icon name={isCollapsed ? "chevron_right" : "expand_more"} size={16} />
                </span>
              ) : (
                <span className="w-5 shrink-0 flex justify-center">
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-primary" : "bg-white/20"}`} />
                </span>
              )}
              <span className="font-label-md truncate flex-1" title={item.title}>
                {item.title}
              </span>
              <span className="text-[9px] font-bold text-on-surface-variant/40 uppercase shrink-0">
                H{item.level}
              </span>
            </Button>
          </div>
        );
      })}
    </div>
  );
}




