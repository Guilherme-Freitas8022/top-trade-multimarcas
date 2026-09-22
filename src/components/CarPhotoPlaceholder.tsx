// Sem fotos reais do estoque ainda — usa uma ilustração vetorial do carro
// (na cor cadastrada) em vez de deixar a área vazia ou usar banco de imagens
// genérico. Ver src/components/CarIllustration.tsx.
// Trocar por `next/image` com fotos reais assim que o cliente enviar.

import CarIllustration, { type Angulo } from "./CarIllustration";
import { corVeiculo } from "@/lib/cores";

export default function CarPhotoPlaceholder({
  marca,
  modelo,
  cor,
  angulo = "lateral",
  className = "",
}: {
  marca: string;
  modelo: string;
  cor: string;
  angulo?: Angulo;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-brand-surface2 ${className}`}
      role="img"
      aria-label={`Ilustração do ${marca} ${modelo}`}
    >
      <div className="absolute inset-0 bg-diagonal-lime opacity-[0.05]" />
      <CarIllustration angulo={angulo} cor={corVeiculo(cor)} className="h-3/4 w-3/4" />
      <span className="absolute bottom-2 left-2 rounded-sm bg-black/55 px-1.5 py-0.5 font-body text-[9px] uppercase tracking-wide text-brand-white/40">
        Ilustração
      </span>
    </div>
  );
}
