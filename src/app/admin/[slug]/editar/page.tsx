import Link from "next/link";
import { notFound } from "next/navigation";
import { getVeiculoBySlug } from "@/lib/veiculos";
import VeiculoForm from "@/components/admin/VeiculoForm";
import { atualizarVeiculo } from "../../actions";

export const revalidate = 0;

export default async function EditarVeiculoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const veiculo = await getVeiculoBySlug(slug);
  if (!veiculo) notFound();

  const salvar = atualizarVeiculo.bind(null, veiculo.id);

  return (
    <div>
      <Link
        href="/admin"
        className="font-display text-xs font-semibold uppercase tracking-wide text-brand-white/50 hover:text-brand-lime"
      >
        ← Voltar ao painel
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold uppercase text-brand-white">
        Editar {veiculo.marca} {veiculo.modelo}
      </h1>

      <div className="mt-8">
        <VeiculoForm veiculoExistente={veiculo} aoSalvar={salvar} />
      </div>
    </div>
  );
}
