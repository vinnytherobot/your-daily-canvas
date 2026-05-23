import { createFileRoute, Link } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestPasswordReset } from "../lib/auth";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "");
    await requestPasswordReset(email);
    const token = sessionStorage.getItem("thesius:last-reset-token");
    setMessage(
      token
        ? `Token de recuperacao gerado para demo: ${token}. Use em /reset-password?token=${token}`
        : "Se o e-mail existir, enviamos instrucoes de recuperacao.",
    );
    setLoading(false);
  }

  return (
    <main className="auth-shell min-h-screen bg-background text-on-surface flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md auth-card thesius-card p-6 md:p-7 animate-scale-in">
        <p className="section-eyebrow mb-2">Recuperacao</p>
        <h1 className="font-headline-lg text-3xl mb-2 gradient-text-animated">Recuperar senha</h1>
        <p className="text-sm text-on-surface-variant mb-6">Enviaremos um link seguro para redefinicao.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input name="email" type="email" required placeholder="Seu e-mail" className="auth-field h-11" />
          <Button disabled={loading} className="btn-primary w-full py-2.5 rounded-xl">
            {loading ? "Enviando..." : "Enviar recuperacao"}
          </Button>
          {message && <p className="text-xs text-on-surface-variant leading-relaxed">{message}</p>}
        </form>
        <p className="text-sm text-on-surface-variant mt-5">
          Voltar para <Link to="/login" className="hover:text-primary">login</Link>
        </p>
      </div>
    </main>
  );
}
