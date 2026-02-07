"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Hero.module.css";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineArrowDown } from "react-icons/hi";

type HeroCMS = {
  fixedWord?: string; // es: "siamo"
  rotatingWords?: string[]; // es: ["strateghi", "designer", "creator"]
  ctaLabel?: string; // es: "Scopri di più"
  address?: string; // es: "Via Sanremo, 39 · 85100 Potenza (PZ)"
};

type HeroProps = {
  hero?: HeroCMS;
};

const FALLBACK: Required<HeroCMS> = {
  fixedWord: "siamo",
  rotatingWords: ["strateghi", "designer", "creator"],
  ctaLabel: "Scopri di più",
  address: "Via Sanremo, 39 · 85100 Potenza (PZ)",
};

export default function Hero({ hero }: HeroProps) {
  const data: Required<HeroCMS> = {
    fixedWord: hero?.fixedWord?.trim() || FALLBACK.fixedWord,
    rotatingWords:
      hero?.rotatingWords?.filter(Boolean).map((w) => String(w))?.length
        ? hero!.rotatingWords!.filter(Boolean).map((w) => String(w))
        : FALLBACK.rotatingWords,
    ctaLabel: hero?.ctaLabel?.trim() || FALLBACK.ctaLabel,
    address: hero?.address?.trim() || FALLBACK.address,
  };

  const titleWordsRef = useRef<HTMLSpanElement[]>([]);
  const rotatingWordRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const mouseGlowRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement[]>([]);
  const scrollBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    /* =========================
       ENTRATA TESTO (GSAP)
    ========================= */
    const titleEls = titleWordsRef.current.filter(Boolean);
    if (titleEls.length) {
      gsap.from(titleEls, {
        y: 120,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.12,
        delay: 0.2,
      });
    }

    /* =========================
       TYPEWRITER (da CMS)
    ========================= */
    const ROTATING_WORDS = data.rotatingWords;

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let pauseTimeout: ReturnType<typeof setTimeout> | null = null;

    const type = () => {
      const el = rotatingWordRef.current;
      if (!el) return;

      const current = ROTATING_WORDS[wordIndex] ?? "";

      if (!isDeleting) {
        charIndex++;
        el.textContent = current.slice(0, charIndex);

        if (charIndex === current.length) {
          if (pauseTimeout) clearTimeout(pauseTimeout);
          pauseTimeout = setTimeout(() => (isDeleting = true), 1200);
        }
      } else {
        charIndex--;
        el.textContent = current.slice(0, charIndex);

        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % ROTATING_WORDS.length;
        }
      }
    };

    const typingInterval = window.setInterval(type, 80);

    gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.6,
      ease: "power1.inOut",
    });

    /* =========================
       BLOB MOVEMENT (GSAP - RANDOM, LIBERO, NON FISSO)
       - movimento “a target” random nello schermo
       - alterna lentezza e scatti
    ========================= */
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const rand = gsap.utils.random;

    const computeRange = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      return {
        x: w * 1.1,
        y: h * 1.0,
      };
    };

    const animateBlob = (blob: HTMLDivElement) => {
      if (prefersReduced) return;

      const { x, y } = computeRange();

      const isQuick = Math.random() < 0.28;
      const duration = isQuick ? rand(1.8, 3.2) : rand(6.5, 14.5);
      const ease = isQuick ? "power2.out" : "sine.inOut";

      gsap.to(blob, {
        x: rand(-x, x),
        y: rand(-y, y),
        scale: rand(0.75, 1.35),
        rotation: rand(-25, 25),
        duration,
        ease,
        onComplete: () => animateBlob(blob),
      });
    };

    blobsRef.current.forEach((blob, i) => {
      if (!blob) return;

      gsap.set(blob, { x: 0, y: 0, rotation: 0 });

      gsap.to(blob, {
        x: rand(-120, 120),
        y: rand(-120, 120),
        scale: rand(0.9, 1.15),
        duration: rand(1.2, 2.6),
        ease: "power2.out",
        delay: i * 0.06,
        onComplete: () => animateBlob(blob),
      });
    });

    /* =========================
       MOUSE GLOW (smooth con quickTo)
    ========================= */
    const glow = mouseGlowRef.current;
    const quickX = glow
      ? gsap.quickTo(glow, "x", { duration: 0.25, ease: "power3.out" })
      : null;
    const quickY = glow
      ? gsap.quickTo(glow, "y", { duration: 0.25, ease: "power3.out" })
      : null;

    const handleMouseMove = (e: MouseEvent) => {
      if (!glow || !quickX || !quickY) return;
      quickX(e.clientX);
      quickY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    /* =========================
       MAGNETIC BUTTON (corretto: dentro useEffect)
    ========================= */
    const btn = scrollBtnRef.current;
    let removeMagnet = () => {};

    if (btn) {
      const strength = 18;

      const onMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);

        gsap.to(btn, {
          x: dx / strength,
          y: dy / strength,
          duration: 0.28,
          ease: "power3.out",
        });
      };

      const onLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.65,
          ease: "elastic.out(1, 0.35)",
        });
      };

      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);

      removeMagnet = () => {
        btn.removeEventListener("mousemove", onMove);
        btn.removeEventListener("mouseleave", onLeave);
      };
    }

    return () => {
      window.clearInterval(typingInterval);
      if (pauseTimeout) clearTimeout(pauseTimeout);
      window.removeEventListener("mousemove", handleMouseMove);
      removeMagnet();

      blobsRef.current.forEach((b) => b && gsap.killTweensOf(b));
      if (glow) gsap.killTweensOf(glow);
    };
    // importante: l'effetto dipende dalle parole che arrivano dal CMS
  }, [data.rotatingWords.join("|")]);

  const scrollNext = () => {
    document
      .querySelector("#next-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.hero}>
      <div className={styles.noise} />

      {/* BACKGROUND BLOBS */}
      <div className={styles.background}>
        {[0, 1, 2, 3].map((_, i) => (
          <div
            key={i}
            className={styles.blob}
            ref={(el) => {
              if (el) blobsRef.current[i] = el;
            }}
          />
        ))}
      </div>

      {/* MOUSE GLOW */}
      <div ref={mouseGlowRef} className={styles.mouseGlow} />

      {/* CONTENT */}
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span
            className={styles.word}
            ref={(el) => {
              if (el) titleWordsRef.current[0] = el;
            }}
          >
            {data.fixedWord}
          </span>
          <br />
          <span className={styles.typing}>
            <span ref={rotatingWordRef} />
            <span ref={cursorRef} className={styles.cursor}>
              /
            </span>
          </span>
        </h1>
      </div>

      {/* FOOTER */}
      <div className={styles.heroFooter}>
        <div className={styles.address}>{data.address}</div>

        <button
          ref={scrollBtnRef}
          onClick={scrollNext}
          className={styles.scrollButton}
        >
          <span>{data.ctaLabel}</span>
          <HiOutlineArrowDown className={styles.scrollIcon} />
        </button>

        <div className={styles.socials}>
          <a href="#">
            <FaFacebookF />
            <span>Facebook</span>
          </a>
          <a href="#">
            <FaInstagram />
            <span>Instagram</span>
          </a>
          <a href="#">
            <FaLinkedinIn />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
}
