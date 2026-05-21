import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

const Icon = ({ name, className = "", fill }: { name: string; className?: string; fill?: boolean }) => (
  <span className={`material-symbols-outlined ${className}`} style={fill ? { fontVariationSettings: "'FILL' 1" } : undefined}>{name}</span>
);

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { to: "/workspace", label: "Workspace", icon: "edit_note" },
  { to: "/advisor", label: "Library", icon: "book_4" },
  { to: "/dashboard", label: "Analytics", icon: "bar_chart" },
  { to: "/dashboard", label: "Settings", icon: "settings" },
] as const;

export function AppShell({ children, user }: { children: ReactNode; user?: { name: string; role: string; avatar: string } }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const u = user ?? {
    name: "Dr. Aris Thorne",
    role: "Premium Plan",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCF6J24-HC4bli0NsoQFB5Ci4RS2RO8iYZDyeiJ87q4_B-NDbFYgHuWsQ6ZLCNjVfJrec95RJ_blrA3_JPCExdyPMlDTkr5oMB7HSpaKR9rhKqKjgbGqd0AU8WPFil5CM-AH6xh_WHoWhLr7-ki2jEjbkwuEPqZKQLF_lu4YKwDHXZjptR62iFnKjbDDvLYU6-9U-yNuZBoeTvHfPlUyqY-KX1qQlLrATYR0briQIsnbVOkJkM_wf9jxIOiJ3bJG7ofSfVobiDFbBlD",
  };

  return (
    <div>
      <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low shadow-[0_4px_20px_rgba(0,0,0,0.04)] z-50 flex flex-col py-lg px-md">
        <Link to="/" className="mb-xl px-sm flex items-center gap-sm">
          <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg">
            <Icon name="school" className="text-on-primary" />
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-primary leading-tight">Thesius</h1>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Academic Pro</p>
          </div>
        </Link>
        <nav className="flex-1 space-y-xs">
          {NAV.map((n, i) => {
            const active = path === n.to || (n.to === "/dashboard" && path === "/dashboard");
            const isActive = i === 0 ? path.startsWith("/dashboard") : i === 1 ? path.startsWith("/workspace") : i === 2 ? path.startsWith("/advisor") : false;
            void active;
            return (
              <Link key={n.label + i} to={n.to}
                className={`flex items-center gap-md px-md py-sm rounded-lg transition-colors duration-200 ${isActive ? "text-primary font-bold border-r-2 border-primary bg-surface-variant/30" : "text-on-surface-variant hover:bg-surface-variant"}`}>
                <Icon name={n.icon} />
                <span className="font-label-md text-label-md">{n.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto pt-lg border-t border-outline-variant/10">
          <button className="w-full bg-primary text-on-primary py-md rounded-xl font-label-md text-label-md flex items-center justify-center gap-sm academic-glow transition-transform active:scale-95">
            <Icon name="add" /> New Project
          </button>
          <div className="mt-lg flex items-center gap-md px-sm">
            <img alt="User" className="w-10 h-10 rounded-full object-cover" src={u.avatar} />
            <div>
              <p className="font-label-md text-label-md font-bold">{u.name}</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">{u.role}</p>
            </div>
          </div>
        </div>
      </aside>
      <header className="flex justify-between items-center px-lg py-sm h-16 ml-64 sticky top-0 z-40 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/20">
        <div className="relative flex-1 max-w-md">
          <Icon name="search" className="absolute left-md top-1/2 -translate-y-1/2 text-outline" />
          <input className="bg-surface-container-low border-none rounded-full pl-xl pr-lg py-xs w-full font-body-md text-body-md focus:ring-2 focus:ring-secondary/20 outline-none" placeholder="Search projects or sources..." />
        </div>
        <div className="flex items-center gap-xs">
          <button className="p-xs rounded-full hover:bg-surface-variant"><Icon name="notifications" className="text-on-surface-variant" /></button>
          <button className="p-xs rounded-full hover:bg-surface-variant"><Icon name="history" className="text-on-surface-variant" /></button>
          <button className="p-xs rounded-full hover:bg-surface-variant"><Icon name="help" className="text-on-surface-variant" /></button>
        </div>
      </header>
      <main className="ml-64 p-lg">{children}</main>
    </div>
  );
}

export { Icon };
