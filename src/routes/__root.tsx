import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { thesiusTailwindConfig, thesiusGlobalCss } from "../lib/thesius-tailwind";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center animate-fade-in-up">
        <div className="w-24 h-24 mx-auto mb-lg rounded-3xl bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary" style={{ fontSize: 48 }} aria-hidden>search_off</span>
        </div>
        <h1 className="font-display-lg text-7xl font-bold gradient-text-animated">404</h1>
        <p className="mt-sm text-on-surface-variant text-lg">Esta página não existe ou foi movida.</p>
        <div className="mt-xl flex flex-col sm:flex-row gap-sm justify-center">
          <Link to="/" className="btn-primary px-lg py-2.5 rounded-xl font-label-md inline-flex items-center justify-center gap-sm">
            <span className="material-symbols-outlined" style={{ fontSize: 20 }} aria-hidden>home</span>
            Página inicial
          </Link>
          <Link to="/dashboard" className="btn-ghost px-lg py-2.5 rounded-xl font-label-md inline-flex items-center justify-center gap-sm">
            <span className="material-symbols-outlined" style={{ fontSize: 20 }} aria-hidden>dashboard</span>
            Meus projetos
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-background">
      <div className="max-w-lg text-center animate-fade-in-up">
        <div className="w-20 h-20 mx-auto mb-lg rounded-2xl bg-error/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-error" style={{ fontSize: 40 }} aria-hidden>error_outline</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-sm">Algo deu errado</h1>
        <div className="thesius-card p-md mb-lg text-left">
          <p className="text-xs text-on-surface-variant font-mono break-all leading-relaxed">{error.message}</p>
        </div>
        <div className="flex gap-sm justify-center">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-primary px-lg py-2.5 rounded-xl font-label-md inline-flex items-center gap-sm">
            <span className="material-symbols-outlined" style={{ fontSize: 20 }} aria-hidden>refresh</span>
            Tentar novamente
          </button>
          <Link to="/" className="btn-ghost px-lg py-2.5 rounded-xl font-label-md">Voltar ao início</Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Thesius | O Futuro da Escrita Acadêmica" },
      { name: "description", content: "Workspace inteligente para escrita acadêmica com IA." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,400&family=Manrope:wght@500;600;700;800&display=swap",
      },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" },
    ],
    scripts: [
      { src: "https://cdn.tailwindcss.com?plugins=forms,container-queries" },
      { children: thesiusTailwindConfig },
      { children: `document.addEventListener('DOMContentLoaded',function(){if(!('IntersectionObserver'in window))return;var o=new IntersectionObserver(function(e){e.forEach(function(i){if(i.isIntersecting){i.target.classList.add('visible');o.unobserve(i.target)}})},{threshold:0.12,rootMargin:'0px 0px -40px 0px'});document.querySelectorAll('.reveal,.reveal-scale').forEach(function(el){o.observe(el)})});` },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <HeadContent />
        <style dangerouslySetInnerHTML={{ __html: thesiusGlobalCss }} />
      </head>
      <body className="bg-background text-on-surface font-body-md antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
