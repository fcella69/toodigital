import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/fetch";
import { privacyPolicyQuery } from "@/lib/sanity/queries";
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

type PrivacyPolicyPageData = {
  seo?: SeoData | null;
  title?: string;
  updatedAt?: string;
  content?: any[];
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await sanityFetch<PrivacyPolicyPageData>(privacyPolicyQuery);

  const title = data?.seo?.title || "Privacy Policy | TooDigital";
  const description =
    data?.seo?.description ||
    "Informativa privacy del sito TooDigital.";

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

export default async function PrivacyPolicyPage() {
  const data = await sanityFetch<PrivacyPolicyPageData>(privacyPolicyQuery);

  return (
    <LegalPage
      title={data?.title || "Privacy Policy"}
      updatedAt={data?.updatedAt}
      content={data?.content || []}
    />
  );
}