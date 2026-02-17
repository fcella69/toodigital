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
          name: "title",
          title: "Titolo",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "subtitle",
          title: "Sottotitolo",
          type: "text",
          rows: 3,
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "ctaLabel",
          title: "Testo Call To Action",
          type: "string",
          initialValue: "Scopri di più",
        },
        {
          name: "socials",
          title: "Social in Hero",
          type: "array",
          description: "Social da mostrare in basso a destra",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "label",
                  title: "Nome social",
                  type: "string",
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: "url",
                  title: "Link",
                  type: "url",
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: "type",
                  title: "Tipo",
                  type: "string",
                  options: {
                    list: [
                      { title: "LinkedIn", value: "linkedin" },
                      { title: "Instagram", value: "instagram" },
                      { title: "Facebook", value: "facebook" },
                    ],
                  },
                  validation: (Rule: any) => Rule.required(),
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
