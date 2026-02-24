"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./services.module.css";
import GridBackground from "@/components/ui/GridBackground/GridBackground";

type Props = {
  hero: {
    title: string;
    subtitle: string;
  };
};

export default function ServicesHero({ hero }: Props) {
  const mouseGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = mouseGlowRef.current;
    if (!glow) return;

    const quickX = gsap.quickTo(glow, "x", {
      duration: 0.4,
      ease: "power3.out",
    });

    const quickY = gsap.quickTo(glow, "y", {
      duration: 0.4,
      ease: "power3.out",
    });

    const onMouseMove = (e: MouseEvent) => {
      quickX(e.clientX);
      quickY(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section className={styles.hero}>
      {/* GRID BACKGROUND */}
      <GridBackground />

      {/* MOUSE GLOW */}
      <div ref={mouseGlowRef} className={styles.mouseGlow} />

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