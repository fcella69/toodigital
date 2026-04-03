"use client";

import Link from "next/link";
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
  x: FaXTwitter,
} as const;

const SOCIAL_LABELS = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  twitter: "Twitter",
  x: "X",
} as const;

function normalizeSocialType(type?: string) {
  return (type ?? "").trim().toLowerCase();
}

function getSocialLabel(type?: string) {
  const normalized = normalizeSocialType(type);

  if (!normalized) return "Social";

  return (
    SOCIAL_LABELS[normalized as keyof typeof SOCIAL_LABELS] ??
    `${normalized.charAt(0).toUpperCase()}${normalized.slice(1)}`
  );
}

function getSocialIcon(type?: string) {
  const normalized = normalizeSocialType(type);

  return SOCIAL_ICONS[normalized as keyof typeof SOCIAL_ICONS] ?? null;
}

export default function FullscreenMenu({ open, onClose, data }: Props) {
  const [shouldRender, setShouldRender] = useState(open);

  const overlayRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    if (!overlayRef.current) return;

    gsap.set(overlayRef.current, {
      autoAlpha: 0,
      pointerEvents: "none",
    });
  }, []);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

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
    <div ref={overlayRef} className={styles.overlay} aria-hidden={!open}>
      <div className={styles.container}>
        <nav ref={leftRef} className={styles.left} aria-label="Menu principale">
          <ul>
            {data?.menuLeft?.map((item, index) => (
              <li key={`${item.link}-${index}`}>
                <Link href={item.link} onClick={onClose}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div ref={rightRef} className={styles.right}>
          {data?.menuRightTitle && (
            <span className={styles.sectionTitle}>
              <Link href={data.menuRightTitle.link} onClick={onClose}>
                {data.menuRightTitle.label}
              </Link>
            </span>
          )}

          <ul>
            {data?.menuRight?.map((item, index) => (
              <li key={`${item.link}-${index}`}>
                <Link href={item.link} onClick={onClose}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div ref={bottomRef} className={styles.bottom}>
        {data?.address && <div className={styles.address}>{data.address}</div>}

        {data?.bottomTags && (
          <div className={styles.bottomCenter}>{data.bottomTags}</div>
        )}

        <div className={styles.socials}>
          {data?.socials?.map((social, index) => {
            const Icon = getSocialIcon(social.type);
            const label = getSocialLabel(social.type);

            return (
              <a
                key={`${social.url}-${index}`}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
              >
                {Icon && <Icon />}
                <span>{label}</span>
              </a>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className={styles.closeArea}
        aria-label="Chiudi menu"
        onClick={onClose}
      />
    </div>
  );
}