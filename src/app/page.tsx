import Link from "next/link";
import Hero from "@/components/Hero";
import CarCard from "@/components/CarCard";
import { getDestaques } from "@/data/estoque";
import { linkWhatsApp, siteConfig } from "@/data/site-config";
import { diferenciais } from "@/data/diferenciais";

export default function HomePage() {
  const destaques = getDestaques();

  return (
    <>
      <Hero />

      <section className="container-page py-16 sm:py-20">
        <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-display text-xs font-semibold uppercase tracking-widest text-brand-lime">
              Estoque
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold uppercase text-brand-white sm:text-3xl">
              Destaques da semana
            </h2>
          </div>
          <Link
            href="/estoque"
            className="font-display text-sm font-semibold uppercase tracking-wide text-brand-white/70 hover:text-brand-lime"
          >
            Ver estoque completo →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destaques.map((v) => (
            <CarCard key={v.slug} veiculo={v} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-brand-surface">
        <div className="container-page py-16 sm:py-20">
          <span className="font-display text-xs font-semibold uppercase tracking-widest text-brand-lime">
            Por que a Top Trade
          </span>
          <h2 className="mt-2 max-w-lg font-display text-2xl font-bold uppercase text-brand-white sm:text-3xl">
            25 anos de confiança realizando sonhos
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {diferenciais.map((d) => (
              <div key={d.titulo}>
                <div className="h-1 w-10 bg-brand-lime" />
                <h3 className="mt-4 font-display text-base font-semibold uppercase text-brand-white">
                  {d.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-white/60">
                  {d.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 text-center sm:py-20">
        <h2 className="font-display text-2xl font-bold uppercase text-brand-white sm:text-3xl">
          Não achou o carro ideal no estoque?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-brand-white/60">
          Fale com a gente — a {siteConfig.nome} está no mercado há mais de
          25 anos e pode buscar o carro certo para você.
        </p>
        <a
          href={linkWhatsApp("Olá! Não encontrei o carro que eu queria no site, vocês podem me ajudar?")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-6 inline-flex"
        >
          Falar no WhatsApp
        </a>
      </section>
    </>
  );
}
