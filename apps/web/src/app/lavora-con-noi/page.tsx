import { sanityFetch } from "@/lib/sanity/fetch";
import { careersQuery } from "@/lib/sanity/queries";

import CareersHero from "@/components/pages/careers/CareersHero";
import CareersMap from "@/components/pages/careers/CareersMap";

import type { Metadata } from "next";

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

type CareersPageData = {
  seo?: SeoData | null;
  hero: any;
  form: any;
};

/* =========================
   SEO (Server)
========================= */

export async function generateMetadata(): Promise<Metadata> {
  const data = await sanityFetch<Pick<CareersPageData, "seo">>(careersQuery);

  const title = data?.seo?.title ?? "Lavora con noi — Too Digital";
  const description =
    data?.seo?.description ??
    "Invia la tua candidatura a Too Digital e scopri le opportunità di collaborazione.";

  const ogImageUrl = data?.seo?.ogImage?.asset?.url;

  return {
    title,
    description,
    robots: data?.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      ...(ogImageUrl
        ? {
            images: [
              {
                url: ogImageUrl,
                alt: data?.seo?.ogImage?.alt ?? title,
              },
            ],
          }
        : {}),
    },
  };
}

/* =========================
   PAGE
========================= */

export default async function CareersPage() {
  const data = await sanityFetch<CareersPageData>(careersQuery);

  return (
    <main>
      <CareersHero title={data.hero.title} subtitle={data.hero.subtitle} />
      <CareersMap roles={data.form.roles} formConfig={data.form} />
    </main>
  );
}