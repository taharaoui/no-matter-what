import type { Metadata } from "next";
import { Playfair_Display, EB_Garamond, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/* Type system is derived from the logo, not chosen alongside it.
   The mark is set in Playfair Display (wordmark) and EB Garamond
   (subtext + tagline); the page uses the same two faces so the logo
   reads as part of the page rather than as a placed asset.
   IBM Plex Mono is the third voice — labels, prices, nav, metadata —
   the register of a gallery wall card, and the only thing keeping two
   serifs from tipping into invitation-stationery. */
const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const garamond = EB_Garamond({
  variable: "--font-body",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-utility",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "No Matter What — Caffè · Galerie · Boutique",
    template: "%s — No Matter What",
  },
  description:
    "A Montréal café, gallery, and boutique built on three generations of one family. No Matter What.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr-CA"
      className={`${playfair.variable} ${garamond.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
