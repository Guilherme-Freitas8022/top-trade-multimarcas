"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import { linkWhatsApp, siteConfig } from "@/data/site-config";

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

const NAV = [
  { href: "/", label: "Início" },
  { href: "/estoque", label: "Estoque" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  const [aberto, setAberto] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-black/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between sm:h-20">
        <Link href="/" onClick={() => setAberto(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-sm font-medium uppercase tracking-wide text-brand-white/80 transition-colors hover:text-brand-lime"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da Top Trade Multimarcas"
            className="flex h-11 w-11 items-center justify-center rounded border border-white/15 text-brand-white/80 transition-colors hover:border-brand-lime hover:text-brand-lime"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
          <a
            href={linkWhatsApp("Olá! Vim pelo site e queria saber mais sobre os carros disponíveis.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          aria-label="Abrir menu"
          onClick={() => setAberto((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded border border-white/15 text-brand-white md:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {aberto ? (
              <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M2 5H18M2 10H18M2 15H18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {aberto && (
        <nav className="border-t border-white/10 bg-brand-black md:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setAberto(false)}
                className="rounded px-2 py-3 font-display text-sm font-medium uppercase tracking-wide text-brand-white/85 hover:bg-white/5 hover:text-brand-lime"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-3">
              <a
                href={linkWhatsApp("Olá! Vim pelo site e queria saber mais sobre os carros disponíveis.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1"
              >
                Falar no WhatsApp
              </a>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Top Trade Multimarcas"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-white/15 text-brand-white/80"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
