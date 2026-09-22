// Mapa de cor (nome em português usado no estoque) -> hex para as
// ilustrações de veículo. Ajustar/expandir conforme novas cores entrarem
// no estoque real.

const MAPA_CORES: Record<string, string> = {
  Branco: "#E9E9E9",
  Prata: "#B9BEC4",
  Preto: "#242424",
  Vermelho: "#B23A2E",
  Cinza: "#7C848C",
  Grafite: "#3B3F44",
  Bege: "#C7B48E",
  Azul: "#2E5C8A",
  Verde: "#3B6E4A",
};

export function corVeiculo(nome: string): string {
  return MAPA_CORES[nome] ?? "#8C8C8C";
}
