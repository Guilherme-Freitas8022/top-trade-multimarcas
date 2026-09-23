import Image from "next/image";
import type { Angulo } from "./CarIllustration";
import CarPhotoPlaceholder from "./CarPhotoPlaceholder";

export default function CarThumb({
  marca,
  modelo,
  cor,
  fotos,
  angulo = "lateral",
  className = "",
  imgClassName = "",
}: {
  marca: string;
  modelo: string;
  cor: string;
  fotos: string[];
  angulo?: Angulo;
  className?: string;
  imgClassName?: string;
}) {
  if (fotos.length > 0) {
    return (
      <div className={`relative overflow-hidden bg-brand-surface2 ${className}`}>
        <Image
          src={fotos[0]}
          alt={`${marca} ${modelo}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={`object-contain p-2 ${imgClassName}`}
        />
      </div>
    );
  }

  return (
    <CarPhotoPlaceholder
      marca={marca}
      modelo={modelo}
      cor={cor}
      angulo={angulo}
      className={className}
    />
  );
}
