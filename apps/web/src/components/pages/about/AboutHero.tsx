"use client";

import styles from "./about.module.css";
import GridBackground from "@/components/ui/GridBackground/GridBackground";

type Props = {
  hero: {
    title: string;
    subtitle: string;
  };
};

export default function AboutHero({ hero }: Props) {
  return (
    <section className={styles.hero}>
      {/* BACKGROUND GRID */}
      <GridBackground />

      {/* NOISE */}
      <div className={styles.heroNoise} />

      {/* CONTENT */}
      <div className={styles.heroInner}>
        <h1 className={styles.heroTitle}>{hero.title}</h1>
        <p className={styles.heroSubtitle}>{hero.subtitle}</p>
      </div>
    </section>
  );
}
