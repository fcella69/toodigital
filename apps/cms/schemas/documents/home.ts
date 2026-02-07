export default {
  name: "home",
  title: "Homepage",
  type: "document",
  fields: [
    {
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        {
          name: "fixedWord",
          title: "Parola fissa",
          type: "string",
          initialValue: "siamo",
        },
        {
          name: "rotatingWords",
          title: "Parole rotanti",
          type: "array",
          of: [{ type: "string" }],
        },
        {
          name: "ctaLabel",
          title: "Testo CTA",
          type: "string",
          initialValue: "Scopri di più",
        },
      ],
    },
  ],
};
