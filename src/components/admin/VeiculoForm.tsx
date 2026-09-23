"use client";

import { useState } from "react";
import Image from "next/image";
import { supabaseBrowser } from "@/lib/supabase/client";
import type { Veiculo } from "@/lib/veiculos";
import type { VeiculoFormData } from "@/app/admin/actions";

const CAMBIOS = ["Manual", "Automático", "CVT", "Automatizado"];
const MAX_FOTOS = 6;

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
    <form onSubmit={salvar} className="max-w-3xl space-y-8">
      <section>
        <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-brand-lime">
          Fotos
        </h2>
        <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {fotos.map((url) => (
            <div key={url} className="group relative aspect-[4/3] overflow-hidden rounded border border-white/10 bg-brand-surface2">
              <Image src={url} alt="Foto do veículo" fill className="object-contain p-1" />
              <button
                type="button"
                onClick={() => removerFoto(url)}
                className="absolute right-1 top-1 rounded-full bg-black/70 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                Remover
              </button>
            </div>
          ))}
          {fotos.length < MAX_FOTOS && (
            <label className="flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-1 rounded border border-dashed border-white/20 text-xs text-brand-white/50 hover:border-brand-lime hover:text-brand-lime">
              {enviandoFoto ? "Enviando..." : "+ Adicionar foto"}
              <input type="file" accept="image/*" onChange={enviarFoto} disabled={enviandoFoto} className="hidden" />
            </label>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Campo label="Marca">
          <input required value={marca} onChange={(e) => setMarca(e.target.value)} className="input" />
        </Campo>
        <Campo label="Modelo">
          <input required value={modelo} onChange={(e) => setModelo(e.target.value)} className="input" />
        </Campo>
        <Campo label="Versão">
          <input
            required
            value={versao}
            onChange={(e) => setVersao(e.target.value)}
            placeholder="Ex: GLi 2.0 Flex Automático"
            className="input"
          />
        </Campo>
        <Campo label="Cor">
          <input required value={cor} onChange={(e) => setCor(e.target.value)} className="input" />
        </Campo>
        <Campo label="Ano de fabricação">
          <input
            required
            type="number"
            value={ano}
            onChange={(e) => setAno(Number(e.target.value))}
            className="input"
          />
        </Campo>
        <Campo label="Ano do modelo">
          <input
            required
            type="number"
            value={anoModelo}
            onChange={(e) => setAnoModelo(Number(e.target.value))}
            className="input"
          />
        </Campo>
        <Campo label="Quilometragem">
          <input required type="number" value={km} onChange={(e) => setKm(Number(e.target.value))} className="input" />
        </Campo>
        <Campo label="Preço (R$)">
          <input
            required
            type="number"
            value={preco}
            onChange={(e) => setPreco(Number(e.target.value))}
            className="input"
          />
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
            type="number"
            value={portas}
            onChange={(e) => setPortas(Number(e.target.value))}
            className="input"
          />
        </Campo>
        <Campo label="Categoria">
          <select value={categoria} onChange={(e) => setCategoria(e.target.value as "0km" | "seminovo")} className="input">
            <option value="seminovo">Seminovo</option>
            <option value="0km">0KM</option>
          </select>
        </Campo>
      </section>

      <section>
        <Campo label="Opcionais (separados por vírgula)">
          <input
            value={opcionaisTexto}
            onChange={(e) => setOpcionaisTexto(e.target.value)}
            placeholder="Central multimídia, Câmera de ré, Ar digital"
            className="input"
          />
        </Campo>
      </section>

      <section>
        <Campo label="Descrição">
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={3}
            className="input resize-none"
          />
        </Campo>
      </section>

      <label className="flex items-center gap-2 text-sm text-brand-white/70">
        <input type="checkbox" checked={destaque} onChange={(e) => setDestaque(e.target.checked)} className="h-4 w-4" />
        Mostrar como destaque na home
      </label>

      {erro && <p className="text-sm text-red-400">{erro}</p>}

      <button type="submit" disabled={salvando} className="btn-primary disabled:opacity-60">
        {salvando ? "Salvando..." : "Salvar veículo"}
      </button>
    </form>
  );
}

function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wide text-brand-white/50">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
