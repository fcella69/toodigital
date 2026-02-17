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

    // ⛔ il servizio è OBBLIGATORIO: se disabilitato o senza opzioni → errore visibile
    if (!serviceField?.enabled || !serviceField.options?.length) {
        return (
            <div style={{ color: "red" }}>
                ContactForm: serviceField non configurato
            </div>
        );
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        await new Promise((r) => setTimeout(r, 800));

        setStatus("sent");
        setTimeout(() => setStatus("idle"), 2000);
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

            {serviceField.enabled && (
                <label>
                    <span>{serviceField.label}</span>
                    <select name="service" required>
                        <option value="">Seleziona</option>
                        {serviceField.options!.map((o) => (
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
