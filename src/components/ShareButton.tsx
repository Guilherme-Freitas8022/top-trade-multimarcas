"use client";

import { useState } from "react";

export default function ShareButton({ titulo, texto }: { titulo: string; texto: string }) {
  const [copiado, setCopiado] = useState(false);

  async function compartilhar() {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title: titulo, text: texto, url });
      } catch {
        // usuário cancelou o compartilhamento — não faz nada
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // clipboard indisponível — sem fallback adicional
    }
  }

  return (
    <button
      type="button"
      onClick={compartilhar}
      className="btn-outline w-full"
      aria-label="Compartilhar este veículo"
    >
      {copiado ? (
        "Link copiado!"
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="15" cy="5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="5" cy="10" r="2.3" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="15" cy="15" r="2.3" stroke="currentColor" strokeWidth="1.6" />
            <path d="M7 8.8L13 5.8M7 11.2L13 14.2" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          Compartilhar
        </>
      )}
    </button>
  );
}
