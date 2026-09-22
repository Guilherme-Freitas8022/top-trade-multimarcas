// next/image (diferente de next/link) não prefixa automaticamente o `src`
// com o basePath. Usado apenas quando o build roda com GITHUB_PAGES=true
// (ver next.config.ts e .github/workflows/deploy-pages.yml) — no build
// padrão (Docker/Hetzner) fica vazio e não afeta nada.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
