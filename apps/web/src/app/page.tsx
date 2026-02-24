import type { Metadata } from "next";

import Hero from "@/components/sections/home/Hero/Hero";
import HomeServices from "@/components/sections/home/HomeServices/HomeServices";
import HomeShowcase from "@/components/sections/home/HomeShowcase/HomeShowcase";
import HomeMetrics from "@/components/sections/home/HomeMetrics/HomeMetrics";
import HomeCta from "@/components/sections/home/HomeCta/HomeCta";

import { sanityFetch } from "@/lib/sanity/fetch";
import { homeQuery } from "@/lib/sanity/queries";

/* =========================
   SEO METADATA
========================= */

export async function generateMetadata(): Promise<Metadata> {
  const data = await sanityFetch<any>(homeQuery);

  console.log("HOME DATA:", data);

  const seo = data?.seo;

  return {
    title: seo?.title || "Too Digital — Esperti in transizione digitale",
    description:
      seo?.description ||
      "Too Digital è una web company specializzata in soluzioni digitali, piattaforme web e strategie di trasformazione digitale.",

    robots: seo?.noIndex ? "noindex, nofollow" : "index, follow",

    openGraph: {
      title: seo?.title,
      description: seo?.description,
      images: seo?.ogImage?.asset?.url
        ? [
            {
              url: seo.ogImage.asset.url,
              alt: seo.ogImage.alt || "",
            },
          ]
        : [],
    },
  };
}

/* =========================
   TYPES
========================= */

type Social = {
  label: string;
  url: string;
  type: "linkedin" | "instagram" | "facebook";
};

type HeroData = {
  title: string;
  subtitle: string;
  ctaLabel?: string;
  socials?: Social[];
};

type ServiceItem = {
  title: string;
  text: string;
  slug: string;
  image?: {
    asset?: {
      url: string;
    };
    alt?: string;
  };
};

type ServicesSection = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  items?: ServiceItem[];
};

type ShowcaseSection = {
  kicker?: string;
  title: string;
  text: string;
  media?: {
    type?: "image" | "video";
    image?: {
      asset?: {
        url: string;
      };
      alt?: string;
    };
    videoUrl?: string;
  };
};

type MetricItem = {
  value: string;
  label: string;
};

type MetricsSection = {
  kicker?: string;
  title: string;
  subtitle?: string;
  mainValue: string;
  mainLabel: string;
  items?: MetricItem[];
};

type CtaSection = {
  kicker?: string;
  title: string;
  text?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;

  backgroundImage?: {
    asset?: { url: string };
    alt?: string;
  };

  image?: {
    asset?: { url: string };
    alt?: string;
  };
};

type SEO = {
  title?: string;
  description?: string;
  noIndex?: boolean;
  ogImage?: {
    asset?: { url: string };
    alt?: string;
  };
};

type HomePageData = {
  hero: HeroData;
  services?: ServicesSection;
  showcase?: ShowcaseSection;
  metrics?: MetricsSection;
  cta?: CtaSection;
  seo?: SEO;
};

/* =========================
   PAGE
========================= */

export default async function HomePage() {
  const data = await sanityFetch<HomePageData>(homeQuery);

  return (
    <main>
      {data?.hero && <Hero hero={data.hero} />}

      {data?.services && (
        <HomeServices services={data.services} />
      )}

      {data?.showcase && (
        <HomeShowcase showcase={data.showcase} />
      )}

      {data?.metrics && (
        <HomeMetrics metrics={data.metrics} />
      )}

      {data?.cta && <HomeCta cta={data.cta} />}
    </main>
  );
}