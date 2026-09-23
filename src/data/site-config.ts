// Dados institucionais da Top Trade Multimarcas.
//
// Endereço, bairro e descrição institucional CONFIRMADOS via Google Business
// Profile (perfil verificado da loja, colado pelo operador em 2026-09-22).
// Telefone/WhatsApp confirmado pelo operador em 2026-09-23.

// URL pública atual do site. Trocar quando o domínio próprio (ex:
// toptrademultimarcas.com.br) estiver definido — usado no metadata de SEO
// (sitemap, robots, Open Graph). Ver Relacionamento/Decisoes/decisoes.md.
export const SITE_URL = "https://top-trade-multimarcas.vercel.app";

export const siteConfig = {
  nome: "Top Trade Multimarcas",
  slogan: "Há mais de 25 anos realizando sonhos",
  tagline: "Pioneiro na venda de 0KM",
  descricao:
    "Pioneiros na venda de veículos 0KM em Volta Redonda/RJ há 25 anos. Atendimento personalizado, veículos com procedência, revisados, higienizados e com garantia — estoque 100% periciado com laudo cautelar.",

  telefone: "(24) 98826-3198",
  whatsapp: "5524988263198",

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
