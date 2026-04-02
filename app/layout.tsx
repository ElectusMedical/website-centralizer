
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Website Centralizer",
    template: "%s | Website Centralizer",
  },
  description: "High-performance marketing site powered by Next.js 15 & TinaCMS",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ─────────────────────────────────────────────────────────────────
            GHL TRACKING SCRIPT — Replace LC_API_HOST and locationId below
            with your GoHighLevel Sub-Account values.
            Docs: https://help.gohighlevel.com/support/solutions/articles/
        ──────────────────────────────────────────────────────────────────── */}
        {process.env.NEXT_PUBLIC_GHL_LOCATION_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){
                  w[l]=w[l]||[];
                  w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                  var n=d.getElementsByTagName(s)[0];
                  var j=d.createElement(s);
                  var dl=l!='dataLayer'?'&l='+l:'';
                  j.async=true;
                  j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                  n.parentNode.insertBefore(j,n);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GHL_LOCATION_ID}');
              `,
            }}
          />
        )}
      </head>
      <body>
        {/* GHL NoScript Fallback */}
        {process.env.NEXT_PUBLIC_GHL_LOCATION_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GHL_LOCATION_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        {children}
      </body>
    </html>
  );
}
