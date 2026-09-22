// Só pode ser importado por Server Components (páginas). Usa `fs`, que não
// existe no bundle do navegador — nunca importar isto de um componente
// client ("use client") nem de algo que um componente client renderize
// diretamente (ver CarThumb.tsx, que recebe o resultado como prop em vez
// de calcular sozinho).
import fs from "fs";
import path from "path";

export function temFotoReal(slug: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", "estoque", slug, "1.jpg"));
}
