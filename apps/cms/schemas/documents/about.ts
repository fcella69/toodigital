import { defineType, defineField } from "sanity";

export default defineType({
    name: "aboutPage",
    title: "Chi Siamo",
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
            title: "Intro — Chi siamo",
            type: "object",
            fields: [
                defineField({
                    name: "kicker",
                    title: "Kicker",
                    type: "string",
                    initialValue: "Chi siamo",
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
                    title: "Immagine Intro",
                    type: "image",
                    options: {
                        hotspot: true,
                    },
                }),
            ],
        }),
        /* ================= METODO ================= */
        defineField({
            name: "method",
            title: "Metodo di lavoro",
            type: "object",
            fields: [
                defineField({
                    name: "kicker",
                    title: "Kicker",
                    type: "string",
                    initialValue: "Metodo",
                }),
                defineField({
                    name: "title",
                    title: "Titolo",
                    type: "string",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "steps",
                    title: "Fasi di lavoro",
                    type: "array",
                    of: [
                        defineField({
                            type: "object",
                            fields: [
                                {
                                    name: "title",
                                    title: "Titolo",
                                    type: "string",
                                    validation: (Rule) => Rule.required(),
                                },
                                {
                                    name: "text",
                                    title: "Descrizione",
                                    type: "text",
                                    rows: 3,
                                    validation: (Rule) => Rule.required(),
                                },
                            ],
                        }),
                    ],
                    validation: (Rule) => Rule.min(2).max(5),
                }),
            ],
        }),
        /* ================= WHY ================= */
        defineField({
            name: "why",
            title: "Perché esistiamo",
            type: "object",
            fields: [
                defineField({
                    name: "kicker",
                    title: "Kicker",
                    type: "string",
                    initialValue: "Perché",
                }),
                defineField({
                    name: "title",
                    title: "Titolo",
                    type: "string",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "text",
                    title: "Testo principale",
                    type: "text",
                    rows: 4,
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "items",
                    title: "Punti chiave",
                    type: "array",
                    of: [
                        defineField({
                            type: "object",
                            fields: [
                                {
                                    name: "title",
                                    title: "Titolo",
                                    type: "string",
                                },
                                {
                                    name: "text",
                                    title: "Testo",
                                    type: "text",
                                    rows: 3,
                                },
                            ],
                        }),
                    ],
                    validation: (Rule) => Rule.max(4),
                }),
            ],
        }),
        /* ================= VISION ================= */
        defineField({
            name: "vision",
            title: "Visione",
            type: "object",
            fields: [
                defineField({
                    name: "kicker",
                    title: "Kicker",
                    type: "string",
                    initialValue: "Vision",
                }),
                defineField({
                    name: "title",
                    title: "Titolo",
                    type: "string",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "text",
                    title: "Testo principale",
                    type: "text",
                    rows: 4,
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "image",
                    title: "Immagine Vision",
                    type: "image",
                    options: {
                        hotspot: true,
                    },
                }),
                defineField({
                    name: "points",
                    title: "Punti di visione",
                    type: "array",
                    of: [
                        defineField({
                            type: "object",
                            fields: [
                                { name: "title", title: "Titolo", type: "string" },
                                { name: "text", title: "Testo", type: "text", rows: 3 },
                            ],
                        }),
                    ],
                    validation: (Rule) => Rule.max(4),
                }),
            ],
        }),
        /* ================= CTA ================= */
        defineField({
            name: "cta",
            title: "Call to Action finale",
            type: "object",
            fields: [
                {
                    name: "kicker",
                    title: "Kicker",
                    type: "string",
                    initialValue: "Contattaci",
                },
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
