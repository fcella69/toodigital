"use client";

import { useEffect, useRef } from "react";
import GridBackground from "@/components/ui/GridBackground/GridBackground";
import styles from "./contacts.module.css";

type Props = {
  title: string;
  subtitle: string;
};

export default function ContactsHero({ title, subtitle }: Props) {
  const glowRef = useRef<HTMLDivElement>(null);

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
      <GridBackground />
      <div ref={glowRef} className={styles.mouseGlow} />
      <div className={styles.heroNoise} />

      <div className={styles.heroInner}>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroSubtitle}>{subtitle}</p>
      </div>
    </section>
  );
}
