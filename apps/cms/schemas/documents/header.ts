export default {
  name: "header",
  title: "Header & Menu",
  type: "document",
  fields: [
    {
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    },

    {
      name: "menuLeft",
      title: "Menu principale (sinistra)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Testo", type: "string" },
            { name: "link", title: "Link", type: "string" },
          ],
        },
      ],
    },

    {
      name: "menuRightTitle",
      title: "Titolo Colonna Destra",
      type: "object",
      fields: [
        { name: "label", type: "string", title: "Testo" },
        { name: "link", type: "string", title: "Link" }
      ]
    },

    {
      name: "menuRight",
      title: "Menu servizi (destra)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Testo", type: "string" },
            { name: "link", title: "Link", type: "string" },
          ],
        },
      ],
    },

    {
      name: "address",
      title: "Indirizzo",
      type: "string",
    },

    {
      name: "bottomTags",
      title: "Testo descrittivo bottom",
      type: "string",
      description: "Es: Startup · PMI · Brand culturali · Professionisti",
    },

    {
      name: "socials",
      title: "Social",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "type",
              title: "Social",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "Facebook", value: "facebook" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "X / Twitter", value: "twitter" },
                ],
                layout: "radio",
              },
            },
            {
              name: "url",
              title: "URL",
              type: "url",
            },
          ],
          preview: {
            select: {
              title: "type",
              subtitle: "url",
            },
          },
        },
      ],
    },
  ],
};
