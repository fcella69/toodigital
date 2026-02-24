import type { Metadata } from "next";

import ServicesHero from "@/components/pages/services/ServicesHero";
import ServicesSections from "@/components/pages/services/ServicesSections";

import { sanityFetch } from "@/lib/sanity/fetch";
import { servicesQuery } from "@/lib/sanity/queries";

/* =========================
   TYPES
========================= */

type SeoData = {
  title?: string;
  description?: string;
  ogImage?: {
    asset?: { url: string };
    alt?: string;
  };
  noIndex?: boolean;
};

type ServiceWeb = {
  navTitle: string;
  kicker?: string;
  title: string;
  text?: string;
  image?: { asset?: { url: string }; alt?: string };
  technologies?: { asset?: { url: string }; alt?: string }[];
  siteTypes?: { title: string; description?: string }[];
};

type BasicService = {
  navTitle: string;
  title: string;
  text?: string;
};

type ServicesPageData = {
  seo?: SeoData | null;
  hero: {
    title: string;
    subtitle: string;
  };
  web: ServiceWeb;
  brand: BasicService;
  growth: BasicService;
  consulting: BasicService;
};

/* =========================
   SEO (Server)
========================= */

export async function generateMetadata(): Promise<Metadata> {
  const data = await sanityFetch<Pick<ServicesPageData, "seo">>(
    servicesQuery
  );

  const fallbackTitle = "Servizi — Too Digital";
  const fallbackDescription =
    "Scopri i servizi di Too Digital: sviluppo web, branding, strategie digitali e progetti su misura.";

  const seo = data?.seo;

  const title = seo?.title || fallbackTitle;
  const description = seo?.description || fallbackDescription;
  const ogImage = seo?.ogImage?.asset?.url;

  return {
    title,
    description,
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,

    openGraph: {
      title,
      description,
      images: ogImage
        ? [
            {
              url: ogImage,
              alt: seo?.ogImage?.alt || title,
            },
          ]
        : [],
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

export default async function ServiziPage() {
  const data = await sanityFetch<ServicesPageData>(servicesQuery);

  return (
    <main>
      {data?.hero && <ServicesHero hero={data.hero} />}

      {(data?.web ||
        data?.brand ||
        data?.growth ||
        data?.consulting) && (
        <ServicesSections
          web={data.web}
          brand={data.brand}
          growth={data.growth}
          consulting={data.consulting}
        />
      )}
    </main>
  );
}