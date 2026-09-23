// Cliente Supabase para Server Components / Server Actions — usa os
// cookies da requisição para saber se o usuário está logado. Criar um novo
// a cada requisição (diferente do cliente do navegador) é o padrão correto
// aqui, pois cada requisição pode ter cookies diferentes.
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function supabaseServer() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Chamado a partir de um Server Component sem permissão de
            // escrita — o middleware já cuida de renovar a sessão.
          }
        },
      },
    },
  );
}
