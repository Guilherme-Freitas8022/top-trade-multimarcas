// Logo oficial — versão em alta qualidade enviada pelo cliente em 2026-09-22.
// Arquivo fonte: Branding/Logos/logo_top_trade_multimarcas_v2.png
// Copiado para public/logo.png (fundo removido).

import Image from "next/image";

export default function Logo({
  className = "",
  size = "default",
}: {
  className?: string;
  size?: "default" | "compact" | "header";
}) {
  const imgSize =
    size === "compact"
      ? "h-9 w-auto"
      : size === "header"
        ? "h-12 w-auto sm:h-14"
        : "h-11 w-auto sm:h-12";
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/logo.png"
        alt="Top Trade Multimarcas"
        width={1672}
        height={941}
        priority
        className={imgSize}
      />
    </div>
  );
}
