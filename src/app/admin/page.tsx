import Link from "next/link";
import { getTodosVeiculos } from "@/lib/veiculos";
import AdminTabela from "./AdminTabela";

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

      <div className="mt-8">
        <AdminTabela veiculos={veiculos} />
      </div>
    </div>
  );
}
