// Só pode ser importado por Server Components (páginas). Usa `fs`, que não
// existe no bundle do navegador — nunca importar isto de um componente
// client ("use client") nem de algo que um componente client renderize
// diretamente (ver CarThumb.tsx / CarGallery.tsx, que recebem o resultado
// como prop em vez de calcular sozinhos).
import fs from "fs";
import path from "path";

const MAX_FOTOS = 8;

export function temFotoReal(slug: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", "estoque", slug, "1.jpg"));
}

// Conta quantas fotos numeradas (1.jpg, 2.jpg, ...) existem para o veículo.
export function contarFotos(slug: string): number {
  let n = 0;
  while (
    n < MAX_FOTOS &&
    fs.existsSync(path.join(process.cwd(), "public", "estoque", slug, `${n + 1}.jpg`))
  ) {
    n++;
  }
  return n;
}
