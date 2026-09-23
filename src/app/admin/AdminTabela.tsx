"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Veiculo } from "@/lib/veiculos";
import { formatKm, formatPreco } from "@/lib/format";
import ExcluirBotao from "./ExcluirBotao";
import VendidoBotao from "./VendidoBotao";

export default function AdminTabela({ veiculos }: { veiculos: Veiculo[] }) {
  const [busca, setBusca] = useState("");

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return veiculos;
    return veiculos.filter((v) =>
      `${v.marca} ${v.modelo} ${v.versao} ${v.cor}`.toLowerCase().includes(termo),
    );
  }, [veiculos, busca]);

  return (
    <div>
      <input
        type="search"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar por marca, modelo, versão ou cor..."
        className="input max-w-sm"
      />

      <p className="mt-3 text-xs text-brand-white/40">
        {filtrados.length} de {veiculos.length} veículos
      </p>

      <div className="mt-3 overflow-x-auto rounded border border-white/10">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-brand-surface text-left text-xs uppercase tracking-wide text-brand-white/50">
              <th className="px-4 py-3">Foto</th>
              <th className="px-4 py-3">Veículo</th>
              <th className="px-4 py-3">Preço</th>
              <th className="px-4 py-3">Km</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((v) => (
              <tr key={v.id} className="border-b border-white/5 text-brand-white/80">
                <td className="px-4 py-3">
                  <div className="relative h-12 w-16 overflow-hidden rounded bg-brand-surface2">
                    {v.fotos[0] && (
                      <Image src={v.fotos[0]} alt={v.modelo} fill className="object-cover" />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-brand-white">
                    {v.marca} {v.modelo}
                  </div>
                  <div className="text-xs text-brand-white/50">{v.versao}</div>
                </td>
                <td className="px-4 py-3">{formatPreco(v.preco)}</td>
                <td className="px-4 py-3">{formatKm(v.km)}</td>
                <td className="px-4 py-3">
                  <VendidoBotao id={v.id} vendido={v.vendido} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/${v.slug}/editar`}
                      className="text-xs font-semibold uppercase tracking-wide text-brand-lime hover:underline"
                    >
                      Editar
                    </Link>
                    <ExcluirBotao id={v.id} nome={`${v.marca} ${v.modelo}`} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtrados.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-brand-white/50">
            Nenhum veículo encontrado para &quot;{busca}&quot;.
          </p>
        )}
      </div>
    </div>
  );
}
