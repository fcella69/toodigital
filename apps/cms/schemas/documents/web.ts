import { defineType, defineField } from "sanity";

export default defineType({
    name: "webPage",
    title: "Web",
    type: "document",

    fields: [
        /* ================= HERO ================= */
        defineField({
            name: "hero",
            title: "Hero",
            type: "object",
            fields: [
                defineField({
                    name: "title",
                    title: "Titolo",
                    type: "string",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "subtitle",
                    title: "Sottotitolo",
                    type: "text",
                    rows: 3,
                }),
            ],
        }),
        /* ================= INTRO ================= */
        defineField({
            name: "intro",
            title: "Intro",
            type: "object",
            fields: [
                defineField({
                    name: "kicker",
                    title: "Kicker",
                    type: "string",
                    initialValue: "Servizi Web",
                }),
                defineField({
                    name: "title",
                    title: "Titolo",
                    type: "string",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "text",
                    title: "Testo",
                    type: "text",
                    rows: 5,
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "image",
                    title: "Immagine mockup",
                    type: "image",
                    options: { hotspot: true },
                }),
            ],
        }),

        defineField({
            name: "services",
            title: "Servizi Web",
            type: "object",
            fields: [
                defineField({
                    name: "kicker",
                    title: "Kicker",
                    type: "string",
                    initialValue: "Servizi",
                }),
                defineField({
                    name: "title",
                    title: "Titolo",
                    type: "string",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "text",
                    title: "Testo introduttivo",
                    type: "text",
                    rows: 3,
                }),
                defineField({
                    name: "items",
                    title: "Card servizi",
                    type: "array",
                    of: [
                        defineField({
                            type: "object",
                            fields: [
                                { name: "title", title: "Titolo", type: "string" },
                                { name: "text", title: "Descrizione", type: "text", rows: 3 },
                            ],
                        }),
                    ],
                    validation: (Rule) => Rule.min(3).max(6),
                }),
            ],
        }),

        defineField({
            name: "performance",
            title: "Performance & Risultati",
            type: "object",
            fields: [
                { name: "kicker", title: "Kicker", type: "string" },
                { name: "title", title: "Titolo", type: "string" },
                { name: "text", title: "Testo", type: "text" },

                {
                    name: "metrics",
                    title: "Metriche",
                    type: "array",
                    of: [
                        defineField({
                            type: "object",
                            fields: [
                                { name: "value", title: "Valore", type: "number" },
                                { name: "suffix", title: "Suffix (%, +, ecc)", type: "string" },
                                { name: "label", title: "Descrizione", type: "string" },
                            ],
                        }),
                    ],
                },

                {
                    name: "points",
                    title: "Punti di valore",
                    type: "array",
                    of: [{ type: "object", fields: [{ name: "text", type: "string" }] }],
                },
            ],
        }),

        defineField({
            name: "tech",
            title: "Tecnologie",
            type: "object",
            fields: [
                { name: "kicker", title: "Kicker", type: "string" },
                { name: "title", title: "Titolo", type: "string" },
                { name: "text", title: "Testo", type: "text" },

                {
                    name: "items",
                    title: "Tecnologie",
                    type: "array",
                    of: [
                        defineField({
                            type: "object",
                            fields: [
                                { name: "name", title: "Nome", type: "string" },
                                { name: "category", title: "Categoria", type: "string" },
                                { name: "description", title: "Descrizione", type: "text" },
                            ],
                        }),
                    ],
                },
            ],
        }),

        defineField({
            name: "standard",
            title: "Il nostro standard",
            type: "object",
            fields: [
                { name: "kicker", title: "Kicker", type: "string" },
                { name: "title", title: "Titolo", type: "string" },
                { name: "text", title: "Testo", type: "text" },

                {
                    name: "items",
                    title: "Punti",
                    type: "array",
                    of: [
                        defineField({
                            type: "object",
                            fields: [
                                { name: "title", title: "Titolo", type: "string" },
                                { name: "text", title: "Testo", type: "text" },
                            ],
                        }),
                    ],
                },
            ],
        }),

        defineField({
            name: "cta",
            title: "Call To Action finale",
            type: "object",
            fields: [
                { name: "kicker", title: "Kicker", type: "string" },
                {
                    name: "title",
                    title: "Titolo",
                    type: "string",
                    validation: (Rule) => Rule.required(),
                },
                { name: "subtitle", title: "Sottotitolo", type: "text" },
                {
                    name: "primaryLabel",
                    title: "Testo bottone principale",
                    type: "string",
                    validation: (Rule) => Rule.required(),
                },
                {
                    name: "primaryHref",
                    title: "Link bottone principale",
                    type: "string",
                    validation: (Rule) => Rule.required(),
                },
                {
                    name: "secondaryLabel",
                    title: "Testo bottone secondario",
                    type: "string",
                },
                {
                    name: "secondaryHref",
                    title: "Link bottone secondario",
                    type: "string",
                },
            ],
        }),


    ],
});
