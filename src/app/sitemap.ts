import type { MetadataRoute } from "next";
import { estoque } from "@/data/estoque";
import { SITE_URL } from "@/data/site-config";

// Necessário para "output: export" (build do GitHub Pages) gerar este
// arquivo como estático — sem efeito no build padrão (standalone/Docker).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginasFixas: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/estoque`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/sobre`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contato`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const paginasVeiculos: MetadataRoute.Sitemap = estoque.map((v) => ({
    url: `${SITE_URL}/estoque/${v.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...paginasFixas, ...paginasVeiculos];
}
