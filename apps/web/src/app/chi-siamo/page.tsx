import { sanityFetch } from "@/lib/sanity/fetch";
import { aboutQuery } from "@/lib/sanity/queries";

import AboutHero from "@/components/pages/about/AboutHero";
import AboutIntro from "@/components/pages/about/AboutIntro";
import AboutMethod from "@/components/pages/about/AboutMethod";
import AboutWhy from "@/components/pages/about/AboutWhy";
import AboutVision from "@/components/pages/about/AboutVision";
import AboutCTA from "@/components/pages/about/AboutCTA";

export const metadata = {
  title: "Chi siamo — Too Digital",
  description:
    "Scopri chi è Too Digital, il nostro approccio e la visione che guida i nostri progetti digitali.",
};

type AboutPageData = {
  hero: any;
  intro: any;
  method: any;
  why: any;
  vision: any;
  cta: any;
};


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
