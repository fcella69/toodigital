import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "TooDigital AI",
  description:
    "TooDigital AI è la nuova area dedicata alle soluzioni AI di Too Digital. In arrivo.",
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
          <div className={styles.visualWrap}>
            <Image
              src="/images/toodigital-ai/hero-ai.png"
              alt="TooDigital AI visual"
              width={900}
              height={900}
              className={styles.visualImage}
              priority
            />
          </div>

          <div className={styles.content}>
            <span className={styles.eyebrow}>IN ARRIVO</span>

            <h1 className={styles.title}>TooDigital AI</h1>

            <p className={styles.text}>
              Stiamo costruendo una nuova area dedicata all’intelligenza
              artificiale applicata a processi, comunicazione e soluzioni
              digitali.
            </p>

            <p className={styles.textSecondary}>
              TooDigital AI sarà uno spazio pensato per esplorare strumenti,
              integrazioni e progetti capaci di portare l’AI dentro aziende,
              flussi operativi e percorsi digitali in modo concreto e utile.
            </p>

            <div className={styles.actions}>
              <Link href="/" className={styles.primaryButton}>
                Vai al sito
              </Link>

              <Link href="/servizi" className={styles.secondaryButton}>
                Scopri le soluzioni
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}