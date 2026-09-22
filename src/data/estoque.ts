// Estoque de exemplo — Top Trade Multimarcas
//
// ATENÇÃO: os modelos abaixo foram identificados a partir de capturas de tela
// do Instagram (@toptrademultimarcas), mas PREÇO, KM e OPCIONAIS são valores
// de EXEMPLO (plausíveis para o modelo/ano), não dados reais informados pelo
// cliente. Substituir por dados reais antes de publicar o site.
//
// Estrutura pensada para ser fácil de editar manualmente até existir uma
// demanda futura de painel administrativo / integração com planilha.

export type Categoria = "0km" | "seminovo";

export interface Veiculo {
  slug: string;
  marca: string;
  modelo: string;
  versao: string;
  ano: number;
  anoModelo: number;
  km: number;
  cambio: "Manual" | "Automático" | "CVT" | "Automatizado";
  combustivel: string;
  portas: number;
  cor: string;
  preco: number;
  categoria: Categoria;
  destaque: boolean;
  opcionais: string[];
  descricao: string;
}

export const estoque: Veiculo[] = [
  {
    slug: "renault-duster-dynamique-2019",
    marca: "Renault",
    modelo: "Duster",
    versao: "Dynamique 1.6 Flex",
    ano: 2019,
    anoModelo: 2019,
    km: 58000,
    cambio: "Manual",
    combustivel: "Flex",
    portas: 4,
    cor: "Branco",
    preco: 76900,
    categoria: "seminovo",
    destaque: true,
    opcionais: ["Ar-condicionado", "Direção elétrica", "Multimídia", "Sensor de ré"],
    descricao:
      "SUV completo, revisado e pronto para rodar. Ótimo custo-benefício para família.",
  },
  {
    slug: "toyota-corolla-2023",
    marca: "Toyota",
    modelo: "Corolla",
    versao: "GLi 2.0 Flex",
    ano: 2023,
    anoModelo: 2023,
    km: 22000,
    cambio: "CVT",
    combustivel: "Flex",
    portas: 4,
    cor: "Prata",
    preco: 132900,
    categoria: "seminovo",
    destaque: true,
    opcionais: ["Central multimídia", "Câmera de ré", "Piloto automático", "Bancos em couro"],
    descricao:
      "Sedã completo, baixa quilometragem, revisões em dia. Conforto e economia em um só carro.",
  },
  {
    slug: "vw-tiguan-allspace-2025",
    marca: "Volkswagen",
    modelo: "Tiguan Allspace",
    versao: "Comfortline 250 TSI",
    ano: 2025,
    anoModelo: 2025,
    km: 0,
    cambio: "Automático",
    combustivel: "Flex",
    portas: 4,
    cor: "Cinza",
    preco: 249900,
    categoria: "0km",
    destaque: true,
    opcionais: ["7 lugares", "Teto solar", "Central multimídia", "Assistente de estacionamento"],
    descricao: "0KM direto de fábrica — SUV 7 lugares completo, condições facilitadas.",
  },
  {
    slug: "honda-hrv-exl-2018",
    marca: "Honda",
    modelo: "HR-V",
    versao: "EXL 1.8 Flex CVT",
    ano: 2018,
    anoModelo: 2018,
    km: 71000,
    cambio: "CVT",
    combustivel: "Flex",
    portas: 4,
    cor: "Grafite",
    preco: 89900,
    categoria: "seminovo",
    destaque: false,
    opcionais: ["Teto solar", "Bancos em couro", "Piloto automático"],
    descricao: "Versão topo de linha, único dono, todas as revisões na concessionária.",
  },
  {
    slug: "fiat-argo-2022",
    marca: "Fiat",
    modelo: "Argo",
    versao: "1.0 Flex",
    ano: 2022,
    anoModelo: 2022,
    km: 34000,
    cambio: "Manual",
    combustivel: "Flex",
    portas: 4,
    cor: "Branco",
    preco: 68900,
    categoria: "seminovo",
    destaque: false,
    opcionais: ["Ar-condicionado", "Direção elétrica", "Vidros elétricos"],
    descricao: "Compacto econômico, ideal para primeira compra ou uso urbano.",
  },
  {
    slug: "vw-saveiro-robust-2025",
    marca: "Volkswagen",
    modelo: "Saveiro",
    versao: "Robust CS 1.6 Flex",
    ano: 2025,
    anoModelo: 2025,
    km: 0,
    cambio: "Manual",
    combustivel: "Flex",
    portas: 2,
    cor: "Preto",
    preco: 104900,
    categoria: "0km",
    destaque: true,
    opcionais: ["Multimídia", "Sensor de ré", "Rodas de liga leve"],
    descricao: "0KM — picape robusta para trabalho e uso pessoal, garantia de fábrica.",
  },
  {
    slug: "fiat-toro-freedom-2021",
    marca: "Fiat",
    modelo: "Toro",
    versao: "Freedom 1.8 Flex Evo AT6",
    ano: 2021,
    anoModelo: 2021,
    km: 49000,
    cambio: "Automático",
    combustivel: "Flex",
    portas: 4,
    cor: "Vermelho",
    preco: 118900,
    categoria: "seminovo",
    destaque: true,
    opcionais: ["Central multimídia", "Câmera de ré", "Rodas de liga leve", "Ar digital"],
    descricao: "Picape automática, completa, ótimo estado de conservação.",
  },
  {
    slug: "citroen-aircross-feel",
    marca: "Citroën",
    modelo: "Aircross",
    versao: "Feel 1.6 Flex Automático",
    ano: 2018,
    anoModelo: 2019,
    km: 87000,
    cambio: "Automático",
    combustivel: "Flex",
    portas: 4,
    cor: "Prata",
    preco: 64900,
    categoria: "seminovo",
    destaque: false,
    opcionais: ["Ar-condicionado", "Direção elétrica", "Multimídia"],
    descricao: "SUV automático, revisado, procedência verificada.",
  },
  {
    slug: "hyundai-hb20s-premium",
    marca: "Hyundai",
    modelo: "HB20S",
    versao: "Premium 1.6 Flex Automático",
    ano: 2018,
    anoModelo: 2019,
    km: 85000,
    cambio: "Automático",
    combustivel: "Flex",
    portas: 4,
    cor: "Branco",
    preco: 66900,
    categoria: "seminovo",
    destaque: false,
    opcionais: ["Bancos em couro", "Central multimídia", "Sensor de estacionamento"],
    descricao: "Sedã completo, versão topo de linha, bem conservado.",
  },
  {
    slug: "vw-voyage-evidence",
    marca: "Volkswagen",
    modelo: "Voyage",
    versao: "Evidence 1.6 MPI Flex Manual",
    ano: 2016,
    anoModelo: 2017,
    km: 98000,
    cambio: "Manual",
    combustivel: "Flex",
    portas: 4,
    cor: "Prata",
    preco: 47900,
    categoria: "seminovo",
    destaque: false,
    opcionais: ["Ar-condicionado", "Direção hidráulica", "Vidros elétricos"],
    descricao: "Sedã econômico e espaçoso, ótimo primeiro carro.",
  },
  {
    slug: "honda-fit-lx",
    marca: "Honda",
    modelo: "Fit",
    versao: "LX 1.4 Flex Manual",
    ano: 2009,
    anoModelo: 2009,
    km: 132000,
    cambio: "Manual",
    combustivel: "Flex",
    portas: 4,
    cor: "Prata",
    preco: 32900,
    categoria: "seminovo",
    destaque: false,
    opcionais: ["Ar-condicionado", "Direção hidráulica"],
    descricao: "Hatch compacto, confiável, baixo custo de manutenção.",
  },
  {
    slug: "renault-duster-tech-road-ii",
    marca: "Renault",
    modelo: "Duster",
    versao: "Tech Road II 4X2 16V Flex Automático",
    ano: 2018,
    anoModelo: 2019,
    km: 76000,
    cambio: "Automático",
    combustivel: "Flex",
    portas: 4,
    cor: "Bege",
    preco: 79900,
    categoria: "seminovo",
    destaque: false,
    opcionais: ["Multimídia", "Câmera de ré", "Rodas de liga leve", "Teto solar"],
    descricao: "SUV automático, edição especial, completo.",
  },
];

export function getVeiculoBySlug(slug: string): Veiculo | undefined {
  return estoque.find((v) => v.slug === slug);
}

export function getDestaques(): Veiculo[] {
  return estoque.filter((v) => v.destaque);
}
