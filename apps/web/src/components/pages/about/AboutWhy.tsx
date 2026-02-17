"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./about.module.css";

type WhyItem = {
  title: string;
  text: string;
};

type Props = {
  why: {
    kicker?: string;
    title: string;
    text: string;
    items?: WhyItem[];
  };
};

export default function AboutWhy({ why }: Props) {
  const items = why.items ?? [];
  const [active, setActive] = useState(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number | null>(null);

  /* =========================
     NAVIGATION HELPERS
  ========================= */

  const goNext = () => {
    setActive((prev) => (prev + 1) % items.length);
  };

  const goPrev = () => {
    setActive((prev) =>
      prev === 0 ? items.length - 1 : prev - 1
    );
  };

  /* =========================
     AUTO ROTATE
  ========================= */

  useEffect(() => {
    if (items.length <= 1) return;

    intervalRef.current = setInterval(goNext, 4500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [items.length]);

  /* =========================
     PAUSE ON HOVER
  ========================= */

  const pause = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const resume = () => {
    if (items.length <= 1) return;
    intervalRef.current = setInterval(goNext, 4500);
  };

  /* =========================
     WHEEL FIX (NO PAGE SCROLL)
  ========================= */

  useEffect(() => {
    const el = carouselRef.current;
    if (!el || items.length <= 1) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (e.deltaY > 0) {
        goNext();
      } else {
        goPrev();
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, [items.length]);

  /* =========================
     DRAG SUPPORT (MOUSE + TOUCH)
  ========================= */

  const handlePointerDown = (e: React.PointerEvent) => {
    startY.current = e.clientY;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (startY.current === null) return;

    const diff = e.clientY - startY.current;

    if (diff > 40) goPrev();
    if (diff < -40) goNext();

    startY.current = null;
  };

  /* =========================
     CARD STATE
  ========================= */

  const getCardState = (index: number) => {
    if (index === active) return styles.whyCardActive;

    if (
      index === active - 1 ||
      (active === 0 && index === items.length - 1)
    )
      return styles.whyCardPrev;

    if (
      index === active + 1 ||
      (active === items.length - 1 && index === 0)
    )
      return styles.whyCardNext;

    return styles.whyCardHidden;
  };

  /* =========================
     RENDER
  ========================= */

  return (
    <section className={styles.whySection}>
      <div className={styles.whyInner}>
        <div className={styles.whyLayout}>
          {/* LEFT CONTENT */}
          <div className={styles.whyContent}>
            {why.kicker && (
              <span className={styles.whyKicker}>{why.kicker}</span>
            )}
            <h2 className={styles.whyTitle}>{why.title}</h2>
            <p className={styles.whyText}>{why.text}</p>
          </div>

          {/* RIGHT CAROUSEL */}
          {items.length > 0 && (
            <div
              ref={carouselRef}
              className={styles.whyCarousel}
              onMouseEnter={pause}
              onMouseLeave={resume}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
            >
              <div className={styles.whyStack}>
                {items.map((item, i) => (
                  <div
                    key={i}
                    className={`${styles.whyCard} ${getCardState(i)}`}
                  >
                    <h3 className={styles.whyCardTitle}>
                      {item.title}
                    </h3>
                    <p className={styles.whyCardText}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
