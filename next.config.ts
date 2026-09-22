import type { NextConfig } from "next";

// Dois modos de build:
// - Padrão (Docker/Hetzner, ver Escritorio/Boas_Praticas/boas_praticas_docker_nextjs.md):
//   output "standalone", server Node.js.
// - GITHUB_PAGES=true (usado só pelo workflow .github/workflows/deploy-pages.yml):
//   output "export" — HTML estático, sem servidor, para publicar no GitHub Pages
//   num repositório de projeto (precisa de basePath com o nome do repo).
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "top-trade-multimarcas";

const nextConfig: NextConfig = {
  output: isGithubPages ? "export" : "standalone",
  images: {
    unoptimized: true,
  },
  ...(isGithubPages && {
    basePath: `/${repoName}`,
    trailingSlash: true,
  }),
};

export default nextConfig;
