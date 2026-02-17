import { sanityFetch } from "@/lib/sanity/fetch";
import { webQuery } from "@/lib/sanity/queries";

import WebHero from "@/components/pages/web/WebHero";
import WebIntro from "@/components/pages/web/WebIntro";
import WebServices from "@/components/pages/web/WebServices";
import WebPerformance from "@/components/pages/web/WebPerformance";
import WebTech from "@/components/pages/web/WebTech";
import WebStandard from "@/components/pages/web/WebStandard";
import WebCTA from "@/components/pages/web/WebCTA";

type WebPageData = {
  hero: any;
  intro: any;
  services: any;
  performance: any;
  tech: any;
  standard: any;
  cta: any;
};

export default async function WebPage() {
  const data = await sanityFetch<WebPageData>(webQuery);

  return (
    <main>
      <WebHero
        title={data.hero.title}
        subtitle={data.hero.subtitle}
      />

      <WebIntro intro={data.intro} />
      <WebServices services={data.services} />
      <WebPerformance performance={data.performance} />
      <WebTech tech={data.tech} />
      <WebStandard standard={data.standard} />
      <WebCTA cta={data.cta} />
    </main>
  );
}
