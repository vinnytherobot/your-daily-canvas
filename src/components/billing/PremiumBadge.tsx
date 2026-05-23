import { Icon } from "../Icon";

/** Small badge indicating a premium-only feature */
export function PremiumBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/15 text-primary border border-primary/25 ${className}`}
    >
      <Icon name="workspace_premium" size={12} />
      Pro
    </span>
  );
}
