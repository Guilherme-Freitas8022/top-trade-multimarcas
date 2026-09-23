"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase/client";
import Logo from "@/components/Logo";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setCarregando(true);

    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });

    setCarregando(false);
    if (error) {
      setErro("E-mail ou senha incorretos.");
      return;
    }

    const proximo = searchParams.get("proximo") || "/admin";
    router.push(proximo);
    router.refresh();
  }

  return (
    <form
      onSubmit={entrar}
      className="mt-10 w-full max-w-sm rounded border border-white/10 bg-brand-surface p-8"
    >
      <h1 className="font-display text-lg font-bold uppercase text-brand-white">
        Área do vendedor
      </h1>
      <p className="mt-1 text-sm text-brand-white/50">
        Entre para cadastrar e editar o estoque.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wide text-brand-white/50">
            E-mail
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded border border-white/15 bg-brand-black px-4 py-2 text-sm text-brand-white focus:border-brand-lime focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wide text-brand-white/50">
            Senha
          </label>
          <input
            type="password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="mt-1 w-full rounded border border-white/15 bg-brand-black px-4 py-2 text-sm text-brand-white focus:border-brand-lime focus:outline-none"
          />
        </div>
      </div>

      {erro && <p className="mt-4 text-sm text-red-400">{erro}</p>}

      <button type="submit" disabled={carregando} className="btn-primary mt-6 w-full disabled:opacity-60">
        {carregando ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-5 py-16">
      <Link href="/">
        <Logo />
      </Link>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
