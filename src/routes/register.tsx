import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginWithEmail, registerWithEmail } from "../lib/auth";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "");
    const email = String(fd.get("email") ?? "");
    const password = String(fd.get("password") ?? "");
    const confirmPassword = String(fd.get("confirmPassword") ?? "");
    if (password !== confirmPassword) {
      setLoading(false);
      setError("As senhas nao conferem.");
      return;
    }
    const registerResult = await registerWithEmail({ name, email, password });
    if (!registerResult.ok) {
      setLoading(false);
      setError(registerResult.error);
      return;
    }
    const loginResult = await loginWithEmail({ email, password, rememberMe: true });
    setLoading(false);
    if (!loginResult.ok) {
      setError(loginResult.error);
      return;
    }
    await navigate({ to: "/dashboard" });
  }

  return (
    <main className="auth-shell min-h-screen bg-background text-on-surface flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md auth-card thesius-card p-6 md:p-7 animate-scale-in">
        <p className="section-eyebrow mb-2">Bem-vindo</p>
        <h1 className="font-headline-lg text-3xl mb-2 gradient-text-animated">Criar conta</h1>
        <p className="text-sm text-on-surface-variant mb-6">Cadastro com validacao de credenciais.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input name="name" type="text" required placeholder="Nome completo" className="auth-field h-11" />
          <Input name="email" type="email" required placeholder="E-mail" className="auth-field h-11" />
          <Input name="password" type="password" required placeholder="Senha (min. 8, maiuscula, minuscula, numero)" className="auth-field h-11" />
          <Input name="confirmPassword" type="password" required placeholder="Confirmar senha" className="auth-field h-11" />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button disabled={loading} className="btn-primary w-full py-2.5 rounded-xl">
            {loading ? "Criando..." : "Criar conta"}
          </Button>
        </form>
        <p className="text-sm text-on-surface-variant mt-5">
          Ja tem conta? <Link to="/login" className="hover:text-primary">Entrar</Link>
        </p>
      </div>
    </main>
  );
}
