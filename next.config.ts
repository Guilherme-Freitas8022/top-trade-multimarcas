import type { NextConfig } from "next";

// Site dinâmico (login, painel admin, dados no Supabase) — não dá mais para
// usar "output: export" (GitHub Pages), que só serve HTML estático sem
// servidor. Hospedagem: Vercel (suporta Server Actions/rotas nativamente)
// ou Docker/Hetzner com output "standalone" — ver
// Escritorio/Boas_Praticas/boas_praticas_docker_nextjs.md.
const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sgpwzxcpcumaxqhxrhmd.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
