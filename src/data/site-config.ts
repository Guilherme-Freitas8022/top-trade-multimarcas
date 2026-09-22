// Dados institucionais da Top Trade Multimarcas.
//
// Endereço, bairro e descrição institucional CONFIRMADOS via Google Business
// Profile (perfil verificado da loja, colado pelo operador em 2026-09-22).
// Telefone ainda PENDENTE — o próprio perfil do Google não lista telefone
// ("Add place's phone number"), então o WhatsApp abaixo continua placeholder
// até o cliente confirmar o número oficial.

// URL pública atual do site. Trocar quando o domínio próprio (ex:
// toptrademultimarcas.com.br) estiver definido — usado no metadata de SEO
// (sitemap, robots, Open Graph). Ver Relacionamento/Decisoes/decisoes.md.
export const SITE_URL = "https://guilherme-freitas8022.github.io/top-trade-multimarcas";

export const siteConfig = {
  nome: "Top Trade Multimarcas",
  slogan: "Há mais de 25 anos realizando sonhos",
  tagline: "Pioneiro na venda de 0KM",
  descricao:
    "Pioneiros na venda de veículos 0KM em Volta Redonda/RJ há 25 anos. Atendimento personalizado, veículos com procedência, revisados, higienizados e com garantia — estoque 100% periciado com laudo cautelar.",

  // PLACEHOLDER — Google Business Profile não lista telefone; confirmar com o cliente antes de publicar
  telefone: "(24) 3803-3122",
  whatsapp: "5524988033122",

  endereco: {
    // Rua e número confirmados por duas fontes independentes em 2026-09-22:
    // Google Business Profile (bairro oficial "Jardim Paraíba", CEP) e foto
    // real de fachada/anúncio (bairro popular "Aterrado" + ponto de
    // referência do viaduto — áreas contíguas no centro de Volta Redonda).
    logradouro: "Rua Quinhentos e Cinquenta e Dois, 30",
    bairro: "Aterrado / Jardim Paraíba",
    cidade: "Volta Redonda",
    estado: "RJ",
    cep: "27215-110",
    referencia: "Próximo ao viaduto Nossa Senhora das Graças",
  },

  instagram: "https://instagram.com/toptrademultimarcas",
  instagramHandle: "@toptrademultimarcas",

  google: {
    // Confirmado via Google Business Profile em 2026-09-22
    nota: 4.7,
    avaliacoes: 26,
  },

  horario: [
    // Google mostra apenas "Aberto · Fecha às 18h" — horário completo (todos
    // os dias + sábado) ainda não confirmado, mantido como estimativa
    { dias: "Segunda a Sexta", horas: "08h às 18h" },
    { dias: "Sábado", horas: "08h às 13h" },
  ],

  anoFundacao: 1999, // aprox. — "há mais de 25 anos", ano exato a confirmar
} as const;

export function linkWhatsApp(mensagem: string): string {
  const texto = encodeURIComponent(mensagem);
  return `https://wa.me/${siteConfig.whatsapp}?text=${texto}`;
}
