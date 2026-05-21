import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

const NAV_MAIN = [
  { id: "projects", to: "/dashboard", label: "Projetos", icon: "dashboard" },
  { id: "editor", to: "/workspace", label: "Editor", icon: "edit_note" },
  { id: "library", to: "/library", label: "Referências", icon: "library_books" },
] as const;

const NAV_EXTRA = [
  { id: "metrics", to: "/dashboard", label: "Métricas", icon: "bar_chart" },
  { id: "settings", to: "/dashboard", label: "Configurações", icon: "settings" },
] as const;

function navIsActive(id: string, path: string): boolean {
  if (id === "projects") return path === "/dashboard";
  if (id === "editor") return path.startsWith("/workspace");
  if (id === "library") return path.startsWith("/library");
  return false;
}

export function AppShell({ children, user }: { children: ReactNode; user?: { name: string; role: string; avatar: string } }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const u = user ?? {
    name: "Marina Costa",
    role: "Plano Pro",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCF6J24-HC4bli0NsoQFB5Ci4RS2RO8iYZDyeiJ87q4_B-NDbFYgHuWsQ6ZLCNjVfJrec95RJ_blrA3_JPCExdyPMlDTkr5oMB7HSpaKR9rhKqKjgbGqd0AU8WPFil5CM-AH6xh_WHoWhLr7-ki2jEjbkwuEPqZKQLF_lu4YKwDHXZjptR62iFnKjbDDvLYU6-9U-yNuZBoeTvHfPlUyqY-KX1qQlLrATYR0briQIsnbVOkJkM_wf9jxIOiJ3bJG7ofSfVobiDFbBlD",
  };

  const NavLink = ({ id, to, label, icon }: { id: string; to: string; label: string; icon: string }) => {
    const isActive = navIsActive(id, path);
    return (
      <Link
        to={to}
        className={`flex items-center gap-md px-md py-2.5 rounded-xl transition-all duration-200 ${
          isActive ? "nav-item-active font-semibold" : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
        }`}
      >
        <Icon name={icon} size={22} fill={isActive && id === "editor"} />
        <span className="font-label-md">{label}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-background relative">
      <aside className="sidebar-elegant h-screen w-[260px] fixed left-0 top-0 z-50 flex flex-col py-lg px-md">
        <Link to="/" className="mb-xl px-sm flex items-center gap-md min-w-0 group">
          <Logo size={44} className="logo-glow transition-transform group-hover:scale-105" />
          <div className="min-w-0">
            <h1 className="font-headline-md font-bold text-primary leading-tight">Thesius</h1>
            <p className="text-[11px] text-on-surface-variant tracking-wide">Academia inteligente</p>
          </div>
        </Link>

        <nav className="flex-1 space-y-6 overflow-y-auto custom-scrollbar">
          <div>
            <p className="px-md mb-2 font-label-sm text-on-surface-variant/70 uppercase tracking-widest">Workspace</p>
            <div className="space-y-1">
              {NAV_MAIN.map((n) => (
                <NavLink key={n.id} {...n} />
              ))}
            </div>
          </div>
          <div>
            <p className="px-md mb-2 font-label-sm text-on-surface-variant/70 uppercase tracking-widest">Conta</p>
            <div className="space-y-1">
              {NAV_EXTRA.map((n) => (
                <NavLink key={n.id} {...n} />
              ))}
            </div>
          </div>
        </nav>

        <div className="mt-auto pt-lg border-t border-white/6 shrink-0 space-y-md">
          <button type="button" className="btn-primary w-full py-3 rounded-xl font-label-md flex items-center justify-center gap-sm">
            <Icon name="add" size={20} /> Novo projeto
          </button>
          <div className="flex items-center gap-md px-sm py-sm rounded-xl bg-white/3 border border-white/6">
            <img alt="" className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-primary/30" src={u.avatar} />
            <div className="min-w-0 flex-1">
              <p className="font-label-md font-semibold truncate text-on-surface">{u.name}</p>
              <p className="text-[10px] text-primary font-semibold uppercase tracking-wider">{u.role}</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="ml-[260px] flex flex-col min-h-screen relative z-10">
        <header className="flex justify-between items-center gap-md px-xl py-md h-[72px] sticky top-0 z-40 border-b border-white/6 shrink-0 surface-glass">
          <div className="relative flex-1 max-w-lg">
            <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" size={20} />
            <input
              className="w-full bg-white/4 border border-white/8 rounded-full pl-11 pr-lg py-2.5 font-body-md focus:ring-2 focus:ring-primary/25 focus:border-primary/30 outline-none placeholder:text-on-surface-variant/70 transition-shadow"
              placeholder="Buscar projetos ou referências..."
              type="search"
            />
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {[
              { icon: "notifications", label: "Notificações" },
              { icon: "history", label: "Histórico" },
              { icon: "help", label: "Ajuda" },
            ].map((b) => (
              <button
                key={b.icon}
                type="button"
                className="p-2.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-white/5 transition-colors"
                aria-label={b.label}
              >
                <Icon name={b.icon} size={22} />
              </button>
            ))}
          </div>
        </header>
        <main className="flex-1 p-xl max-w-[1400px] w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}

export { Icon } from "./Icon";
