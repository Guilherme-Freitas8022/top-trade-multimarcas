// Logo oficial — enviado pelo cliente em 2026-09-22.
// Arquivo fonte: Branding/Logos/logo_top_trade_multimarcas.png
// Copiado para public/logo.png (296x222px, fundo removido).

import Image from "next/image";

export default function Logo({
  className = "",
  size = "default",
}: {
  className?: string;
  size?: "default" | "compact";
}) {
  const imgSize = size === "compact" ? "h-9 w-auto" : "h-11 w-auto sm:h-12";
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/logo.png"
        alt="Top Trade Multimarcas"
        width={296}
        height={222}
        priority
        className={imgSize}
      />
    </div>
  );
}
