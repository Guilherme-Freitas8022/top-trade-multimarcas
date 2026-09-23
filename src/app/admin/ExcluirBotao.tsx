"use client";

import { useTransition } from "react";
import { excluirVeiculo } from "./actions";

export default function ExcluirBotao({ id, nome }: { id: string; nome: string }) {
  const [pendente, startTransition] = useTransition();

  function excluir() {
    if (!confirm(`Excluir "${nome}" do estoque? Essa ação não pode ser desfeita.`)) return;
    startTransition(() => {
      excluirVeiculo(id);
    });
  }

  return (
    <button
      type="button"
      onClick={excluir}
      disabled={pendente}
      className="text-xs font-semibold uppercase tracking-wide text-red-400 hover:underline disabled:opacity-50"
    >
      {pendente ? "Excluindo..." : "Excluir"}
    </button>
  );
}
