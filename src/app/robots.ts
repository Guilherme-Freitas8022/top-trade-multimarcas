import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site-config";

// Necessário para "output: export" (build do GitHub Pages) gerar este
// arquivo como estático — sem efeito no build padrão (standalone/Docker).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
