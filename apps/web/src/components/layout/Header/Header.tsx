"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import FullscreenMenu from "./FullscreenMenu";


/* =========================
   TYPES
========================= */

export type HeaderData = {
  logo?: {
    asset?: {
      url: string;
    };
  };
  menuLeft?: { label: string; link: string }[];
  menuRightTitle?: { label: string; link: string };
  menuRight?: { label: string; link: string }[];
  address?: string;
  bottomTags?: string;
  socials?: {
    type: "instagram" | "facebook" | "linkedin" | "twitter";
    url: string;
  }[];
};


type Props = {
  data: HeaderData | null;
};

export default function Header({ data }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* SCROLL EFFECT */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.inner}>
          {/* LOGO */}
          <Link
            href="/"
            className={styles.logo}
            aria-label="Torna alla home"
          >
            <Image
              src={data?.logo?.asset?.url || "/logo-toodigital.png"}
              alt="Too Digital"
              width={140}
              height={36}
              priority
            />
          </Link>

          {/* ACTIONS */}
          <div className={styles.actions}>
            {/* DESKTOP CTA */}
            <a href="/contatti" className={styles.cta}>
              CONTATTACI
            </a>

            {/* MENU BUTTON */}
            <button
              className={`${styles.menuButton} ${
                menuOpen ? styles.menuOpen : ""
              }`}
              aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={styles.menuText}>
                {menuOpen ? "Chiudi" : "Menu"}
              </span>

              <span className={styles.menuIcon}>
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* FULLSCREEN MENU */}
      <FullscreenMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        data={data}
      />
    </>
  );
}
