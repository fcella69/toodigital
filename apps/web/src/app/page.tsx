import Hero from "@/components/sections/home/Hero/Hero";
import { sanityFetch } from "@/lib/sanity/fetch";
import { homeHeroQuery } from "@/lib/sanity/queries";

export default async function HomePage() {
  const data = await sanityFetch<{
    hero: {
      fixedWord: string;
      rotatingWords: string[];
      ctaLabel: string;
    };
  }>(homeHeroQuery);

  return (
    <>
      <Hero hero={data.hero} />
    </>
  );
}
