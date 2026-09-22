import type { Metadata } from "next";
import CarGrid from "@/components/CarGrid";
import { estoque } from "@/data/estoque";
import { temFotoReal } from "@/lib/fotos";

export const metadata: Metadata = {
  title: "Estoque completo",
  description:
    "Veja todos os carros 0KM e seminovos disponíveis na Top Trade Multimarcas, em Volta Redonda/RJ.",
};

export default function EstoquePage() {
  return (
    <div className="container-page py-14 sm:py-20">
      <span className="font-display text-xs font-semibold uppercase tracking-widest text-brand-lime">
        Estoque
      </span>
      <h1 className="mt-2 font-display text-3xl font-bold uppercase text-brand-white sm:text-4xl">
        Todos os veículos disponíveis
      </h1>
      <p className="mt-3 max-w-xl text-brand-white/60">
        {estoque.length} veículos no estoque atual. Filtre por categoria ou
        busque pela marca e modelo que você procura.
      </p>

      <div className="mt-10">
        <CarGrid veiculos={estoque.map((v) => ({ ...v, fotoReal: temFotoReal(v.slug) }))} />
      </div>
    </div>
  );
}
