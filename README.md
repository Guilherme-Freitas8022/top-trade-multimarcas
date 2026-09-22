# Top Trade Multimarcas — Site Institucional

Site institucional em Next.js para a Top Trade Multimarcas (revenda
multimarcas, Volta Redonda/RJ). Ver especificação completa em
`../../Acervo/D-00001_site_institucional/spec.md`.

**No ar:** https://guilherme-freitas8022.github.io/top-trade-multimarcas/
(GitHub Pages, deploy automático a cada push em `master` via
`.github/workflows/deploy-pages.yml`)

## Rodar localmente (sem Docker)

```bash
npm install
npm run dev
```

Abre em http://localhost:3000 (ou próxima porta livre)

## Rodar com Docker (desenvolvimento)

```bash
docker compose -f docker-compose.dev.yml up
```

## Build de produção (local, para validar antes do deploy)

```bash
npm run build
npm run start
```

## Editar o estoque

Enquanto não existir painel administrativo, o estoque é editado diretamente em:

```
src/data/estoque.ts     → lista de veículos (50 no momento)
src/data/site-config.ts → telefone, endereço, horário, redes sociais
```

⚠️ **Preço, km e telefone são dados de EXEMPLO/PLACEHOLDER.** Endereço e
descrição institucional já vieram do Google Business Profile (reais).
Substituir preço/km/telefone por dados reais antes de considerar o site
definitivo.

## Fotos dos veículos

Duas camadas, com fallback automático (ver `src/components/CarThumb.tsx`):

1. **Foto real do modelo** — se existir `public/estoque/[slug]/1.jpg`, ela é
   usada. São fotos de EXEMPLO do modelo/ano (buscadas na Wikipédia, licença
   livre) — **não são as unidades físicas do estoque da loja**. Sempre
   rotuladas "foto ilustrativa do modelo" na ficha do carro.
2. **Ilustração vetorial** (`src/components/CarIllustration.tsx`) — fallback
   para quando não há foto real. Colorida conforme o campo `cor`, em 3
   ângulos, sempre rotulada "Ilustração".

Créditos/fontes de cada foto (título do verbete da Wikipédia usado) ficam
em `fotos-creditos.json`, versionado para referência de atribuição
(licenças da Wikimedia Commons exigem crédito). 42 dos 50 veículos têm foto
real; os 8 restantes usam a ilustração vetorial (busca não encontrou imagem
compatível para esses modelos específicos).

Quando houver fotos reais do estoque de verdade: substituir os arquivos em
`public/estoque/[slug]/1.jpg` diretamente — o site já usa essas fotos
automaticamente, sem precisar mexer em código.

## Analytics (opcional)

Google Analytics 4 vem desligado por padrão (`src/components/GoogleAnalytics.tsx`
não renderiza nada sem `NEXT_PUBLIC_GA_ID`). Para ativar:

1. Criar propriedade em [analytics.google.com](https://analytics.google.com) → Admin → Fluxo de dados Web
2. Copiar o ID (formato `G-XXXXXXXXXX`)
3. No GitHub: Settings → Secrets and variables → Actions → Variables → criar `GA_ID` com esse valor
4. Local: colar em `.env.local` como `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`

## Deploy definitivo

GitHub Pages é solução temporária. Deploy definitivo depende de domínio
próprio e decisão de infraestrutura (Hetzner + Cloudflare + Traefik,
conforme `Escritorio/Stack/stack_padrao.md`). `docker-compose.yml` já está
pronto assumindo Traefik compartilhado no servidor (rede externa `web`) e
variável `DOMAIN` no `.env` de produção.
