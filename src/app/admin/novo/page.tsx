"use client";

import Link from "next/link";
import VeiculoForm from "@/components/admin/VeiculoForm";
import { criarVeiculo } from "../actions";

export default function NovoVeiculoPage() {
  return (
    <div>
      <Link
        href="/admin"
        className="font-display text-xs font-semibold uppercase tracking-wide text-brand-white/50 hover:text-brand-lime"
      >
        ← Voltar ao painel
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold uppercase text-brand-white">
        Novo veículo
      </h1>

      <div className="mt-8">
        <VeiculoForm aoSalvar={criarVeiculo} />
      </div>
    </div>
  );
}
