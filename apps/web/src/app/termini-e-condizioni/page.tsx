import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/fetch";
import { termsConditionsQuery } from "@/lib/sanity/queries";
import LegalPage from "@/components/legal/LegalPage";

type SeoData = {
  title?: string;
  description?: string;
  noIndex?: boolean;
  ogImage?: {
    asset?: { url?: string };
    alt?: string;
  };
};

type TermsConditionsPageData = {
  seo?: SeoData | null;
  title?: string;
  updatedAt?: string;
  content?: any[];
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await sanityFetch<TermsConditionsPageData>(termsConditionsQuery);

  const title = data?.seo?.title || "Termini e Condizioni | TooDigital";
  const description =
    data?.seo?.description ||
    "Termini e condizioni di utilizzo del sito TooDigital.";

  const ogImage = data?.seo?.ogImage?.asset?.url;

  return {
    title,
    description,
    robots: data?.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      images: ogImage
        ? [
            {
              url: ogImage,
              alt: data?.seo?.ogImage?.alt || title,
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

export default async function TermsConditionsPage() {
  const data = await sanityFetch<TermsConditionsPageData>(termsConditionsQuery);

  return (
    <LegalPage
      title={data?.title || "Termini e Condizioni"}
      updatedAt={data?.updatedAt}
      content={data?.content || []}
    />
  );
}