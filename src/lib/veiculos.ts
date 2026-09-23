// Camada de dados do estoque — lê e escreve na tabela `veiculos` do
// Supabase. Substitui o antigo array estático em src/data/estoque.ts.
import { supabaseServer } from "./supabase/server";

export type Categoria = "0km" | "seminovo";

export interface Veiculo {
  id: string;
  slug: string;
  marca: string;
  modelo: string;
  versao: string;
  ano: number;
  anoModelo: number;
  km: number;
  cambio: string;
  combustivel: string;
  portas: number;
  cor: string;
  preco: number;
  categoria: Categoria;
  destaque: boolean;
  opcionais: string[];
  descricao: string;
  fotos: string[];
  vendido: boolean;
}

interface VeiculoRow {
  id: string;
  slug: string;
  marca: string;
  modelo: string;
  versao: string;
  ano: number;
  ano_modelo: number;
  km: number;
  cambio: string;
  combustivel: string;
  portas: number;
  cor: string;
  preco: number | string;
  categoria: Categoria;
  destaque: boolean;
  opcionais: string[] | null;
  descricao: string | null;
  fotos: string[] | null;
  vendido: boolean;
}

function mapRow(row: VeiculoRow): Veiculo {
  return {
    id: row.id,
    slug: row.slug,
    marca: row.marca,
    modelo: row.modelo,
    versao: row.versao,
    ano: row.ano,
    anoModelo: row.ano_modelo,
    km: row.km,
    cambio: row.cambio,
    combustivel: row.combustivel,
    portas: row.portas,
    cor: row.cor,
    preco: Number(row.preco),
    categoria: row.categoria,
    destaque: row.destaque,
    opcionais: row.opcionais ?? [],
    descricao: row.descricao ?? "",
    fotos: row.fotos ?? [],
    vendido: row.vendido,
  };
}

/** Estoque público — só veículos não vendidos, mais recentes primeiro. */
export async function getEstoque(): Promise<Veiculo[]> {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("veiculos")
    .select("*")
    .eq("vendido", false)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapRow);
}

/** Todos os veículos, inclusive vendidos — usado só no painel admin. */
export async function getTodosVeiculos(): Promise<Veiculo[]> {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("veiculos")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function getVeiculoBySlug(slug: string): Promise<Veiculo | null> {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.from("veiculos").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data ? mapRow(data) : null;
}

export async function getDestaques(): Promise<Veiculo[]> {
  const estoque = await getEstoque();
  return estoque.filter((v) => v.destaque);
}

export function gerarSlug(marca: string, modelo: string, anoModelo: number): string {
  const base = `${marca}-${modelo}-${anoModelo}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return base;
}
