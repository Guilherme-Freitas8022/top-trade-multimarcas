import Link from "next/link";
import Logo from "./Logo";
import { siteConfig } from "@/data/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-surface">
      <div className="container-page flex flex-col gap-10 py-14 md:flex-row md:flex-wrap md:justify-between md:gap-x-12">
        <div className="max-w-xs">
          <div className="flex h-12 items-center">
            <Logo />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-brand-white/60">
            {siteConfig.descricao}
          </p>
        </div>

        <div>
          <div className="flex h-12 items-center">
            <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-brand-lime">
              Navegação
            </h3>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-brand-white/70">
            <li><Link href="/" className="hover:text-brand-lime">Início</Link></li>
            <li><Link href="/estoque" className="hover:text-brand-lime">Estoque</Link></li>
            <li><Link href="/sobre" className="hover:text-brand-lime">Sobre</Link></li>
            <li><Link href="/contato" className="hover:text-brand-lime">Contato</Link></li>
          </ul>
        </div>

        <div>
          <div className="flex h-12 items-center">
            <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-brand-lime">
              Contato
            </h3>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-brand-white/70">
            <li>{siteConfig.telefone}</li>
            <li>{siteConfig.endereco.logradouro}</li>
            <li>{siteConfig.endereco.bairro} — {siteConfig.endereco.cidade}/{siteConfig.endereco.estado}</li>
            <li>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-lime"
              >
                {siteConfig.instagramHandle}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="flex h-12 items-center">
            <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-brand-lime">
              Horário
            </h3>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-brand-white/70">
            {siteConfig.horario.map((h) => (
              <li key={h.dias}>
                <span className="text-brand-white/50">{h.dias}:</span> {h.horas}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container-page text-center text-xs text-brand-white/40">
          <p>
            © {new Date().getFullYear()} {siteConfig.nome}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
