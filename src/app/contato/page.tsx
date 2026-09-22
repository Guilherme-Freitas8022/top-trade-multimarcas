import type { Metadata } from "next";
import { linkWhatsApp, siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Contato",
  description: `Fale com a ${siteConfig.nome} pelo WhatsApp, telefone ou visite a loja em Volta Redonda/RJ.`,
};

export default function ContatoPage() {
  return (
    <div className="container-page py-14 sm:py-20">
      <span className="font-display text-xs font-semibold uppercase tracking-widest text-brand-lime">
        Contato
      </span>
      <h1 className="mt-2 font-display text-3xl font-bold uppercase text-brand-white sm:text-4xl">
        Fale com a gente
      </h1>
      <p className="mt-3 max-w-xl text-brand-white/60">
        Prefere resolver tudo rapidinho? Manda mensagem no WhatsApp que a
        gente responde. Também pode ligar ou passar na loja.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <a
          href={linkWhatsApp("Olá! Vim pelo site e queria falar com a Top Trade.")}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded border border-white/10 bg-brand-surface p-6 transition-colors hover:border-brand-lime/50"
        >
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-brand-lime">
            WhatsApp
          </h2>
          <p className="mt-2 font-display text-lg font-semibold text-brand-white">
            {siteConfig.telefone}
          </p>
          <p className="mt-1 text-sm text-brand-white/50">Resposta mais rápida</p>
        </a>

        <div className="rounded border border-white/10 bg-brand-surface p-6">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-brand-lime">
            Endereço
          </h2>
          <p className="mt-2 text-brand-white">
            {siteConfig.endereco.logradouro}
            <br />
            {siteConfig.endereco.bairro} — {siteConfig.endereco.cidade}/{siteConfig.endereco.estado}
          </p>
          <p className="mt-1 text-sm text-brand-white/50">
            CEP {siteConfig.endereco.cep} · {siteConfig.endereco.referencia}
          </p>
        </div>

        <div className="rounded border border-white/10 bg-brand-surface p-6">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-brand-lime">
            Horário de funcionamento
          </h2>
          <ul className="mt-2 space-y-1 text-brand-white">
            {siteConfig.horario.map((h) => (
              <li key={h.dias} className="text-sm">
                <span className="text-brand-white/50">{h.dias}:</span> {h.horas}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 aspect-[16/6] w-full overflow-hidden rounded border border-white/10">
        <iframe
          title={`Mapa — ${siteConfig.nome}`}
          className="h-full w-full grayscale invert-[0.92] contrast-[1.05]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            `${siteConfig.nome}, ${siteConfig.endereco.logradouro}, ${siteConfig.endereco.bairro}, ${siteConfig.endereco.cidade} - ${siteConfig.endereco.estado}, ${siteConfig.endereco.cep}`,
          )}&output=embed`}
        />
      </div>
    </div>
  );
}
