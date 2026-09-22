export function formatPreco(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export function formatKm(km: number): string {
  if (km === 0) return "0 km";
  return `${km.toLocaleString("pt-BR")} km`;
}
