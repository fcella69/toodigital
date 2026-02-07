import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "../app/globals.css";

import Header from "@/components/layout/Header/Header";


// FONT CONFIG
const monument = localFont({
  src: [
    {
      path: "../fonts/monument/MonumentExtended-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/monument/MonumentExtended-Ultrabold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-title",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});


// METADATA BASE (poi la estendiamo)
export const metadata: Metadata = {
  title: "Kerning — Digital Studio",
  description:
    "Kerning è uno studio digitale specializzato in branding, web design e prodotti digitali ad alte prestazioni.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${monument.variable} ${inter.variable}`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
