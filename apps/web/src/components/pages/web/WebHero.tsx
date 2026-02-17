"use client";

import { useEffect, useRef } from "react";
import styles from "./web.module.css";
import GridBackground from "@/components/ui/GridBackground/GridBackground";

type Props = {
  title: string;
  subtitle?: string;
};

export default function WebHero({ title, subtitle }: Props) {
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
    <section className={styles.hero}>
      {/* GRID BACKGROUND */}
      <GridBackground />

      {/* MOUSE GLOW */}
      <div ref={glowRef} className={styles.mouseGlow} />

      {/* NOISE */}
      <div className={styles.heroNoise} />

      {/* CONTENT */}
      <div className={styles.heroInner}>
        <h1 className={styles.heroTitle}>{title}</h1>
        {subtitle && (
          <p className={styles.heroSubtitle}>{subtitle}</p>
        )}
      </div>
    </section>
  );
}
