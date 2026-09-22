import Image from "next/image";
import type { Angulo } from "./CarIllustration";
import { BASE_PATH } from "@/lib/base-path";
import CarPhotoPlaceholder from "./CarPhotoPlaceholder";

export default function CarThumb({
  slug,
  marca,
  modelo,
  cor,
  fotoReal,
  angulo = "lateral",
  className = "",
  imgClassName = "",
}: {
  slug: string;
  marca: string;
  modelo: string;
  cor: string;
  fotoReal: boolean;
  angulo?: Angulo;
  className?: string;
  imgClassName?: string;
}) {
  if (fotoReal) {
    return (
      <div className={`relative overflow-hidden bg-brand-surface2 ${className}`}>
        <Image
          src={`${BASE_PATH}/estoque/${slug}/1.jpg`}
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
