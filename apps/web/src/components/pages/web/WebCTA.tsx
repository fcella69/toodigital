"use client";

import { useEffect, useRef } from "react";
import styles from "./web.module.css";
import GridBackground from "@/components/ui/GridBackground/GridBackground";

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

export default function WebCTA({ cta }: Props) {
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
    <section className={styles.webCtaSection}>
      <GridBackground />
      <div ref={glowRef} className={styles.webCtaGlow} />
      <div className={styles.webCtaNoise} />

      <div className={styles.webCtaInner}>
        {cta.kicker && (
          <span className={styles.webCtaKicker}>{cta.kicker}</span>
        )}

        <h2 className={styles.webCtaTitle}>{cta.title}</h2>

        {cta.subtitle && (
          <p className={styles.webCtaSubtitle}>{cta.subtitle}</p>
        )}

        <div className={styles.webCtaButtons}>
          <a href={cta.primaryHref} className={styles.webCtaPrimary}>
            {cta.primaryLabel}
          </a>

          {cta.secondaryLabel && cta.secondaryHref && (
            <a
              href={cta.secondaryHref}
              className={styles.webCtaSecondary}
            >
              {cta.secondaryLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
