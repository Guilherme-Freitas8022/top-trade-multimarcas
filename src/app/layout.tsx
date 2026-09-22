import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { siteConfig } from "@/data/site-config";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.nome} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.nome}`,
  },
  description: siteConfig.descricao,
  keywords: [
    "carros Volta Redonda",
    "0km Volta Redonda",
    "seminovos Volta Redonda",
    "revenda multimarcas",
    "financiamento de carro",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${oswald.variable} ${inter.variable}`}>
      <body className="bg-brand-black font-body text-brand-white antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFAB mensagem="Olá! Vim pelo site e queria saber mais sobre os carros disponíveis." />
      </body>
    </html>
  );
}
