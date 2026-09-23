import Link from "next/link";
import Image from "next/image";
import { getTodosVeiculos } from "@/lib/veiculos";
import { formatKm, formatPreco } from "@/lib/format";
import ExcluirBotao from "./ExcluirBotao";
import VendidoBotao from "./VendidoBotao";

export const revalidate = 0;

export default async function AdminPage() {
  const veiculos = await getTodosVeiculos();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold uppercase text-brand-white">
            Estoque — {veiculos.length} veículos
          </h1>
          <p className="mt-1 text-sm text-brand-white/50">
            Cadastre, edite ou marque como vendido.
          </p>
        </div>
        <Link href="/admin/novo" className="btn-primary">
          + Novo veículo
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded border border-white/10">
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
            {veiculos.map((v) => (
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
      </div>
    </div>
  );
}
