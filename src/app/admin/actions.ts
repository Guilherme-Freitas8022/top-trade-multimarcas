"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { gerarSlug } from "@/lib/veiculos";

export interface VeiculoFormData {
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
  categoria: "0km" | "seminovo";
  destaque: boolean;
  opcionais: string[];
  descricao: string;
  fotos: string[];
}

function revalidarTudo() {
  revalidatePath("/");
  revalidatePath("/estoque");
  revalidatePath("/admin");
}

export async function criarVeiculo(dados: VeiculoFormData) {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const slugBase = gerarSlug(dados.marca, dados.modelo, dados.anoModelo);
  let slug = slugBase;
  let tentativa = 1;
  // evita colisão de slug (ex: dois carros iguais cadastrados)
  while (true) {
    const { data } = await supabase.from("veiculos").select("id").eq("slug", slug).maybeSingle();
    if (!data) break;
    tentativa++;
    slug = `${slugBase}-${tentativa}`;
  }

  const { error } = await supabase.from("veiculos").insert({
    slug,
    marca: dados.marca,
    modelo: dados.modelo,
    versao: dados.versao,
    ano: dados.ano,
    ano_modelo: dados.anoModelo,
    km: dados.km,
    cambio: dados.cambio,
    combustivel: dados.combustivel,
    portas: dados.portas,
    cor: dados.cor,
    preco: dados.preco,
    categoria: dados.categoria,
    destaque: dados.destaque,
    opcionais: dados.opcionais,
    descricao: dados.descricao,
    fotos: dados.fotos,
  });

  if (error) return { erro: error.message };

  revalidarTudo();
  redirect("/admin");
}

export async function atualizarVeiculo(id: string, dados: VeiculoFormData) {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase
    .from("veiculos")
    .update({
      marca: dados.marca,
      modelo: dados.modelo,
      versao: dados.versao,
      ano: dados.ano,
      ano_modelo: dados.anoModelo,
      km: dados.km,
      cambio: dados.cambio,
      combustivel: dados.combustivel,
      portas: dados.portas,
      cor: dados.cor,
      preco: dados.preco,
      categoria: dados.categoria,
      destaque: dados.destaque,
      opcionais: dados.opcionais,
      descricao: dados.descricao,
      fotos: dados.fotos,
    })
    .eq("id", id);

  if (error) return { erro: error.message };

  revalidarTudo();
  redirect("/admin");
}

export async function excluirVeiculo(id: string) {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.from("veiculos").delete().eq("id", id);
  if (error) return { erro: error.message };

  revalidarTudo();
}

export async function alternarVendido(id: string, vendido: boolean) {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.from("veiculos").update({ vendido }).eq("id", id);
  if (error) return { erro: error.message };

  revalidarTudo();
}

export async function sair() {
  const supabase = await supabaseServer();
  await supabase.auth.signOut();
  redirect("/login");
}
