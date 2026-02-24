"use client";

import { useState } from "react";
import styles from "./contacts.module.css";

/* =========================
   TYPES
========================= */

type SelectOption = {
    label: string;
    value: string;
};

type ToggleField = {
    enabled: boolean;
    label: string;
};

type SelectField = ToggleField & {
    options?: SelectOption[];
};

type ContactFormConfig = {
    nameField?: ToggleField;
    surnameField?: ToggleField;
    emailField?: ToggleField;
    companyField?: ToggleField;

    serviceField?: SelectField;
    budgetField?: SelectField;

    messageField?: ToggleField;

    privacyText?: string;
    submitLabel?: string;
};

type Props = {
    config?: ContactFormConfig | null;
};

export default function ContactForm({ config }: Props) {
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

    // ❗ se config non arriva, mostriamo fallback visibile
    if (!config) {
        return (
            <div style={{ color: "red" }}>
                ContactForm: config mancante
            </div>
        );
    }

    const {
        nameField,
        surnameField,
        emailField,
        companyField,
        serviceField,
        budgetField,
        messageField,
        privacyText,
        submitLabel,
    } = config;

    // Fallback servizi di default
    const DEFAULT_SERVICES: SelectOption[] = [
        { label: "Sito web", value: "website" }
    ];

    const services =
        serviceField?.enabled && serviceField.options?.length
            ? serviceField.options
            : DEFAULT_SERVICES;


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        setStatus("sending");

        const res = await fetch("/api/contact", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            setStatus("sent");
            e.currentTarget.reset();
            setTimeout(() => setStatus("idle"), 2000);
        } else {
            setStatus("idle");
        }
    };

    return (
        <form className={styles.contactForm} onSubmit={onSubmit}>
            <div className={styles.row2}>
                {nameField?.enabled && (
                    <label>
                        <span>{nameField.label}</span>
                        <input name="name" required />
                    </label>
                )}

                {surnameField?.enabled && (
                    <label>
                        <span>{surnameField.label}</span>
                        <input name="surname" required />
                    </label>
                )}
            </div>

            {emailField?.enabled && (
                <label>
                    <span>{emailField.label}</span>
                    <input type="email" name="email" required />
                </label>
            )}

            {companyField?.enabled && (
                <label>
                    <span>{companyField.label}</span>
                    <input name="company" />
                </label>
            )}

            {serviceField?.enabled !== false && (
                <label>
                    <span>{serviceField?.label ?? "Servizio di interesse"}</span>
                    <select name="service" required>
                        <option value="">Seleziona</option>
                        {services.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>
                </label>
            )}


            {budgetField?.enabled && budgetField.options?.length && (
                <label>
                    <span>{budgetField.label}</span>
                    <select name="budget">
                        <option value="">Non specificato</option>
                        {budgetField.options.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>
                </label>
            )}

            {messageField?.enabled && (
                <label>
                    <span>{messageField.label}</span>
                    <textarea name="message" rows={5} />
                </label>
            )}

            {privacyText && (
                <label className={styles.privacy}>
                    <input type="checkbox" required />
                    <span>{privacyText}</span>
                </label>
            )}

            <input
                type="text"
                name="website"
                style={{ display: "none" }}
            />

            <button type="submit" disabled={status !== "idle"}>
                {status === "sending"
                    ? "Invio..."
                    : status === "sent"
                        ? "Inviato ✓"
                        : submitLabel ?? "Invia richiesta"}
            </button>
        </form>
    );
}
