// components/pages/careers/JobApplicationForm.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./careers.module.css";

type RoleOption = {
  label: string;
  regions?: string[];
};

type FormConfig = {
  kicker: string;
  title: string;
  subtitle?: string;
  privacyText?: string;
  submitLabel?: string;
};

type Props = {
  selectedRegion: string | null;
  roles: RoleOption[];
  formConfig: FormConfig;
  onPickRegion: () => void;
};

export default function JobApplicationForm({
  selectedRegion,
  roles,
  formConfig,
  onPickRegion,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    role: "",
    message: "",
    privacy: false,
  });

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  /* MICRO ANIMATION ON REGION CHANGE */
  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { y: 10, opacity: 0.96 },
      { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" }
    );
  }, [selectedRegion]);

  const availableRoles = useMemo(() => {
    if (!selectedRegion) return roles;
    return roles.filter(
      (r) => !r.regions || r.regions.includes(selectedRegion)
    );
  }, [roles, selectedRegion]);

  const disabled = !selectedRegion || status === "sending";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRegion) {
      onPickRegion();
      return;
    }
    if (!form.privacy) return;

    setStatus("sending");

    // TODO: collegare API / Server Action
    await new Promise((r) => setTimeout(r, 650));

    setStatus("sent");

    setForm((p) => ({
      ...p,
      role: "",
      message: "",
      privacy: false,
    }));
    setCvFile(null);

    setTimeout(() => setStatus("idle"), 1800);
  };

  return (
    <div ref={cardRef} className={styles.formCard}>
      <div className={styles.formHeader}>
        <div className={styles.formKicker}>{formConfig.kicker}</div>
        <div className={styles.formTitle}>{formConfig.title}</div>

        <div className={styles.formSubtitle}>
          {selectedRegion ? (
            <>
              Regione selezionata: <strong>{selectedRegion}</strong>
            </>
          ) : (
            <>
              {formConfig.subtitle ?? "Prima seleziona una regione dalla mappa."}
              <button
                type="button"
                className={styles.pickRegionBtn}
                onClick={onPickRegion}
              >
                Vai alla mappa
              </button>
            </>
          )}
        </div>
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.row2}>
          <label className={styles.field}>
            <span>Nome</span>
            <input
              value={form.name}
              onChange={(e) =>
                setForm((p) => ({ ...p, name: e.target.value }))
              }
              placeholder="Mario"
              autoComplete="given-name"
              required
              disabled={status === "sending"}
            />
          </label>

          <label className={styles.field}>
            <span>Cognome</span>
            <input
              value={form.surname}
              onChange={(e) =>
                setForm((p) => ({ ...p, surname: e.target.value }))
              }
              placeholder="Rossi"
              autoComplete="family-name"
              required
              disabled={status === "sending"}
            />
          </label>
        </div>

        <label className={styles.field}>
          <span>Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm((p) => ({ ...p, email: e.target.value }))
            }
            placeholder="nome@dominio.it"
            autoComplete="email"
            required
            disabled={status === "sending"}
          />
        </label>

        <div className={styles.row2}>
          <label className={styles.field}>
            <span>Regione</span>
            <input
              value={selectedRegion ?? ""}
              placeholder="Seleziona dalla mappa"
              readOnly
            />
          </label>

          <label className={styles.field}>
            <span>Ruolo</span>
            <select
              value={form.role}
              onChange={(e) =>
                setForm((p) => ({ ...p, role: e.target.value }))
              }
              disabled={status === "sending"}
              required
            >
              <option value="" disabled>
                Seleziona un ruolo
              </option>
              {availableRoles.map((r) => (
                <option key={r.label} value={r.label}>
                  {r.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className={styles.field}>
          <span>Messaggio</span>
          <textarea
            value={form.message}
            onChange={(e) =>
              setForm((p) => ({ ...p, message: e.target.value }))
            }
            placeholder="Raccontaci in breve chi sei e cosa vuoi fare in Too Digital..."
            rows={5}
            disabled={status === "sending"}
          />
        </label>

        <label className={styles.field}>
          <span>CV (PDF)</span>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
            disabled={status === "sending"}
          />
          <div className={styles.fileHint}>
            {cvFile
              ? `Selezionato: ${cvFile.name}`
              : "Carica un PDF (opzionale)."}
          </div>
        </label>

        <label className={styles.privacy}>
          <input
            type="checkbox"
            checked={form.privacy}
            onChange={(e) =>
              setForm((p) => ({ ...p, privacy: e.target.checked }))
            }
            disabled={status === "sending"}
          />
          <span>{formConfig.privacyText}</span>
        </label>

        <button
          className={styles.submit}
          type="submit"
          disabled={disabled || !form.privacy}
        >
          {status === "sending"
            ? "Invio..."
            : status === "sent"
            ? "Inviato ✓"
            : formConfig.submitLabel ?? "Invia candidatura"}
        </button>

        {!selectedRegion && (
          <div className={styles.formWarning}>
            Seleziona una regione per sbloccare l’invio.
          </div>
        )}
      </form>
    </div>
  );
}
