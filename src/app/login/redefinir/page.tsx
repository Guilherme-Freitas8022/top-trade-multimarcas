"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { AuthChangeEvent } from "@supabase/supabase-js";
import { supabaseBrowser } from "@/lib/supabase/client";
import Logo from "@/components/Logo";

export default function RedefinirSenhaPage() {
  const router = useRouter();
  const [pronto, setPronto] = useState(false);
  const [senha, setSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    const supabase = supabaseBrowser();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((evento: AuthChangeEvent) => {
      if (evento === "PASSWORD_RECOVERY") setPronto(true);
    });

    (async () => {
      const resultado = await supabase.auth.getSession();
      if (resultado.data.session) setPronto(true);
    })();

    return () => subscription.unsubscribe();
  }, []);

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    if (senha.length < 8) {
      setErro("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }
    if (senha !== confirmacao) {
      setErro("As senhas não são iguais.");
      return;
    }

    setSalvando(true);
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.updateUser({ password: senha });
    setSalvando(false);

    if (error) {
      setErro("Não foi possível salvar a nova senha. Tente pedir o link de novo.");
      return;
    }

    setSucesso(true);
    setTimeout(() => {
      router.push("/admin");
      router.refresh();
    }, 1500);
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-5 py-16">
      <Link href="/">
        <Logo />
      </Link>

      <div className="mt-10 w-full max-w-sm rounded border border-white/10 bg-brand-surface p-8">
        <h1 className="font-display text-lg font-bold uppercase text-brand-white">
          Criar nova senha
        </h1>

        {!pronto && (
          <p className="mt-4 text-sm text-brand-white/50">
            Abra este link pelo e-mail de recuperação de senha que você recebeu.
          </p>
        )}

        {pronto && !sucesso && (
          <form onSubmit={salvar} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wide text-brand-white/50">
                Nova senha
              </label>
              <input
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="mt-1 w-full rounded border border-white/15 bg-brand-black px-4 py-2 text-sm text-brand-white focus:border-brand-lime focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide text-brand-white/50">
                Confirmar nova senha
              </label>
              <input
                type="password"
                required
                value={confirmacao}
                onChange={(e) => setConfirmacao(e.target.value)}
                className="mt-1 w-full rounded border border-white/15 bg-brand-black px-4 py-2 text-sm text-brand-white focus:border-brand-lime focus:outline-none"
              />
            </div>

            {erro && <p className="text-sm text-red-400">{erro}</p>}

            <button type="submit" disabled={salvando} className="btn-primary w-full disabled:opacity-60">
              {salvando ? "Salvando..." : "Salvar nova senha"}
            </button>
          </form>
        )}

        {sucesso && (
          <p className="mt-4 text-sm text-brand-lime">
            Senha alterada! Te levando pro painel...
          </p>
        )}
      </div>
    </div>
  );
}
