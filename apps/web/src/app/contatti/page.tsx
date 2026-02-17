import { sanityFetch } from "@/lib/sanity/fetch";
import { contactsQuery } from "@/lib/sanity/queries";

import ContactsHero from "@/components/pages/contacts/ContactsHero";
import ContactsSupport from "@/components/pages/contacts/ContactsSupport";
import ContactsFormSection from "@/components/pages/contacts/ContactsFormSection";

export const metadata = {
  title: "Contatti — Too Digital",
  description: "Contatta Too Digital per informazioni, assistenza o nuove collaborazioni.",
};

type ContactsPageData = {
  hero: any;
  support: any;
  form: any;
};

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
