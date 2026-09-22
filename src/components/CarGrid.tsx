"use client";

import { useMemo, useState } from "react";
import type { Categoria, Veiculo } from "@/data/estoque";
import CarCard from "./CarCard";

type Filtro = "todos" | Categoria;
type VeiculoComFoto = Veiculo & { fotoReal: boolean };

const ANOS_MINIMOS = [
  { valor: "0", label: "Qualquer ano" },
  { valor: "2022", label: "2022 ou mais novo" },
  { valor: "2020", label: "2020 ou mais novo" },
  { valor: "2018", label: "2018 ou mais novo" },
  { valor: "2015", label: "2015 ou mais novo" },
];

const FAIXAS_PRECO = [
  { valor: "todos", label: "Qualquer preço", min: 0, max: Infinity },
  { valor: "ate-50", label: "Até R$ 50 mil", min: 0, max: 50000 },
  { valor: "50-100", label: "R$ 50 mil – R$ 100 mil", min: 50000, max: 100000 },
  { valor: "100-150", label: "R$ 100 mil – R$ 150 mil", min: 100000, max: 150000 },
  { valor: "acima-150", label: "Acima de R$ 150 mil", min: 150000, max: Infinity },
];

type Ordenacao = "relevancia" | "menor-preco" | "maior-preco" | "mais-novo" | "menor-km";

const ORDENACOES: { valor: Ordenacao; label: string }[] = [
  { valor: "relevancia", label: "Mais relevantes" },
  { valor: "menor-preco", label: "Menor preço" },
  { valor: "maior-preco", label: "Maior preço" },
  { valor: "mais-novo", label: "Mais novo" },
  { valor: "menor-km", label: "Menor km" },
];

export default function CarGrid({ veiculos }: { veiculos: VeiculoComFoto[] }) {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const [busca, setBusca] = useState("");
  const [marca, setMarca] = useState("todas");
  const [anoMinimo, setAnoMinimo] = useState("0");
  const [faixaPreco, setFaixaPreco] = useState("todos");
  const [ordenacao, setOrdenacao] = useState<Ordenacao>("relevancia");

  const marcas = useMemo(() => {
    const unicas = Array.from(new Set(veiculos.map((v) => v.marca)));
    return unicas.sort((a, b) => a.localeCompare(b, "pt-BR"));
  }, [veiculos]);

  const faixa = FAIXAS_PRECO.find((f) => f.valor === faixaPreco) ?? FAIXAS_PRECO[0];

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    const anoMin = Number(anoMinimo);
    return veiculos.filter((v) => {
      const bateCategoria = filtro === "todos" || v.categoria === filtro;
      const bateBusca =
        termo === "" || `${v.marca} ${v.modelo} ${v.versao}`.toLowerCase().includes(termo);
      const bateMarca = marca === "todas" || v.marca === marca;
      const bateAno = anoMin === 0 || v.anoModelo >= anoMin;
      const batePreco = v.preco >= faixa.min && v.preco <= faixa.max;
      return bateCategoria && bateBusca && bateMarca && bateAno && batePreco;
    });
  }, [veiculos, filtro, busca, marca, anoMinimo, faixa]);

  const ordenados = useMemo(() => {
    const lista = [...filtrados];
    switch (ordenacao) {
      case "menor-preco":
        return lista.sort((a, b) => a.preco - b.preco);
      case "maior-preco":
        return lista.sort((a, b) => b.preco - a.preco);
      case "mais-novo":
        return lista.sort((a, b) => b.anoModelo - a.anoModelo);
      case "menor-km":
        return lista.sort((a, b) => a.km - b.km);
      default:
        return lista;
    }
  }, [filtrados, ordenacao]);

  const filtrosAtivos =
    filtro !== "todos" || busca !== "" || marca !== "todas" || anoMinimo !== "0" || faixaPreco !== "todos";

  function limparFiltros() {
    setFiltro("todos");
    setBusca("");
    setMarca("todas");
    setAnoMinimo("0");
    setFaixaPreco("todos");
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
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

          {filtrosAtivos && (
            <button
              type="button"
              onClick={limparFiltros}
              className="ml-1 font-display text-xs font-semibold uppercase tracking-wide text-brand-white/50 underline-offset-2 hover:text-brand-lime hover:underline"
            >
              Limpar filtros
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar marca ou modelo..."
            className="rounded border border-white/15 bg-brand-surface px-4 py-2 text-sm text-brand-white placeholder:text-brand-white/40 focus:border-brand-lime focus:outline-none"
          />

          <select
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            className="rounded border border-white/15 bg-brand-surface px-4 py-2 text-sm text-brand-white focus:border-brand-lime focus:outline-none"
          >
            <option value="todas">Todas as marcas</option>
            {marcas.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <select
            value={anoMinimo}
            onChange={(e) => setAnoMinimo(e.target.value)}
            className="rounded border border-white/15 bg-brand-surface px-4 py-2 text-sm text-brand-white focus:border-brand-lime focus:outline-none"
          >
            {ANOS_MINIMOS.map((a) => (
              <option key={a.valor} value={a.valor}>
                {a.label}
              </option>
            ))}
          </select>

          <select
            value={faixaPreco}
            onChange={(e) => setFaixaPreco(e.target.value)}
            className="rounded border border-white/15 bg-brand-surface px-4 py-2 text-sm text-brand-white focus:border-brand-lime focus:outline-none"
          >
            {FAIXAS_PRECO.map((f) => (
              <option key={f.valor} value={f.valor}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-brand-white/40">
            {ordenados.length} {ordenados.length === 1 ? "veículo encontrado" : "veículos encontrados"}
          </p>

          <label className="flex items-center gap-2 text-xs text-brand-white/50">
            Ordenar por
            <select
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value as Ordenacao)}
              className="rounded border border-white/15 bg-brand-surface px-3 py-1.5 text-sm text-brand-white focus:border-brand-lime focus:outline-none"
            >
              {ORDENACOES.map((o) => (
                <option key={o.valor} value={o.valor}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {ordenados.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-brand-white/50">Nenhum veículo encontrado com esses filtros.</p>
          <button
            type="button"
            onClick={limparFiltros}
            className="btn-outline mt-4 inline-flex"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ordenados.map((v) => (
            <CarCard key={v.slug} veiculo={v} fotoReal={v.fotoReal} />
          ))}
        </div>
      )}
    </div>
  );
}
