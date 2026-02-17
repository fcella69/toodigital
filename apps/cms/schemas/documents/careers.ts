// schemas/documents/careers.ts
export default {
  name: "careers",
  title: "Lavora con noi",
  type: "document",

  fields: [
    /* =========================
       HERO
    ========================= */
    {
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Titolo",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "subtitle",
          title: "Sottotitolo",
          type: "text",
          rows: 3,
        },
      ],
    },

    /* =========================
       FORM
    ========================= */
    {
      name: "form",
      title: "Form candidatura",
      type: "object",
      fields: [
        {
          name: "kicker",
          title: "Kicker",
          type: "string",
          initialValue: "Candidatura",
        },
        {
          name: "title",
          title: "Titolo form",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "subtitle",
          title: "Descrizione",
          type: "text",
          rows: 3,
        },

        {
          name: "roles",
          title: "Ruoli disponibili",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "label",
                  title: "Nome ruolo",
                  type: "string",
                },
                {
                  name: "regions",
                  title: "Regioni abilitate (opzionale)",
                  type: "array",
                  of: [{ type: "string" }],
                  description: "Es: IT-65, IT-62. Vuoto = tutte",
                },
              ],
            },
          ],
        },

        {
          name: "privacyText",
          title: "Testo privacy",
          type: "text",
          rows: 4,
        },

        {
          name: "submitLabel",
          title: "Testo bottone",
          type: "string",
          initialValue: "Invia candidatura",
        },
      ],
    },
  ],
};
