import type { MetadataRoute } from "next";
import { getEstoque } from "@/lib/veiculos";
import { SITE_URL } from "@/data/site-config";

export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const estoque = await getEstoque();

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
