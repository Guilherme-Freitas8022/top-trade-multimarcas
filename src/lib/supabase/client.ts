"use client";

// Cliente Supabase do navegador — sempre singleton por módulo (nunca criar
// um novo a cada chamada, senão várias instâncias competem pela mesma
// sessão no localStorage — ver Escritorio/Boas_Praticas/boas_praticas_dev.md).
import { createBrowserClient } from "@supabase/ssr";

let cliente: ReturnType<typeof createBrowserClient> | null = null;

export function supabaseBrowser() {
  if (!cliente) {
    cliente = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
  }
  return cliente;
}
