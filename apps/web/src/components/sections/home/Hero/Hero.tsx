"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Hero.module.css";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { HiOutlineArrowDown } from "react-icons/hi";

import GridBackground from "@/components/ui/GridBackground/GridBackground";


/* =========================
   TYPES (CMS)
========================= */

type HeroSocial = {
  label: string;
  url: string;
  type: "linkedin" | "instagram" | "facebook";
};

type HeroCMS = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  socials?: HeroSocial[];
};

type HeroProps = {
  hero?: HeroCMS;
};

/* =========================
   FALLBACK
========================= */

const FALLBACK = {
  title: "Esperti in transizione digitale",
  subtitle:
    "Affianchiamo aziende strutturate nella progettazione e realizzazione di soluzioni digitali efficaci, scalabili e orientate al futuro.",
  ctaLabel: "Scopri di più",
};

/* =========================
   SOCIAL ICON MAP
========================= */

const SOCIAL_ICONS: Record<HeroSocial["type"], JSX.Element> = {
  linkedin: <FaLinkedinIn />,
  instagram: <FaInstagram />,
  facebook: <FaFacebookF />,
};

export default function Hero({ hero }: HeroProps) {
  const data = {
    title: hero?.title?.trim() || FALLBACK.title,
    subtitle: hero?.subtitle?.trim() || FALLBACK.subtitle,
    ctaLabel: hero?.ctaLabel?.trim() || FALLBACK.ctaLabel,
    socials: hero?.socials || [],
  };

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const mouseGlowRef = useRef<HTMLDivElement>(null);

  /* =========================
     ANIMAZIONI ENTRATA + GLOW
  ========================= */

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.25 });

    tl.from(titleRef.current, {
      y: 90,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    })
      .from(
        subtitleRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power4.out",
        },
        "-=0.6"
      )
      .from(
        ctaRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.5"
      );

    const glow = mouseGlowRef.current;
    if (!glow) return;

    const quickX = gsap.quickTo(glow, "x", {
      duration: 0.35,
      ease: "power3.out",
    });
    const quickY = gsap.quickTo(glow, "y", {
      duration: 0.35,
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

 


  const scrollNext = () => {
    document
      .querySelector("#next-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.hero}>
      <GridBackground />
      {/* MOUSE GLOW */}
      <div ref={mouseGlowRef} className={styles.mouseGlow} />

      {/* NOISE */}
      <div className={styles.noise} />

      {/* CONTENT */}
      <div className={styles.content}>
        <h1 ref={titleRef} className={styles.title}>
          {data.title}
        </h1>

        <p ref={subtitleRef} className={styles.subtitle}>
          {data.subtitle}
        </p>
      </div>

      {/* CTA */}
      <button
        ref={ctaRef}
        onClick={scrollNext}
        className={styles.scrollButton}
      >
        <span>{data.ctaLabel}</span>
        <HiOutlineArrowDown className={styles.scrollIcon} />
      </button>

      {/* SOCIALS */}
      {data.socials.length > 0 && (
        <div className={styles.socials}>
          {data.socials.map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {SOCIAL_ICONS[social.type]}
              <span>{social.label}</span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
