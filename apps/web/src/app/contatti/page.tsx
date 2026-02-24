import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/fetch";
import { contactsQuery } from "@/lib/sanity/queries";

import ContactsHero from "@/components/pages/contacts/ContactsHero";
import ContactsSupport from "@/components/pages/contacts/ContactsSupport";
import ContactsFormSection from "@/components/pages/contacts/ContactsFormSection";

/* =========================
   TYPES
========================= */

type SeoData = {
  title?: string;
  description?: string;
  noIndex?: boolean;
  ogImage?: {
    asset?: { url: string };
    alt?: string;
  };
};

type ContactsPageData = {
  seo?: SeoData | null;
  hero: any;
  support: any;
  form: any;
};

/* =========================
   SEO (SERVER)
========================= */

export async function generateMetadata(): Promise<Metadata> {
  const data = await sanityFetch<Pick<ContactsPageData, "seo">>(
    contactsQuery
  );

  const fallbackTitle = "Contatti — Too Digital";
  const fallbackDescription =
    "Contatta Too Digital per informazioni, assistenza o nuove collaborazioni.";

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

export default async function ContactsPage() {
  const data = await sanityFetch<ContactsPageData>(contactsQuery);

  return (
    <main>
      <ContactsHero
        title={data.hero.title}
        subtitle={data.hero.subtitle}
      />

      <ContactsSupport data={data.support} />

      <ContactsFormSection form={data.form} />
    </main>
  );
}