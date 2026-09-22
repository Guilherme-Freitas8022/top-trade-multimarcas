# Top Trade Multimarcas — Site Institucional

Site institucional em Next.js para a Top Trade Multimarcas (revenda
multimarcas, Volta Redonda/RJ). Ver especificação completa em
`../../Acervo/D-00001_site_institucional/spec.md`.

## Rodar localmente (sem Docker)

```bash
npm install
npm run dev
```

Abre em http://localhost:3000

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
src/data/estoque.ts     → lista de veículos
src/data/site-config.ts → telefone, endereço, horário, redes sociais
```

⚠️ **Ambos os arquivos têm dados de EXEMPLO** (telefone, endereço, preços e
km foram extraídos parcialmente de capturas de tela do Instagram ou
estimados). Substituir por dados reais antes de publicar o site.

## Fotos dos veículos

Ainda não há fotos reais. Os cards e a ficha do carro usam **ilustrações
vetoriais geradas em código** (`src/components/CarIllustration.tsx`),
coloridas conforme o campo `cor` de cada veículo, em 3 ângulos (lateral,
frente, traseira) — ver galeria em `src/components/CarGallery.tsx`. Todo
lugar que mostra a ilustração exibe o rótulo "Ilustração" para deixar claro
que não é foto real.

Quando houver fotos reais do estoque: trocar `CarPhotoPlaceholder` (cards)
e `CarGallery` (ficha do carro) por `next/image` apontando para
`public/estoque/[slug]/1.jpg`, `2.jpg` etc.

## Deploy

Ainda não configurado — depende de domínio e decisão de infraestrutura
(Hetzner + Cloudflare + Traefik, conforme `Escritorio/Stack/stack_padrao.md`).
`docker-compose.yml` já está pronto assumindo Traefik compartilhado no
servidor (rede externa `web`) e variável `DOMAIN` no `.env` de produção.
