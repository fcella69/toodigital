import { defineType } from "sanity";

export default defineType({
  name: "footerSettings",
  title: "Footer",
  type: "document",
  fields: [
    {
      name: "logo",
      type: "image",
      options: { hotspot: true }
    },

    {
      name: "tagline",
      type: "string"
    },

    {
      name: "menuLinks",
      title: "Link Menu",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "href", type: "string" }
          ]
        }
      ]
    },

    {
      name: "extraLinks",
      title: "Link Extra",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "href", type: "string" }
          ]
        }
      ]
    },

    {
      name: "policyLinks",
      title: "Link Policy",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "href", type: "string" }
          ]
        }
      ]
    },

    {
      name: "socialLinks",
      title: "Social",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", type: "string" },
            { name: "url", type: "string" }
          ]
        }
      ]
    },

    {
      name: "copyrightText",
      type: "string"
    }
  ]
});