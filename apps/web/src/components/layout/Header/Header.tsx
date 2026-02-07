"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import FullscreenMenu from "./FullscreenMenu";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

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
          <div className={styles.logo}>
            <Image
              src="/logo-kerning.png"
              alt="Kerning Digital Studio"
              width={140}
              height={36}
              priority
            />
          </div>

          {/* RIGHT ACTIONS */}
          <div className={styles.actions}>
            {/* DESKTOP CTA */}
            <a href="#contatti" className={styles.cta}>
              CONTATTACI
            </a>

            {/* MENU */}
            <button
              className={`${styles.menuButton} ${
                menuOpen ? styles.menuOpen : ""
              }`}
              aria-label="Menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={styles.menuText}>Menu</span>

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
      />
    </>
  );
}
