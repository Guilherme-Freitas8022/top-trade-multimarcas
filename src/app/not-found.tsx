import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="font-display text-6xl font-bold text-brand-lime">404</span>
      <h1 className="mt-4 font-display text-xl font-bold uppercase text-brand-white">
        Página não encontrada
      </h1>
      <p className="mt-2 text-brand-white/60">
        O que você procura pode ter sido vendido ou o link mudou.
      </p>
      <Link href="/estoque" className="btn-primary mt-6">
        Ver estoque
      </Link>
    </div>
  );
}
