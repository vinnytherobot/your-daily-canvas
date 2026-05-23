import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { loginWithEmail, loginWithSocial } from "../lib/auth";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === "string" ? search.redirect : "/dashboard",
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "");
    const password = String(fd.get("password") ?? "");
    const rememberMe = fd.get("remember") === "on";
    const result = await loginWithEmail({ email, password, rememberMe });
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    await navigate({ to: redirect || "/dashboard" });
  }

  async function social(provider: "google" | "github") {
    setLoading(true);
    setError(null);
    const result = await loginWithSocial(provider);
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    await navigate({ to: redirect || "/dashboard" });
  }

  return (
    <main className="auth-shell min-h-screen bg-background text-on-surface flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md auth-card thesius-card p-6 md:p-7 animate-scale-in">
        <p className="section-eyebrow mb-2">Acesso Seguro</p>
        <h1 className="font-headline-lg text-3xl mb-2 gradient-text-animated">Entrar</h1>
        <p className="text-sm text-on-surface-variant mb-6">Acesse sua conta com e-mail ou social login.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input name="email" type="email" required placeholder="E-mail" className="auth-field h-11" />
          <Input name="password" type="password" required placeholder="Senha" className="auth-field h-11" />
          <label className="flex items-center gap-2 text-sm">
            <Checkbox name="remember" />
            Manter sessao ativa
          </label>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button disabled={loading} className="btn-primary w-full py-2.5 rounded-xl">
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button onClick={() => social("google")} disabled={loading} variant="outline" className="btn-ghost py-2 rounded-xl">Google</Button>
          <Button onClick={() => social("github")} disabled={loading} variant="outline" className="btn-ghost py-2 rounded-xl">GitHub</Button>
        </div>
        <div className="text-sm text-on-surface-variant mt-5 flex justify-between">
          <Link to="/forgot-password" className="hover:text-primary">Esqueceu a senha?</Link>
          <Link to="/register" className="hover:text-primary">Criar conta</Link>
        </div>
      </div>
    </main>
  );
}
