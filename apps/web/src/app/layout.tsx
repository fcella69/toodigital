import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header/Header";
import { sanityFetch } from "@/lib/sanity/fetch";
import { headerQuery } from "@/lib/sanity/queries";

// FONT CONFIG
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-title",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

// METADATA BASE
export const metadata: Metadata = {
  title: "Too Digital — Esperti in transizione digitale",
  description:
    "Too Digital è una web company specializzata in soluzioni digitali, piattaforme web e strategie di trasformazione digitale per aziende strutturate.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ FETCH SERVER-SIDE (NO CORS)
  const headerData = await sanityFetch(headerQuery);

  return (
    <html
      lang="it"
      className={`${jakarta.variable} ${inter.variable}`}
    >
      <body>
        {/* HEADER CLIENT + DATI SERVER */}
        <Header data={headerData} />

        {children}
      </body>
    </html>
  );
}
