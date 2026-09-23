"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

function LoginIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="3.3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const NAV = [
  { href: "/", label: "Início" },
  { href: "/estoque", label: "Estoque" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

function isAtivo(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const [aberto, setAberto] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-black/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between sm:h-20">
        <Link href="/" onClick={() => setAberto(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => {
            const ativo = isAtivo(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={ativo ? "page" : undefined}
                className={`font-display text-sm font-medium uppercase tracking-wide transition-colors hover:text-brand-lime ${
                  ativo ? "text-brand-lime" : "text-brand-white/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            aria-label="Área do vendedor — login"
            title="Área do vendedor"
            className="flex h-11 w-11 items-center justify-center rounded border border-white/15 text-brand-white/80 transition-colors hover:border-brand-lime hover:text-brand-lime"
          >
            <LoginIcon className="h-5 w-5" />
          </Link>
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
            {NAV.map((item) => {
              const ativo = isAtivo(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setAberto(false)}
                  aria-current={ativo ? "page" : undefined}
                  className={`rounded px-2 py-3 font-display text-sm font-medium uppercase tracking-wide hover:bg-white/5 hover:text-brand-lime ${
                    ativo ? "text-brand-lime" : "text-brand-white/85"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
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
              <Link
                href="/login"
                onClick={() => setAberto(false)}
                aria-label="Área do vendedor — login"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-white/15 text-brand-white/80"
              >
                <LoginIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
