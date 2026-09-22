import type { NextConfig } from "next";

// output: 'standalone' obrigatório para build Docker enxuto
// ver Escritorio/Boas_Praticas/boas_praticas_docker_nextjs.md
const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
