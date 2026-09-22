"use client";

import { useMemo, useState } from "react";
import type { Categoria, Veiculo } from "@/data/estoque";
import CarCard from "./CarCard";

type Filtro = "todos" | Categoria;

export default function CarGrid({ veiculos }: { veiculos: Veiculo[] }) {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const [busca, setBusca] = useState("");

  const filtrados = useMemo(() => {
    return veiculos.filter((v) => {
      const bateCategoria = filtro === "todos" || v.categoria === filtro;
      const termo = busca.trim().toLowerCase();
      const bateBusca =
        termo === "" ||
        `${v.marca} ${v.modelo} ${v.versao}`.toLowerCase().includes(termo);
      return bateCategoria && bateBusca;
    });
  }, [veiculos, filtro, busca]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {(
            [
              { valor: "todos", label: "Todos" },
              { valor: "0km", label: "0KM" },
              { valor: "seminovo", label: "Seminovos" },
            ] as { valor: Filtro; label: string }[]
          ).map((opcao) => (
            <button
              key={opcao.valor}
              type="button"
              onClick={() => setFiltro(opcao.valor)}
              className={`rounded-full border px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-wide transition-colors ${
                filtro === opcao.valor
                  ? "border-brand-lime bg-brand-lime text-brand-black"
                  : "border-white/15 text-brand-white/70 hover:border-white/40"
              }`}
            >
              {opcao.label}
            </button>
          ))}
        </div>

        <input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar marca ou modelo..."
          className="w-full rounded border border-white/15 bg-brand-surface px-4 py-2 text-sm text-brand-white placeholder:text-brand-white/40 focus:border-brand-lime focus:outline-none sm:w-64"
        />
      </div>

      {filtrados.length === 0 ? (
        <p className="py-16 text-center text-brand-white/50">
          Nenhum veículo encontrado com esse filtro.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((v) => (
            <CarCard key={v.slug} veiculo={v} />
          ))}
        </div>
      )}
    </div>
  );
}
