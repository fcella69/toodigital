import { defineType, defineField } from "sanity";

export default defineType({
  name: "settings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      options: {
        hotspot: false,
      },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "Default SEO Title",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "Default SEO Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "cookiebotEnabled",
      title: "Abilita Cookiebot",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "cookiebotCbid",
      title: "Cookiebot CBID",
      type: "string",
      description: "Inserisci il Domain Group ID / CBID fornito da Cookiebot.",
      hidden: ({ parent }) => !parent?.cookiebotEnabled,
    }),

    defineField({
      name: "cookiebotCulture",
      title: "Lingua Cookiebot",
      type: "string",
      initialValue: "IT",
      options: {
        list: [
          { title: "Italiano", value: "IT" },
          { title: "English", value: "EN" },
        ],
        layout: "radio",
      },
      hidden: ({ parent }) => !parent?.cookiebotEnabled,
    }),
  ],
});
