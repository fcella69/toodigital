import { defineType } from "sanity";

export default defineType({
  name: "servicesPage",
  title: "Servizi",
  type: "document",
  fields: [

    {
      name: "seo",
      title: "SEO",
      type: "seo",
    },

    {
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        { name: "title", type: "string", title: "Titolo" },
        { name: "subtitle", type: "text", title: "Sottotitolo" },
      ],
    },

    {
      name: "web",
      title: "Servizio Web",
      type: "object",
      fields: [
        { name: "navTitle", type: "string", title: "Titolo Barra" },
        { name: "kicker", type: "string", title: "Kicker" },
        { name: "title", type: "string", title: "Titolo" },
        { name: "text", type: "text", title: "Testo" },

        {
          name: "image",
          title: "Immagine",
          type: "image",
          options: { hotspot: true },
        },

        {
          name: "technologies",
          title: "Loghi Tecnologie",
          type: "array",
          of: [{ type: "image" }],
        },

        {
          name: "siteTypes",
          title: "Tipologie Siti",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", type: "string", title: "Titolo" },
                { name: "description", type: "text", title: "Descrizione" },
              ],
            },
          ],
        },

        {
          name: "cta",
          title: "CTA Web",
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Titolo" },
            { name: "text", type: "text", title: "Testo" },
            { name: "buttonLabel", type: "string", title: "Testo Pulsante" },
            { name: "buttonLink", type: "string", title: "Link Pulsante" }
          ]
        },
      ],
    },

    {
      name: "brand",
      title: "Social & Advertising",
      type: "object",
      fields: [
        { name: "navTitle", type: "string" },
        { name: "kicker", type: "string" },
        { name: "title", type: "string" },
        { name: "text", type: "text" },
        { name: "image", type: "image", options: { hotspot: true } },

        {
          name: "platforms",
          type: "array",
          of: [{ type: "image" }]
        },

        {
          name: "services",
          type: "array",
          of: [{
            type: "object",
            fields: [
              { name: "title", type: "string" },
              { name: "description", type: "text" },
              { name: "bullets", type: "array", of: [{ type: "string" }] }
            ]
          }]
        },

        {
          name: "metrics",
          type: "array",
          of: [{
            type: "object",
            fields: [
              { name: "value", type: "number" },
              { name: "suffix", type: "string" },
              { name: "label", type: "string" }
            ]
          }]
        },

        {
          name: "cta",
          type: "object",
          fields: [
            { name: "title", type: "string" },
            { name: "text", type: "text" },
            { name: "buttonLabel", type: "string" },
            { name: "buttonLink", type: "string" }
          ]
        }
      ]
    },

    {
      name: "growth",
      title: "Grafica",
      type: "object",
      fields: [
        { name: "navTitle", type: "string", title: "Titolo Barra" },
        { name: "kicker", type: "string", title: "Kicker" },
        { name: "title", type: "string", title: "Titolo" },
        { name: "text", type: "text", title: "Testo" },

        { name: "image", title: "Immagine", type: "image", options: { hotspot: true } },

        { name: "showcaseKicker", type: "string", title: "Kicker Showcase" },
        { name: "showcaseTitle", type: "string", title: "Titolo Showcase" },
        {
          name: "showcase",
          title: "Showcase (immagini)",
          type: "array",
          of: [{ type: "image" }],
        },

        { name: "identityKicker", type: "string", title: "Kicker Identità" },
        { name: "identityTitle", type: "string", title: "Titolo Identità" },
        {
          name: "identity",
          title: "Identità (3 card)",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "icon", type: "image", title: "Icona", options: { hotspot: true } },
                { name: "title", type: "string", title: "Titolo" },
                { name: "text", type: "text", title: "Testo" },
              ],
            },
          ],
        },

        {
          name: "cta",
          title: "CTA Grafica",
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Titolo" },
            { name: "text", type: "text", title: "Testo" },
            { name: "buttonLabel", type: "string", title: "Testo Pulsante" },
            { name: "buttonLink", type: "string", title: "Link Pulsante" },
          ],
        },
      ],
    },

    {
      name: "consulting",
      title: "Progetti Custom",
      type: "object",
      fields: [
        { name: "navTitle", type: "string" },
        { name: "kicker", type: "string" },
        { name: "title", type: "string" },
        { name: "text", type: "text" },
        { name: "image", type: "image", options: { hotspot: true } },

        { name: "processKicker", type: "string" },
        { name: "processTitle", type: "string" },
        {
          name: "process",
          type: "array",
          of: [{
            type: "object",
            fields: [
              { name: "title", type: "string" },
              { name: "text", type: "text" }
            ]
          }]
        },

        { name: "typesKicker", type: "string" },
        { name: "typesTitle", type: "string" },
        {
          name: "types",
          type: "array",
          of: [{
            type: "object",
            fields: [
              { name: "title", type: "string" },
              { name: "text", type: "text" }
            ]
          }]
        },

        {
          name: "cta",
          type: "object",
          fields: [
            { name: "title", type: "string" },
            { name: "text", type: "text" },
            { name: "buttonLabel", type: "string" },
            { name: "buttonLink", type: "string" }
          ]
        }
      ]
    },
  ],
});