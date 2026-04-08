import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/fetch";
import { cookiePolicyQuery } from "@/lib/sanity/queries";
import LegalPage from "@/components/legal/LegalPage";
import CookieDeclarationEmbed from "@/components/cookies/CookieDeclarationEmbed";

type SeoData = {
  title?: string;
  description?: string;
  noIndex?: boolean;
  ogImage?: {
    asset?: { url?: string };
    alt?: string;
  };
};

type CookiePolicyPageData = {
  seo?: SeoData | null;
  title?: string;
  updatedAt?: string;
  content?: any[];
  cookiebotDeclarationScript?: string;
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await sanityFetch<CookiePolicyPageData>(cookiePolicyQuery);

  const title = data?.seo?.title || "Cookie Policy | TooDigital";
  const description =
    data?.seo?.description ||
    "Informativa cookie e preferenze di consenso del sito TooDigital.";

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

export default async function CookiePolicyPage() {
  const data = await sanityFetch<CookiePolicyPageData>(cookiePolicyQuery);

  return (
    <LegalPage
      title={data?.title || "Cookie Policy"}
      updatedAt={data?.updatedAt}
      content={data?.content || []}
    >
      <CookieDeclarationEmbed
        scriptCode={data?.cookiebotDeclarationScript}
      />
    </LegalPage>
  );
}