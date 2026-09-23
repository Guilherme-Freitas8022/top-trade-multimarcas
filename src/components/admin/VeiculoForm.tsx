"use client";

import { useState } from "react";
import Image from "next/image";
import { supabaseBrowser } from "@/lib/supabase/client";
import type { Veiculo } from "@/lib/veiculos";
import type { VeiculoFormData } from "@/app/admin/actions";

function apenasDigitos(texto: string): string {
  return texto.replace(/\D/g, "");
}

const CAMBIOS = ["Manual", "Automático", "CVT", "Automatizado"];
const MAX_FOTOS = 8;

export default function VeiculoForm({
  veiculoExistente,
  aoSalvar,
}: {
  veiculoExistente?: Veiculo;
  aoSalvar: (dados: VeiculoFormData) => Promise<{ erro?: string } | void>;
}) {
  const [marca, setMarca] = useState(veiculoExistente?.marca ?? "");
  const [modelo, setModelo] = useState(veiculoExistente?.modelo ?? "");
  const [versao, setVersao] = useState(veiculoExistente?.versao ?? "");
  const [ano, setAno] = useState(veiculoExistente?.ano ?? new Date().getFullYear());
  const [anoModelo, setAnoModelo] = useState(veiculoExistente?.anoModelo ?? new Date().getFullYear());
  const [km, setKm] = useState(veiculoExistente?.km ?? 0);
  const [cambio, setCambio] = useState(veiculoExistente?.cambio ?? "Manual");
  const [combustivel, setCombustivel] = useState(veiculoExistente?.combustivel ?? "Flex");
  const [portas, setPortas] = useState(veiculoExistente?.portas ?? 4);
  const [cor, setCor] = useState(veiculoExistente?.cor ?? "");
  const [preco, setPreco] = useState(veiculoExistente?.preco ?? 0);
  const [categoria, setCategoria] = useState<"0km" | "seminovo">(veiculoExistente?.categoria ?? "seminovo");
  const [destaque, setDestaque] = useState(veiculoExistente?.destaque ?? false);
  const [opcionaisTexto, setOpcionaisTexto] = useState(veiculoExistente?.opcionais.join(", ") ?? "");
  const [descricao, setDescricao] = useState(veiculoExistente?.descricao ?? "");
  const [fotos, setFotos] = useState<string[]>(veiculoExistente?.fotos ?? []);

  const [enviandoFoto, setEnviandoFoto] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function enviarFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;
    if (fotos.length >= MAX_FOTOS) {
      setErro(`Máximo de ${MAX_FOTOS} fotos por veículo.`);
      return;
    }

    setEnviandoFoto(true);
    setErro(null);

    const supabase = supabaseBrowser();
    const nomeArquivo = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${arquivo.name.split(".").pop()}`;
    const { error } = await supabase.storage.from("fotos-veiculos").upload(nomeArquivo, arquivo);

    if (error) {
      setErro(`Erro ao enviar foto: ${error.message}`);
      setEnviandoFoto(false);
      return;
    }

    const { data } = supabase.storage.from("fotos-veiculos").getPublicUrl(nomeArquivo);
    setFotos((f) => [...f, data.publicUrl]);
    setEnviandoFoto(false);
    e.target.value = "";
  }

  function removerFoto(url: string) {
    setFotos((f) => f.filter((foto) => foto !== url));
  }

  function moverFoto(indice: number, direcao: -1 | 1) {
    setFotos((f) => {
      const novoIndice = indice + direcao;
      if (novoIndice < 0 || novoIndice >= f.length) return f;
      const copia = [...f];
      [copia[indice], copia[novoIndice]] = [copia[novoIndice], copia[indice]];
      return copia;
    });
  }

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    setErro(null);

    const opcionais = opcionaisTexto
      .split(",")
      .map((o) => o.trim())
      .filter(Boolean);

    const resultado = await aoSalvar({
      marca,
      modelo,
      versao,
      ano: Number(ano),
      anoModelo: Number(anoModelo),
      km: Number(km),
      cambio,
      combustivel,
      portas: Number(portas),
      cor,
      preco: Number(preco),
      categoria,
      destaque,
      opcionais,
      descricao,
      fotos,
    });

    setSalvando(false);
    if (resultado?.erro) setErro(resultado.erro);
  }

  return (
    <form onSubmit={salvar} className="max-w-5xl space-y-6">
      <Secao titulo="Fotos">
        <p className="mb-4 text-xs text-brand-white/50">
          A primeira foto é a capa — a que aparece na vitrine. Use as setas para reordenar.
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {fotos.map((url, i) => (
            <div key={url} className="overflow-hidden rounded border border-white/10 bg-brand-surface2">
              <div className="relative aspect-[4/3]">
                <Image src={url} alt="Foto do veículo" fill className="object-contain p-2" />
                {i === 0 && (
                  <span className="badge badge-0km absolute left-2 top-2 text-[10px]">Capa</span>
                )}
              </div>
              <div className="flex items-center justify-between gap-1 border-t border-white/10 px-2 py-1.5">
                <button
                  type="button"
                  onClick={() => moverFoto(i, -1)}
                  disabled={i === 0}
                  aria-label="Mover foto para a esquerda"
                  className="rounded px-2 py-1 text-brand-white/60 hover:bg-white/10 hover:text-brand-lime disabled:opacity-20"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => removerFoto(url)}
                  className="text-xs font-semibold uppercase tracking-wide text-red-400 hover:underline"
                >
                  Remover
                </button>
                <button
                  type="button"
                  onClick={() => moverFoto(i, 1)}
                  disabled={i === fotos.length - 1}
                  aria-label="Mover foto para a direita"
                  className="rounded px-2 py-1 text-brand-white/60 hover:bg-white/10 hover:text-brand-lime disabled:opacity-20"
                >
                  →
                </button>
              </div>
            </div>
          ))}
          {fotos.length < MAX_FOTOS && (
            <label className="flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-1 rounded border border-dashed border-white/20 text-sm text-brand-white/50 hover:border-brand-lime hover:text-brand-lime">
              {enviandoFoto ? "Enviando..." : "+ Adicionar foto"}
              <input type="file" accept="image/*" onChange={enviarFoto} disabled={enviandoFoto} className="hidden" />
            </label>
          )}
        </div>
      </Secao>

      <Secao titulo="Identificação">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Campo label="Marca">
            <input required value={marca} onChange={(e) => setMarca(e.target.value)} className="input" />
          </Campo>
          <Campo label="Modelo">
            <input required value={modelo} onChange={(e) => setModelo(e.target.value)} className="input" />
          </Campo>
          <Campo label="Cor">
            <input required value={cor} onChange={(e) => setCor(e.target.value)} className="input" />
          </Campo>
          <Campo label="Versão" className="sm:col-span-3">
            <input
              required
              value={versao}
              onChange={(e) => setVersao(e.target.value)}
              placeholder="Ex: GLi 2.0 Flex Automático"
              className="input"
            />
          </Campo>
        </div>
      </Secao>

      <Secao titulo="Ficha técnica">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Campo label="Ano de fabricação">
            <input
              required
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={ano || ""}
              onChange={(e) => setAno(Number(apenasDigitos(e.target.value)))}
              className="input"
            />
          </Campo>
          <Campo label="Ano do modelo">
            <input
              required
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={anoModelo || ""}
              onChange={(e) => setAnoModelo(Number(apenasDigitos(e.target.value)))}
              className="input"
            />
          </Campo>
          <Campo label="Quilometragem">
            <CampoNumeroFormatado valor={km} onValorChange={setKm} sufixo="km" />
          </Campo>
          <Campo label="Câmbio">
            <select value={cambio} onChange={(e) => setCambio(e.target.value)} className="input">
              {CAMBIOS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Campo>
          <Campo label="Combustível">
            <input required value={combustivel} onChange={(e) => setCombustivel(e.target.value)} className="input" />
          </Campo>
          <Campo label="Portas">
            <input
              required
              type="text"
              inputMode="numeric"
              maxLength={2}
              value={portas || ""}
              onChange={(e) => setPortas(Number(apenasDigitos(e.target.value)))}
              className="input"
            />
          </Campo>
        </div>
      </Secao>

      <Secao titulo="Venda">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Campo label="Preço (R$)">
            <CampoNumeroFormatado valor={preco} onValorChange={setPreco} prefixo="R$" />
          </Campo>
          <Campo label="Categoria">
            <select value={categoria} onChange={(e) => setCategoria(e.target.value as "0km" | "seminovo")} className="input">
              <option value="seminovo">Seminovo</option>
              <option value="0km">0KM</option>
            </select>
          </Campo>
          <label className="flex items-center gap-2 self-end pb-2.5 text-sm text-brand-white/70">
            <input type="checkbox" checked={destaque} onChange={(e) => setDestaque(e.target.checked)} className="h-4 w-4" />
            Mostrar como destaque na home
          </label>
        </div>
      </Secao>

      <Secao titulo="Detalhes">
        <div className="space-y-4">
          <Campo label="Opcionais (separados por vírgula)">
            <input
              value={opcionaisTexto}
              onChange={(e) => setOpcionaisTexto(e.target.value)}
              placeholder="Central multimídia, Câmera de ré, Ar digital"
              className="input"
            />
          </Campo>
          <Campo label="Descrição">
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={3}
              className="input resize-none"
            />
          </Campo>
        </div>
      </Secao>

      {erro && <p className="text-sm text-red-400">{erro}</p>}

      <button type="submit" disabled={salvando} className="btn-primary disabled:opacity-60">
        {salvando ? "Salvando..." : "Salvar veículo"}
      </button>
    </form>
  );
}

function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="rounded border border-white/10 bg-brand-surface p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="h-1 w-8 bg-brand-lime" />
        <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-brand-white">
          {titulo}
        </h2>
      </div>
      {children}
    </section>
  );
}

function CampoNumeroFormatado({
  valor,
  onValorChange,
  prefixo,
  sufixo,
}: {
  valor: number;
  onValorChange: (v: number) => void;
  prefixo?: string;
  sufixo?: string;
}) {
  return (
    <div className="relative">
      {prefixo && (
        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm text-brand-white/50">
          {prefixo}
        </span>
      )}
      <input
        required
        type="text"
        inputMode="numeric"
        value={valor ? valor.toLocaleString("pt-BR") : ""}
        placeholder="0"
        onChange={(e) => onValorChange(Number(apenasDigitos(e.target.value)))}
        className={`input ${prefixo ? "pl-10" : ""} ${sufixo ? "pr-10" : ""}`}
      />
      {sufixo && (
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-brand-white/50">
          {sufixo}
        </span>
      )}
    </div>
  );
}

function Campo({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs uppercase tracking-wide text-brand-white/50">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
