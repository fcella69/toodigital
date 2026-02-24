import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/fetch";
import { aboutQuery } from "@/lib/sanity/queries";

import AboutHero from "@/components/pages/about/AboutHero";
import AboutIntro from "@/components/pages/about/AboutIntro";
import AboutMethod from "@/components/pages/about/AboutMethod";
import AboutWhy from "@/components/pages/about/AboutWhy";
import AboutVision from "@/components/pages/about/AboutVision";
import AboutCTA from "@/components/pages/about/AboutCTA";

type SeoData = {
  title?: string;
  description?: string;
  image?: {
    asset?: { url: string };
    alt?: string;
  };
  noIndex?: boolean;
};

type AboutPageData = {
  seo?: SeoData | null;
  hero: any;
  intro: any;
  method: any;
  why: any;
  vision: any;
  cta: any;
};

/* =========================
   SEO (SERVER) — da Sanity
========================= */
export async function generateMetadata(): Promise<Metadata> {
  const data = await sanityFetch<Pick<AboutPageData, "seo">>(aboutQuery);

  const fallbackTitle = "Chi siamo — Too Digital";
  const fallbackDescription =
    "Scopri chi è Too Digital, il nostro approccio e la visione che guida i nostri progetti digitali.";

  const seo = data?.seo;

  const title = seo?.title || fallbackTitle;
  const description = seo?.description || fallbackDescription;
  const ogImage = seo?.image?.asset?.url;

  return {
    title,
    description,
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage, alt: seo?.image?.alt || title }] : [],
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

/* =========================
   PAGE
========================= */
export default async function AboutPage() {
  const data = await sanityFetch<AboutPageData>(aboutQuery);

  return (
    <main>
      <AboutHero hero={data.hero} />
      <AboutIntro intro={data.intro} />
      <AboutMethod method={data.method} />
      <AboutWhy why={data.why} />
      <AboutVision vision={data.vision} />
      <AboutCTA cta={data.cta} />
    </main>
  );
}