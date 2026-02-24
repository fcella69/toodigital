import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

import { sanityFetch } from "@/lib/sanity/fetch";
import {
  headerQuery,
  footerQuery,
  settingsQuery,
} from "@/lib/sanity/queries";

/* =========================
   FONT CONFIG
========================= */

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

/* =========================
   GLOBAL METADATA (Server)
========================= */

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<any>(settingsQuery);

  const siteName = settings?.siteName || "Too Digital";
  const defaultTitle = settings?.seoTitle || siteName;
  const defaultDescription = settings?.seoDescription || undefined;
  const faviconUrl = settings?.favicon?.asset?.url;

  return {

    title: {
      default: defaultTitle,
      template: `%s | ${siteName}`,
    },

    description: defaultDescription,

    icons: faviconUrl
      ? {
          icon: faviconUrl,
          shortcut: faviconUrl,
          apple: faviconUrl,
        }
      : undefined,
  };
}

/* =========================
   ROOT LAYOUT
========================= */

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerData = await sanityFetch<any>(headerQuery);
  const footerData = await sanityFetch<any>(footerQuery);

  return (
    <html
      lang="it"
      className={`${jakarta.variable} ${inter.variable}`}
    >
      <body>
        <Header data={headerData} />

        {/* WRAPPER NECESSARIO PER FOOTER REVEAL */}
        <div className="pageContent">
          {children}
        </div>

        <Footer data={footerData} />
      </body>
    </html>
  );
}