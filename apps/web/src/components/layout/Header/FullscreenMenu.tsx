"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./FullscreenMenu.module.css";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function FullscreenMenu({ open, onClose }: Props) {
  const [shouldRender, setShouldRender] = useState(open);

  const overlayRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // 1) evita flash: prima del paint settiamo hidden
  useLayoutEffect(() => {
    if (!overlayRef.current) return;

    gsap.set(overlayRef.current, {
      autoAlpha: 0,
      pointerEvents: "none",
    });
  }, []);

  // 2) se open diventa true, montiamo e animiamo apertura
  useEffect(() => {
    if (open) setShouldRender(true);
  }, [open]);

  // 3) play open/close quando cambia open (ma solo se renderizzato)
  useEffect(() => {
    if (!shouldRender) return;
    if (!overlayRef.current) return;

    // kill timeline precedente
    tlRef.current?.kill();
    tlRef.current = null;

    const overlay = overlayRef.current;

    const left = leftRef.current;
    const right = rightRef.current;
    const bottom = bottomRef.current;

    const menuLis = overlay.querySelectorAll("li");

    if (open) {
      // OPEN
      gsap.set(overlay, { pointerEvents: "auto" });

      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.set(overlay, { autoAlpha: 1 })
        .fromTo(
          overlay,
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: "power2.out" },
          0
        )
        .from(
          [left, right],
          {
            y: 36,
            opacity: 0,
            duration: 0.85,
            ease: "power4.out",
            stagger: 0.12,
          },
          0.08
        )
        .from(
          menuLis,
          {
            y: 18,
            opacity: 0,
            duration: 0.55,
            ease: "power3.out",
            stagger: 0.05,
          },
          0.22
        )
        .from(
          bottom,
          {
            y: 18,
            opacity: 0,
            duration: 0.55,
            ease: "power3.out",
          },
          0.45
        );
    } else {
      // CLOSE (con animazione, poi smontiamo)
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
          setShouldRender(false);
        },
      });
      tlRef.current = tl;

      tl.to(overlay, {
        opacity: 0,
        duration: 0.28,
        ease: "power2.in",
      });
    }

    return () => {
      tlRef.current?.kill();
      tlRef.current = null;
    };
  }, [open, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div ref={overlayRef} className={styles.overlay}>
      <div className={styles.container}>
        {/* LEFT MENU */}
        <nav ref={leftRef} className={styles.left}>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/chi-siamo">Chi siamo</a></li>
            <li><a href="/portfolio">Portfolio</a></li>
            <li><a href="/contatti">Contatti</a></li>
          </ul>
        </nav>

        {/* RIGHT MENU */}
        <div ref={rightRef} className={styles.right}>
          <span className={styles.sectionTitle}>Comunicazione</span>
          <ul>
            <li><a href="/comunicazione/branding">Branding</a></li>
            <li><a href="/comunicazione/web-design">Web Design</a></li>
            <li><a href="/comunicazione/social">Gestione Social</a></li>
            <li><a href="/comunicazione/fotografia">Fotografia</a></li>
          </ul>
        </div>
      </div>

      {/* BOTTOM INFO */}
      <div ref={bottomRef} className={styles.bottom}>
        <div className={styles.address}>
          Via Sanremo, 39 · 85100 Potenza (PZ)
        </div>

        <div className={styles.bottomCenter}>
          Startup · PMI · Brand culturali · Professionisti
        </div>

        <div className={styles.socials}>
          <a href="#" aria-label="Instagram">
            <FaInstagram />
            <span>Instagram</span>
          </a>
          <a href="#" aria-label="Facebook">
            <FaFacebookF />
            <span>Facebook</span>
          </a>
          <a href="#" aria-label="LinkedIn">
            <FaLinkedinIn />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      {/* CLICK AREA TO CLOSE */}
      <button
        aria-label="Chiudi menu"
        className={styles.closeArea}
        onClick={onClose}
      />
    </div>
  );
}
