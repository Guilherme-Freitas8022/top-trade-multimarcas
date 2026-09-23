import Link from "next/link";
import type { Veiculo } from "@/lib/veiculos";
import { formatKm, formatPreco } from "@/lib/format";
import CarThumb from "./CarThumb";

export default function CarCard({ veiculo }: { veiculo: Veiculo }) {
  return (
    <Link
      href={`/estoque/${veiculo.slug}`}
      className="group flex flex-col overflow-hidden rounded border border-white/10 bg-brand-surface transition-colors hover:border-brand-lime/50"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <CarThumb
          marca={veiculo.marca}
          modelo={veiculo.modelo}
          cor={veiculo.cor}
          fotos={veiculo.fotos}
          className="h-full w-full"
          imgClassName="transition-transform group-hover:scale-105"
        />
        <span
          className={`badge absolute left-3 top-3 ${
            veiculo.categoria === "0km" ? "badge-0km" : "badge-seminovo bg-brand-black/70"
          }`}
        >
          {veiculo.categoria === "0km" ? "0KM" : "Seminovo"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base font-semibold uppercase leading-tight text-brand-white group-hover:text-brand-lime">
          {veiculo.marca} {veiculo.modelo}
        </h3>
        <p className="mt-1 text-sm text-brand-white/55">{veiculo.versao}</p>

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-brand-white/50">
          <span>{veiculo.anoModelo}</span>
          <span>·</span>
          <span>{formatKm(veiculo.km)}</span>
          <span>·</span>
          <span>{veiculo.cambio}</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-4">
          <span className="font-display text-xl font-bold text-brand-lime">
            {formatPreco(veiculo.preco)}
          </span>
          <span className="font-display text-xs font-medium uppercase tracking-wide text-brand-white/50 group-hover:text-brand-white">
            Ver detalhes →
          </span>
        </div>
      </div>
    </Link>
  );
}
