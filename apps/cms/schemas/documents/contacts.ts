import { defineType, defineField } from "sanity";

export default defineType({
    name: "contactsPage",
    title: "Contatti",
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
                }),
                defineField({
                    name: "subtitle",
                    title: "Sottotitolo",
                    type: "text",
                }),
            ],
        }),

        /* ============ CLIENTI ESISTENTI ============ */
        defineField({
            name: "support",
            title: "Sezione Clienti Esistenti",
            type: "object",
            fields: [
                defineField({
                    name: "title",
                    title: "Titolo",
                    type: "string",
                }),
                defineField({
                    name: "text",
                    title: "Testo",
                    type: "text",
                }),
                defineField({
                    name: "buttonLabel",
                    title: "Testo Bottone",
                    type: "string",
                }),
                defineField({
                    name: "phone",
                    title: "Telefono",
                    type: "string",
                }),
            ],
        }),

        /* ================= FORM ================= */
        defineField({
            name: "form",
            title: "Form di contatto",
            type: "object",
            fields: [
                /* ---- Header form ---- */
                defineField({
                    name: "kicker",
                    title: "Kicker",
                    type: "string",
                }),
                defineField({
                    name: "title",
                    title: "Titolo",
                    type: "string",
                }),
                defineField({
                    name: "subtitle",
                    title: "Sottotitolo",
                    type: "text",
                }),
                defineField({
                    name: "image",
                    title: "Immagine sezione form",
                    type: "image",
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: "alt",
                            title: "Testo alternativo",
                            type: "string",
                        },
                    ],
                }),

                /* ---- Campi testuali ---- */
                defineField({
                    name: "nameField",
                    title: "Campo Nome",
                    type: "object",
                    fields: [
                        { name: "enabled", title: "Mostra campo", type: "boolean", initialValue: true },
                        { name: "label", title: "Label", type: "string", initialValue: "Nome" },
                    ],
                }),

                defineField({
                    name: "surnameField",
                    title: "Campo Cognome",
                    type: "object",
                    fields: [
                        { name: "enabled", title: "Mostra campo", type: "boolean", initialValue: true },
                        { name: "label", title: "Label", type: "string", initialValue: "Cognome" },
                    ],
                }),

                defineField({
                    name: "emailField",
                    title: "Campo Email",
                    type: "object",
                    fields: [
                        { name: "enabled", title: "Mostra campo", type: "boolean", initialValue: true },
                        { name: "label", title: "Label", type: "string", initialValue: "Email" },
                    ],
                }),

                defineField({
                    name: "companyField",
                    title: "Campo Azienda",
                    type: "object",
                    fields: [
                        { name: "enabled", title: "Mostra campo", type: "boolean", initialValue: true },
                        { name: "label", title: "Label", type: "string", initialValue: "Azienda" },
                    ],
                }),

                /* ---- Select Servizi ---- */
                defineField({
                    name: "serviceField",
                    title: "Campo Servizio",
                    type: "object",
                    fields: [
                        { name: "enabled", title: "Mostra campo", type: "boolean", initialValue: true },
                        { name: "label", title: "Label", type: "string", initialValue: "Servizio di interesse" },
                        {
                            name: "options",
                            title: "Opzioni",
                            type: "array",
                            of: [
                                defineField({
                                    type: "object",
                                    fields: [
                                        { name: "label", title: "Testo", type: "string" },
                                        { name: "value", title: "Valore", type: "string" },
                                    ],
                                }),
                            ],
                        },
                    ],
                }),

                /* ---- Select Budget ---- */
                defineField({
                    name: "budgetField",
                    title: "Campo Budget",
                    type: "object",
                    fields: [
                        { name: "enabled", title: "Mostra campo", type: "boolean", initialValue: false },
                        { name: "label", title: "Label", type: "string", initialValue: "Budget indicativo" },
                        {
                            name: "options",
                            title: "Opzioni",
                            type: "array",
                            of: [
                                defineField({
                                    type: "object",
                                    fields: [
                                        { name: "label", title: "Testo", type: "string" },
                                        { name: "value", title: "Valore", type: "string" },
                                    ],
                                }),
                            ],
                        },
                    ],
                }),

                /* ---- Messaggio ---- */
                defineField({
                    name: "messageField",
                    title: "Campo Messaggio",
                    type: "object",
                    fields: [
                        { name: "enabled", title: "Mostra campo", type: "boolean", initialValue: true },
                        { name: "label", title: "Label", type: "string", initialValue: "Messaggio" },
                    ],
                }),

                /* ---- Privacy & Submit ---- */
                defineField({
                    name: "privacyText",
                    title: "Testo Privacy",
                    type: "text",
                }),
                defineField({
                    name: "submitLabel",
                    title: "Testo Bottone",
                    type: "string",
                    initialValue: "Invia richiesta",
                }),
            ],
        }),
    ],
});
