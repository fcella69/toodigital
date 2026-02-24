"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./FullscreenMenu.module.css";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";


import type { HeaderData } from "./Header";

type Props = {
  open: boolean;
  onClose: () => void;
  data: HeaderData | null;
};

const SOCIAL_ICONS = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  twitter: FaXTwitter,
};


export default function FullscreenMenu({
  open,
  onClose,
  data,
}: Props) {
  const [shouldRender, setShouldRender] = useState(open);

  const overlayRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  /* PREVENT FLASH */
  useLayoutEffect(() => {
    if (!overlayRef.current) return;
    gsap.set(overlayRef.current, {
      autoAlpha: 0,
      pointerEvents: "none",
    });
  }, []);

  useEffect(() => {
    if (open) setShouldRender(true);
  }, [open]);

  useEffect(() => {
    if (!shouldRender || !overlayRef.current) return;

    tlRef.current?.kill();

    const overlay = overlayRef.current;
    const items = overlay.querySelectorAll("li");

    if (open) {
      gsap.set(overlay, { pointerEvents: "auto" });

      tlRef.current = gsap
        .timeline()
        .to(overlay, {
          autoAlpha: 1,
          duration: 0.35,
          ease: "power2.out",
        })
        .from(
          [leftRef.current, rightRef.current],
          {
            y: 48,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
            stagger: 0.12,
          },
          0.1
        )
        .from(
          items,
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.06,
          },
          0.35
        )
        .from(
          bottomRef.current,
          {
            y: 16,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          0.55
        );
    } else {
      tlRef.current = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, {
            autoAlpha: 0,
            pointerEvents: "none",
          });
          setShouldRender(false);
        },
      });

      tlRef.current.to(overlay, {
        autoAlpha: 0,
        duration: 0.25,
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
        {/* LEFT */}
        <nav ref={leftRef} className={styles.left}>
          <ul>
            {data?.menuLeft?.map((item, i) => (
              <li key={i}>
                <a href={item.link}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* RIGHT */}
        <div ref={rightRef} className={styles.right}>
          {data?.menuRightTitle && (
            <span className={styles.sectionTitle}>
              <a href={data?.menuRightTitle?.link}>
                {data?.menuRightTitle?.label}
              </a>
            </span>
          )}

          <ul>
            {data?.menuRight?.map((item, i) => (
              <li key={i}>
                <a href={item.link}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div ref={bottomRef} className={styles.bottom}>
        {data?.address && (
          <div className={styles.address}>{data.address}</div>
        )}

        {data?.bottomTags && (
          <div className={styles.bottomCenter}>
            {data.bottomTags}
          </div>
        )}

        <div className={styles.socials}>
          {data?.socials?.map((s, i) => {
            const Icon = SOCIAL_ICONS[s.type];

            return (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon />
                <span>{s.type}</span>
              </a>
            );
          })}
        </div>

      </div>

      <button
        className={styles.closeArea}
        aria-label="Chiudi menu"
        onClick={onClose}
      />
    </div>
  );
}
