import { defineArrayMember, defineField, defineType } from "sanity";

const richTextField = defineField({
  name: "content",
  title: "Contenuto",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragrafo", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Citazione", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          defineField({
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              }),
            ],
          }),
        ],
      },
    }),
  ],
  validation: (Rule) => Rule.required(),
});

export default defineType({
  name: "privacyPolicy",
  title: "Privacy Policy",
  type: "document",
  fields: [
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Meta Title",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Meta Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "noIndex",
          title: "No Index",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "ogImage",
          title: "Open Graph Image",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt",
              type: "string",
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "title",
      title: "Titolo pagina",
      type: "string",
      initialValue: "Privacy Policy",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "updatedAt",
      title: "Ultimo aggiornamento",
      type: "date",
    }),

    richTextField,
  ],

  preview: {
    select: {
      title: "title",
    },
  },
});