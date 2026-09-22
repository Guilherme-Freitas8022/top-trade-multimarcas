import Link from "next/link";
import { linkWhatsApp, siteConfig } from "@/data/site-config";
import { getDestaques } from "@/data/estoque";
import CarPhotoPlaceholder from "./CarPhotoPlaceholder";

export default function Hero() {
  const destaques = getDestaques().slice(0, 3);
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-brand-black">
      <div className="pointer-events-none absolute inset-0 bg-diagonal-lime opacity-[0.05]" />
      <div className="container-page relative flex flex-col gap-10 py-16 sm:py-24 lg:flex-row lg:items-center lg:py-28">
        <div className="max-w-xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="badge badge-0km">{siteConfig.tagline}</span>
            <span className="inline-flex items-center gap-1 text-sm text-brand-white/70">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="#C6FF00" aria-hidden="true">
                <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L10 1.5Z" />
              </svg>
              {siteConfig.google.nota.toLocaleString("pt-BR")} no Google · {siteConfig.google.avaliacoes} avaliações
            </span>
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-brand-white sm:text-5xl lg:text-6xl">
            Seu carro novo está{" "}
            <span className="text-brand-lime">aqui na Top Trade</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-brand-white/65 sm:text-lg">
            {siteConfig.slogan}. Vende, troca e financia 0KM e seminovos com
            procedência em Volta Redonda/RJ — financiamento em até 60x sem
            entrada.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/estoque" className="btn-primary">
              Ver estoque completo
            </Link>
            <a
              href={linkWhatsApp("Olá! Vim pelo site e queria falar com um vendedor.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Falar com um vendedor
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            <div>
              <dt className="font-display text-3xl font-bold text-brand-lime">25+</dt>
              <dd className="mt-1 text-xs uppercase tracking-wide text-brand-white/50">
                Anos de mercado
              </dd>
            </div>
            <div>
              <dt className="font-display text-3xl font-bold text-brand-lime">0KM</dt>
              <dd className="mt-1 text-xs uppercase tracking-wide text-brand-white/50">
                Pioneira na região
              </dd>
            </div>
            <div>
              <dt className="font-display text-3xl font-bold text-brand-lime">100%</dt>
              <dd className="mt-1 text-xs uppercase tracking-wide text-brand-white/50">
                Estoque com laudo cautelar
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-4 lg:mx-0">
          {destaques[0] && (
            <CarPhotoPlaceholder
              marca={destaques[0].marca}
              modelo={destaques[0].modelo}
              cor={destaques[0].cor}
              angulo="lateral"
              className="col-span-2 h-40 rounded border border-white/10"
            />
          )}
          {destaques[1] && (
            <CarPhotoPlaceholder
              marca={destaques[1].marca}
              modelo={destaques[1].modelo}
              cor={destaques[1].cor}
              angulo="frente"
              className="h-32 rounded border border-white/10"
            />
          )}
          {destaques[2] && (
            <CarPhotoPlaceholder
              marca={destaques[2].marca}
              modelo={destaques[2].modelo}
              cor={destaques[2].cor}
              angulo="traseira"
              className="h-32 rounded border-2 border-brand-lime"
            />
          )}
        </div>
      </div>
    </section>
  );
}
