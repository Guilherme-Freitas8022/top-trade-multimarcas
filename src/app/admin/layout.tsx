import Link from "next/link";
import { supabaseServer } from "@/lib/supabase/server";
import { sair } from "./actions";
import Logo from "@/components/Logo";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-brand-black">
      <header className="border-b border-white/10 bg-brand-surface">
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/admin">
            <Logo size="compact" />
          </Link>
          <div className="flex items-center gap-4 text-sm text-brand-white/60">
            <span className="hidden sm:inline">{user?.email}</span>
            <form action={sair}>
              <button
                type="submit"
                className="rounded border border-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-white/70 hover:border-brand-lime hover:text-brand-lime"
              >
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="container-page py-10">{children}</main>
    </div>
  );
}
