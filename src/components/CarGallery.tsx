"use client";

import { useState } from "react";
import CarIllustration, { type Angulo } from "./CarIllustration";
import { corVeiculo } from "@/lib/cores";

const ANGULOS: { valor: Angulo; label: string }[] = [
  { valor: "lateral", label: "Lateral" },
  { valor: "frente", label: "Frente" },
  { valor: "traseira", label: "Traseira" },
];

export default function CarGallery({
  marca,
  modelo,
  cor,
}: {
  marca: string;
  modelo: string;
  cor: string;
}) {
  const [angulo, setAngulo] = useState<Angulo>("lateral");
  const hex = corVeiculo(cor);

  return (
    <div>
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded border border-white/10 bg-brand-surface2">
        <div className="pointer-events-none absolute inset-0 bg-diagonal-lime opacity-[0.05]" />
        <CarIllustration angulo={angulo} cor={hex} className="h-3/4 w-3/4" />
        <span className="absolute bottom-2 left-2 rounded-sm bg-black/55 px-1.5 py-0.5 font-body text-[9px] uppercase tracking-wide text-brand-white/40">
          Ilustração — {marca} {modelo}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3">
        {ANGULOS.map((a) => (
          <button
            key={a.valor}
            type="button"
            onClick={() => setAngulo(a.valor)}
            className={`flex flex-col items-center gap-1 rounded border bg-brand-surface2 py-3 transition-colors ${
              angulo === a.valor
                ? "border-brand-lime"
                : "border-white/10 hover:border-white/30"
            }`}
          >
            <CarIllustration angulo={a.valor} cor={hex} className="h-10 w-16" />
            <span
              className={`font-display text-[10px] font-semibold uppercase tracking-wide ${
                angulo === a.valor ? "text-brand-lime" : "text-brand-white/50"
              }`}
            >
              {a.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
