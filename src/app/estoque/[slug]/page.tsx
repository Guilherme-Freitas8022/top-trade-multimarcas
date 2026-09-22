import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { estoque, getVeiculoBySlug } from "@/data/estoque";
import { formatKm, formatPreco } from "@/lib/format";
import { linkWhatsApp, siteConfig } from "@/data/site-config";
import CarGallery from "@/components/CarGallery";
import CarCard from "@/components/CarCard";

export function generateStaticParams() {
  return estoque.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const veiculo = getVeiculoBySlug(slug);
  if (!veiculo) return { title: "Veículo não encontrado" };

  const titulo = `${veiculo.marca} ${veiculo.modelo} ${veiculo.anoModelo}`;
  return {
    title: titulo,
    description: `${titulo} — ${veiculo.versao}, ${formatKm(veiculo.km)}, por ${formatPreco(
      veiculo.preco,
    )}. Disponível na ${siteConfig.nome} em Volta Redonda/RJ.`,
  };
}

export default async function VeiculoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const veiculo = getVeiculoBySlug(slug);
  if (!veiculo) notFound();

  const relacionados = estoque
    .filter((v) => v.slug !== veiculo.slug && v.categoria === veiculo.categoria)
    .slice(0, 3);

  const mensagem = `Olá! Tenho interesse no ${veiculo.marca} ${veiculo.modelo} ${veiculo.versao} (${veiculo.anoModelo}) anunciado no site.`;

  return (
    <div className="container-page py-10 sm:py-16">
      <Link
        href="/estoque"
        className="font-display text-xs font-semibold uppercase tracking-wide text-brand-white/50 hover:text-brand-lime"
      >
        ← Voltar ao estoque
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <CarGallery marca={veiculo.marca} modelo={veiculo.modelo} cor={veiculo.cor} />
        </div>

        <div className="lg:col-span-2">
          <span className={`badge ${veiculo.categoria === "0km" ? "badge-0km" : "badge-seminovo bg-brand-surface"}`}>
            {veiculo.categoria === "0km" ? "0KM" : "Seminovo"}
          </span>

          <h1 className="mt-3 font-display text-3xl font-bold uppercase leading-tight text-brand-white">
            {veiculo.marca} {veiculo.modelo}
          </h1>
          <p className="mt-1 text-brand-white/60">{veiculo.versao}</p>

          <p className="mt-6 font-display text-4xl font-bold text-brand-lime">
            {formatPreco(veiculo.preco)}
          </p>

          <a
            href={linkWhatsApp(mensagem)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6 w-full"
          >
            Tenho interesse — falar no WhatsApp
          </a>

          <dl className="mt-8 grid grid-cols-2 gap-y-4 border-t border-white/10 pt-6">
            <div>
              <dt className="text-xs uppercase tracking-wide text-brand-white/40">Ano/Modelo</dt>
              <dd className="mt-1 text-sm text-brand-white">{veiculo.ano}/{veiculo.anoModelo}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-brand-white/40">Km</dt>
              <dd className="mt-1 text-sm text-brand-white">{formatKm(veiculo.km)}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-brand-white/40">Câmbio</dt>
              <dd className="mt-1 text-sm text-brand-white">{veiculo.cambio}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-brand-white/40">Combustível</dt>
              <dd className="mt-1 text-sm text-brand-white">{veiculo.combustivel}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-brand-white/40">Portas</dt>
              <dd className="mt-1 text-sm text-brand-white">{veiculo.portas}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-brand-white/40">Cor</dt>
              <dd className="mt-1 text-sm text-brand-white">{veiculo.cor}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-brand-lime">
            Sobre este veículo
          </h2>
          <p className="mt-3 leading-relaxed text-brand-white/70">{veiculo.descricao}</p>

          <h3 className="mt-8 font-display text-sm font-semibold uppercase tracking-wide text-brand-lime">
            Opcionais
          </h3>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-brand-white/70">
            {veiculo.opcionais.map((op) => (
              <li key={op} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-brand-lime" />
                {op}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {relacionados.length > 0 && (
        <div className="mt-16 border-t border-white/10 pt-10">
          <h2 className="font-display text-xl font-bold uppercase text-brand-white">
            Outras opções parecidas
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relacionados.map((v) => (
              <CarCard key={v.slug} veiculo={v} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
