"use client";

import { useTransition } from "react";
import { alternarVendido } from "./actions";

export default function VendidoBotao({ id, vendido }: { id: string; vendido: boolean }) {
  const [pendente, startTransition] = useTransition();

  function alternar() {
    startTransition(() => {
      alternarVendido(id, !vendido);
    });
  }

  return (
    <button
      type="button"
      onClick={alternar}
      disabled={pendente}
      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-colors disabled:opacity-50 ${
        vendido
          ? "bg-white/10 text-brand-white/60 hover:bg-white/15"
          : "bg-brand-lime text-brand-black hover:bg-brand-lime-dark"
      }`}
    >
      {vendido ? "Vendido" : "Disponível"}
    </button>
  );
}
