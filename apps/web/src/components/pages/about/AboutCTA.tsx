"use client";

import { useEffect, useRef } from "react";
import styles from "./about.module.css";
import GridBackground from "@/components/ui/GridBackground/GridBackground";
import Link from "next/link";

type Props = {
  cta: {
    kicker?: string;
    title: string;
    subtitle?: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel?: string;
    secondaryHref?: string;
  };
};

export default function AboutCTA({ cta }: Props) {
  const glowRef = useRef<HTMLDivElement>(null);

  /* =========================
     MOUSE GLOW
  ========================= */
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const move = (e: MouseEvent) => {
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section className={styles.ctaSection}>
      {/* BACKGROUND GRID */}
      <GridBackground />

      {/* MOUSE GLOW */}
      <div ref={glowRef} className={styles.mouseGlow} />

      {/* NOISE */}
      <div className={styles.heroNoise} />

      {/* CONTENT */}
      <div className={styles.ctaInner}>
        {cta.kicker && <span className={styles.ctaKicker}>{cta.kicker}</span>}
        <h2 className={styles.ctaTitle}>{cta.title}</h2>

        {cta.subtitle && (
          <p className={styles.ctaSubtitle}>{cta.subtitle}</p>
        )}

        <div className={styles.ctaActions}>
          <Link href={cta.primaryHref} className={styles.ctaPrimary}>
            {cta.primaryLabel}
          </Link>

          {cta.secondaryLabel && cta.secondaryHref && (
            <Link href={cta.secondaryHref} className={styles.ctaSecondary}>
              {cta.secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
