"use client";

import styles from "./contacts.module.css";

type Props = {
  data: {
    title: string;
    text: string;
    buttonLabel: string;
    phone: string;
  };
};

export default function ContactsSupport({ data }: Props) {
  if (!data) return null;

  return (
    <section className={styles.supportSection}>
      <div className={styles.supportInner}>
        <div className={styles.supportCard}>
          {/* ICONA */}
          <div className={styles.supportIcon}>📞</div>

          {/* TESTI */}
          <div className={styles.supportContent}>
            <h3>{data.title}</h3>
            <p>{data.text}</p>
          </div>

          {/* CTA */}
          <a
            href={`tel:${data.phone}`}
            className={styles.supportButton}
            aria-label={`Chiama ${data.phone}`}
          >
            {data.buttonLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
