import { sanityFetch } from "@/lib/sanity/fetch";
import { careersQuery } from "@/lib/sanity/queries";

import CareersHero from "@/components/pages/careers/CareersHero";
import CareersMap from "@/components/pages/careers/CareersMap";

export default async function CareersPage() {
  const data = await sanityFetch(careersQuery);

  return (
    <main>
      <CareersHero
        title={data.hero.title}
        subtitle={data.hero.subtitle}
      />

      <CareersMap roles={data.form.roles} formConfig={data.form} />
    </main>
  );
}

