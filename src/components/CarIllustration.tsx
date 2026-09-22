// Ilustração vetorial do veículo — NÃO é foto real do carro.
// Enquanto não houver fotos reais do estoque, cada carro ganha uma
// ilustração colorida (conforme a cor cadastrada) em 3 ângulos, para
// parecer uma ficha de produto de verdade em vez de um placeholder vazio.
// Trocar por `next/image` com fotos reais assim que o cliente enviar.

export type Angulo = "lateral" | "frente" | "traseira";

function Lateral({ cor, vidro }: { cor: string; vidro: string }) {
  return (
    <svg viewBox="0 0 400 200" className="h-full w-full" aria-hidden="true">
      <ellipse cx="200" cy="176" rx="170" ry="10" fill="#000" opacity="0.35" />
      {/* carroceria */}
      <path
        d="M35 150
           C30 120 45 108 70 104
           L108 104
           C120 78 150 58 190 58
           L245 58
           C275 58 298 76 312 104
           L340 106
           C362 108 372 122 372 140
           L372 150
           C372 158 366 164 358 164
           L46 164
           C39 164 35 158 35 150 Z"
        fill={cor}
        stroke="#000"
        strokeOpacity="0.25"
        strokeWidth="2"
      />
      {/* vidros */}
      <path
        d="M118 100
           C130 80 155 66 190 66
           L240 66
           C262 66 280 78 292 100 Z"
        fill={vidro}
        opacity="0.85"
      />
      <line x1="196" y1="66" x2="188" y2="100" stroke="#000" strokeOpacity="0.3" strokeWidth="2" />
      {/* maçaneta */}
      <rect x="205" y="112" width="18" height="4" rx="2" fill="#000" opacity="0.25" />
      {/* farol / lanterna */}
      <rect x="355" y="120" width="16" height="10" rx="3" fill="#C6FF00" />
      <rect x="38" y="122" width="14" height="8" rx="2" fill="#C6FF00" opacity="0.7" />
      {/* rodas */}
      <circle cx="112" cy="164" r="26" fill="#161616" />
      <circle cx="112" cy="164" r="12" fill="#3a3a3a" stroke="#C6FF00" strokeWidth="2" />
      <circle cx="300" cy="164" r="26" fill="#161616" />
      <circle cx="300" cy="164" r="12" fill="#3a3a3a" stroke="#C6FF00" strokeWidth="2" />
    </svg>
  );
}

function Frente({ cor, vidro }: { cor: string; vidro: string }) {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden="true">
      <ellipse cx="160" cy="196" rx="120" ry="10" fill="#000" opacity="0.35" />
      {/* capô / parachoque */}
      <path
        d="M60 190
           L60 130
           C60 90 95 62 160 62
           C225 62 260 90 260 130
           L260 190
           C260 198 254 202 246 202
           L74 202
           C66 202 60 198 60 190 Z"
        fill={cor}
        stroke="#000"
        strokeOpacity="0.25"
        strokeWidth="2"
      />
      {/* parabrisa */}
      <path d="M92 90 C104 74 130 64 160 64 C190 64 216 74 228 90 L214 108 L106 108 Z" fill={vidro} opacity="0.85" />
      {/* friso do capô */}
      <path d="M100 112 Q160 122 220 112" stroke="#000" strokeOpacity="0.2" strokeWidth="2" fill="none" />
      {/* grade */}
      <rect x="120" y="146" width="80" height="32" rx="4" fill="#0A0A0A" opacity="0.55" />
      <line x1="130" y1="155" x2="190" y2="155" stroke="#C6FF00" strokeWidth="3" opacity="0.75" />
      <line x1="130" y1="166" x2="190" y2="166" stroke="#C6FF00" strokeWidth="3" opacity="0.5" />
      <rect x="150" y="176" width="20" height="8" rx="2" fill="#0A0A0A" opacity="0.4" />
      {/* faróis */}
      <rect x="66" y="120" width="34" height="18" rx="6" fill="#C6FF00" />
      <rect x="220" y="120" width="34" height="18" rx="6" fill="#C6FF00" />
      {/* parachoque inferior */}
      <rect x="60" y="182" width="200" height="10" rx="3" fill="#000" opacity="0.25" />
      {/* espelhos */}
      <rect x="46" y="104" width="14" height="10" rx="3" fill={cor} stroke="#000" strokeOpacity="0.25" />
      <rect x="260" y="104" width="14" height="10" rx="3" fill={cor} stroke="#000" strokeOpacity="0.25" />
    </svg>
  );
}

function Traseira({ cor, vidro }: { cor: string; vidro: string }) {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full" aria-hidden="true">
      <ellipse cx="160" cy="196" rx="120" ry="10" fill="#000" opacity="0.35" />
      <path
        d="M60 190
           L60 120
           C60 96 85 78 160 78
           C235 78 260 96 260 120
           L260 190
           C260 198 254 202 246 202
           L74 202
           C66 202 60 198 60 190 Z"
        fill={cor}
        stroke="#000"
        strokeOpacity="0.25"
        strokeWidth="2"
      />
      {/* vidro traseiro — mais baixo e reto que o parabrisa dianteiro */}
      <path d="M100 100 C112 86 134 78 160 78 C186 78 208 86 220 100 L210 116 L110 116 Z" fill={vidro} opacity="0.85" />
      {/* friso do porta-malas */}
      <path d="M100 122 Q160 130 220 122" stroke="#000" strokeOpacity="0.2" strokeWidth="2" fill="none" />
      {/* porta-malas */}
      <line x1="160" y1="110" x2="160" y2="182" stroke="#000" strokeOpacity="0.15" strokeWidth="2" />
      {/* placa */}
      <rect x="128" y="158" width="64" height="20" rx="3" fill="#F5F5F5" stroke="#000" strokeOpacity="0.2" />
      {/* lanternas */}
      <rect x="64" y="120" width="30" height="34" rx="6" fill="#C6FF00" opacity="0.85" />
      <rect x="226" y="120" width="30" height="34" rx="6" fill="#C6FF00" opacity="0.85" />
      <rect x="60" y="182" width="200" height="10" rx="3" fill="#000" opacity="0.25" />
    </svg>
  );
}

export default function CarIllustration({
  angulo,
  cor,
  className = "",
}: {
  angulo: Angulo;
  cor: string;
  className?: string;
}) {
  const vidro = "#AEC3CC";
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {angulo === "lateral" && <Lateral cor={cor} vidro={vidro} />}
      {angulo === "frente" && <Frente cor={cor} vidro={vidro} />}
      {angulo === "traseira" && <Traseira cor={cor} vidro={vidro} />}
    </div>
  );
}
