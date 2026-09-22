import Script from "next/script";

// Só ativa quando NEXT_PUBLIC_GA_ID estiver definido (build normal ou do
// GitHub Actions). Sem o ID, este componente não renderiza nada — zero
// impacto até o operador criar a propriedade GA4 e informar o ID.
// Como criar: analytics.google.com -> Admin -> Criar propriedade -> Fluxo de dados Web
export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
