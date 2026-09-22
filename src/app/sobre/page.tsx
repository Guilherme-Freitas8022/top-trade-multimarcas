import type { Metadata } from "next";
import { linkWhatsApp, siteConfig } from "@/data/site-config";
import { diferenciais } from "@/data/diferenciais";

export const metadata: Metadata = {
  title: "Sobre",
  description: `Conheça a história da ${siteConfig.nome} — pioneiros na venda de 0KM em Volta Redonda/RJ há 25 anos.`,
};

export default function SobrePage() {
  return (
    <div className="container-page py-14 sm:py-20">
      <span className="font-display text-xs font-semibold uppercase tracking-widest text-brand-lime">
        Sobre a Top Trade
      </span>
      <h1 className="mt-2 max-w-2xl font-display text-3xl font-bold uppercase leading-tight text-brand-white sm:text-4xl">
        {siteConfig.slogan}
      </h1>

      <div className="mt-8 max-w-3xl space-y-4 leading-relaxed text-brand-white/70">
        <p>
          Estamos situados no bairro {siteConfig.endereco.bairro}, na cidade
          de Volta Redonda, onde somos pioneiros na venda de veículos 0KM na
          região há 25 anos, oferecendo aos nossos clientes qualidade,
          compromisso e competência.
        </p>
        <p>
          Tradição no mercado automotivo da cidade, no mesmo endereço há 25
          anos. Continuamos sendo uma loja de porte médio de propósito: o
          suficiente para ter variedade e força de negociação, pequena o
          bastante para que você seja atendido de perto.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-8 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
        {diferenciais.map((v) => (
          <div key={v.titulo}>
            <div className="h-1 w-10 bg-brand-lime" />
            <h3 className="mt-4 font-display text-base font-semibold uppercase text-brand-white">
              {v.titulo}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-white/60">{v.texto}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded border border-white/10 bg-brand-surface p-8 text-center sm:p-12">
        <h2 className="font-display text-xl font-bold uppercase text-brand-white sm:text-2xl">
          Venha nos visitar
        </h2>
        <p className="mx-auto mt-2 max-w-md text-brand-white/60">
          {siteConfig.endereco.logradouro} — {siteConfig.endereco.bairro},{" "}
          {siteConfig.endereco.cidade}/{siteConfig.endereco.estado}
          {" · "}
          {siteConfig.endereco.referencia}
        </p>
        <a
          href={linkWhatsApp("Olá! Vim pelo site e queria falar com um vendedor.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-6 inline-flex"
        >
          Falar no WhatsApp
        </a>
      </div>
    </div>
  );
}
