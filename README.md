# Top Trade Multimarcas — Site Institucional

Site institucional em Next.js para a Top Trade Multimarcas (revenda
multimarcas, Volta Redonda/RJ). Ver especificação completa em
`../../Acervo/D-00001_site_institucional/spec.md`.

**Banco de dados + login:** Supabase (projeto `top-trade-multimarcas`).
**Hospedagem:** Vercel (necessário — o site tem login/backend, não roda
mais em hospedagem puramente estática como GitHub Pages).

## Variáveis de ambiente

Crie `.env.local` (nunca versionado) com:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...   (chave "publishable")
SUPABASE_SERVICE_ROLE_KEY=...       (chave "secret" — nunca expor no cliente)
```

Valores em Supabase → Settings → API. As mesmas 3 variáveis precisam estar
configuradas no painel da Vercel (Project → Settings → Environment Variables).

## Rodar localmente

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

## Estoque — painel administrativo

O estoque **não é mais um arquivo estático** — vive na tabela `veiculos`
do Supabase. Editar pelo painel em `/admin` (link discreto "Área do
vendedor" no rodapé do site), protegido por login (Supabase Auth,
middleware em `src/middleware.ts`).

```
/login              → tela de login
/admin              → lista o estoque, marcar vendido, editar, excluir
/admin/novo          → cadastrar veículo novo (com upload de fotos)
/admin/[slug]/editar → editar veículo existente
```

Upload de fotos vai direto para o bucket `fotos-veiculos` do Supabase
Storage (público para leitura, só usuário logado pode enviar/excluir).

Camada de dados: `src/lib/veiculos.ts` (leitura) e `src/app/admin/actions.ts`
(Server Actions de escrita — criar, atualizar, excluir, marcar vendido).

## Fotos dos veículos

Dois casos, com fallback automático (`src/components/CarThumb.tsx` e
`CarGallery.tsx`):

1. **Foto real** — se o veículo tiver alguma URL em `fotos` (array na
   tabela), ela é usada, com galeria de miniaturas quando há mais de uma.
   As 50 fichas de exemplo usam fotos de EXEMPLO do modelo/ano (buscadas na
   Wikipédia, licença livre) — **não são as unidades físicas do estoque
   real da loja**. Sempre rotuladas "foto ilustrativa do modelo".
2. **Ilustração vetorial** (`src/components/CarIllustration.tsx`) —
   fallback para veículo sem nenhuma foto. Colorida conforme o campo `cor`,
   em 3 ângulos, sempre rotulada "Ilustração".

Créditos das fotos de exemplo (título do verbete da Wikipédia usado) em
`fotos-creditos.json`, versionado para referência de atribuição.

## Analytics (opcional)

Google Analytics 4 vem desligado por padrão (`src/components/GoogleAnalytics.tsx`
não renderiza nada sem `NEXT_PUBLIC_GA_ID`). Para ativar, criar propriedade
em [analytics.google.com](https://analytics.google.com) e definir
`NEXT_PUBLIC_GA_ID` nas variáveis de ambiente (Vercel + `.env.local`).

## Deploy

**Vercel** é a hospedagem — suporta Server Actions e login nativamente,
sem precisar administrar servidor. Conectar o repositório GitHub
`Guilherme-Freitas8022/top-trade-multimarcas` a um projeto Vercel e
configurar as 3 variáveis do Supabase.

`docker-compose.yml` continua disponível como alternativa (Hetzner +
Traefik, conforme `Escritorio/Stack/stack_padrao.md`), caso o projeto migre
para infraestrutura própria no futuro — variável `DOMAIN` no `.env` de
produção nesse cenário.
