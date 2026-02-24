export default {
  name: "home",
  title: "Homepage",
  type: "document",
  fields: [


    {
      name: "seo",
      title: "SEO",
      type: "seo",
    },

    /* ================= HERO ================= */

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

    /* ================= SERVICES ================= */

    {
      name: "services",
      title: "Sezione Servizi",
      type: "object",
      fields: [
        {
          name: "kicker",
          title: "Kicker",
          type: "string",
          initialValue: "Servizi",
        },
        {
          name: "title",
          title: "Titolo",
          type: "string",
        },
        {
          name: "subtitle",
          title: "Sottotitolo",
          type: "text",
          rows: 3,
        },
        {
          name: "items",
          title: "Servizi",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Titolo",
                  type: "string",
                },
                {
                  name: "text",
                  title: "Descrizione",
                  type: "text",
                  rows: 3,
                },
                {
                  name: "slug",
                  title: "Slug pagina",
                  type: "string",
                  description: "Esempio: web → genererà /web",
                },
                {
                  name: "image",
                  title: "Immagine",
                  type: "image",
                  options: { hotspot: true },
                  fields: [
                    {
                      name: "alt",
                      title: "Alt",
                      type: "string",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    {
      name: "showcase",
      title: "Sezione Showcase",
      type: "object",
      fields: [
        { name: "kicker", title: "Kicker", type: "string" },
        { name: "title", title: "Titolo", type: "string" },
        { name: "text", title: "Testo", type: "text" },
        {
          name: "media",
          title: "Media",
          type: "object",
          fields: [
            {
              name: "type",
              title: "Tipo media",
              type: "string",
              options: {
                list: [
                  { title: "Immagine", value: "image" },
                  { title: "Video (URL)", value: "video" },
                ],
                layout: "radio",
              },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "image",
              title: "Immagine",
              type: "image",
              options: { hotspot: true },
              hidden: ({ parent }: any) => parent?.type !== "image",
            },
            {
              name: "videoUrl",
              title: "Link video (YouTube/Vimeo)",
              type: "url",
              hidden: ({ parent }: any) => parent?.type !== "video",
            },
          ],
        }

      ]
    },

    {
      name: "metrics",
      title: "Sezione Numeri",
      type: "object",
      fields: [
        { name: "kicker", title: "Kicker", type: "string" },
        { name: "title", title: "Titolo", type: "string" },
        { name: "subtitle", title: "Sottotitolo", type: "text" },

        { name: "mainValue", title: "Numero principale", type: "string" },
        { name: "mainLabel", title: "Etichetta principale", type: "string" },

        {
          name: "items",
          title: "Numeri secondari",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "value", title: "Valore", type: "string" },
                { name: "label", title: "Descrizione", type: "string" },
              ],
            },
          ],
        },
      ],
    },

    {
      name: "cta",
      title: "CTA Finale",
      type: "object",
      fields: [
        { name: "kicker", type: "string", title: "Kicker" },
        { name: "title", type: "string", title: "Titolo" },
        { name: "text", type: "text", title: "Testo" },

        { name: "primaryLabel", type: "string", title: "Primary Label" },
        { name: "primaryHref", type: "string", title: "Primary Link" },

        { name: "secondaryLabel", type: "string", title: "Secondary Label" },
        { name: "secondaryHref", type: "string", title: "Secondary Link" },

        {
          name: "backgroundImage",
          title: "Immagine di Sfondo",
          type: "image",
          options: { hotspot: true }
        },

        {
          name: "image",
          title: "Immagine Contenuto",
          type: "image",
          options: { hotspot: true }
        }
      ]
    },


  ],
};
