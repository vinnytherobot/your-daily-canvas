import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetPassword } from "../lib/auth";

export const Route = createFileRoute("/reset-password")({
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === "string" ? search.token : "",
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { token } = Route.useSearch();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const newPassword = String(fd.get("password") ?? "");
    const confirmPassword = String(fd.get("confirmPassword") ?? "");
    if (newPassword !== confirmPassword) {
      setLoading(false);
      setError("As senhas nao conferem.");
      return;
    }
    const result = await resetPassword({ token, newPassword });
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    await navigate({ to: "/login" });
  }

  return (
    <main className="auth-shell min-h-screen bg-background text-on-surface flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md auth-card thesius-card p-6 md:p-7 animate-scale-in">
        <p className="section-eyebrow mb-2">Seguranca</p>
        <h1 className="font-headline-lg text-3xl mb-2 gradient-text-animated">Redefinir senha</h1>
        <p className="text-sm text-on-surface-variant mb-6">Insira uma nova senha para sua conta.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input name="password" type="password" required placeholder="Nova senha" className="auth-field h-11" />
          <Input name="confirmPassword" type="password" required placeholder="Confirmar nova senha" className="auth-field h-11" />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button disabled={loading} className="btn-primary w-full py-2.5 rounded-xl">
            {loading ? "Salvando..." : "Salvar nova senha"}
          </Button>
        </form>
        <p className="text-sm text-on-surface-variant mt-5">
          Voltar para <Link to="/login" className="hover:text-primary">login</Link>
        </p>
      </div>
    </main>
  );
}
