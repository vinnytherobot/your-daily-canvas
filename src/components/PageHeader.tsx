import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <section className="flex flex-col gap-md md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="section-eyebrow mb-sm">{eyebrow}</p>}
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-normal">{title}</h1>
        {description && (
          <p className="font-body-md text-on-surface-variant mt-sm leading-relaxed">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-sm shrink-0">{actions}</div>}
    </section>
  );
}
