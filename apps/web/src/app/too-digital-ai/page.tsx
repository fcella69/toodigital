import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "TooDigital AI — Too Digital",
  description:
    "TooDigital AI è la nuova area dedicata alle soluzioni AI di Too Digital. Pagina introduttiva temporanea.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TooDigitalAiPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.orbOne} />
        <div className={styles.orbTwo} />
        <div className={styles.grid} />

        <div className={styles.inner}>
          <span className={styles.eyebrow}>NUOVA AREA</span>

          <h1 className={styles.title}>TooDigital AI</h1>

          <p className={styles.text}>
            Stiamo costruendo una nuova area dedicata all’intelligenza
            artificiale applicata a processi, comunicazione e soluzioni digitali.
          </p>

          <p className={styles.textSecondary}>
            Per ora questa è una pagina placeholder: presto sarà collegata al
            progetto dedicato e al dominio esterno.
          </p>

          <div className={styles.actions}>
            <Link href="/contatti" className={styles.primaryButton}>
              Contattaci
            </Link>

            <Link href="/servizi" className={styles.secondaryButton}>
              Scopri le soluzioni
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}