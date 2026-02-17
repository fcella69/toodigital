"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./web.module.css";

type StandardItem = {
  title: string;
  text: string;
};

type Props = {
  standard: {
    kicker?: string;
    title: string;
    text?: string;
    items?: StandardItem[];
  };
};

export default function WebStandard({ standard }: Props) {
  const items = standard.items ?? [];
  const [active, setActive] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startY = useRef<number | null>(null);

  /* =========================
     AUTO ROTATE
  ========================= */
  useEffect(() => {
    if (items.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 4500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [items.length]);

  const pause = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const resume = () => {
    if (items.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 4500);
  };

  /* =========================
     WHEEL NAVIGATION
  ========================= */
  const onWheel = (e: React.WheelEvent) => {
    if (items.length <= 1) return;

    e.preventDefault();

    if (e.deltaY > 0) {
      setActive((prev) => (prev + 1) % items.length);
    } else {
      setActive((prev) =>
        prev === 0 ? items.length - 1 : prev - 1
      );
    }
  };

  /* =========================
     DRAG NAVIGATION
  ========================= */
  const onMouseDown = (e: React.MouseEvent) => {
    startY.current = e.clientY;
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (startY.current === null) return;

    const diff = e.clientY - startY.current;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setActive((prev) =>
          prev === 0 ? items.length - 1 : prev - 1
        );
      } else {
        setActive((prev) => (prev + 1) % items.length);
      }
    }

    startY.current = null;
  };

  const getCardState = (index: number) => {
    if (index === active) return styles.webStandardCardActive;

    if (
      index === active - 1 ||
      (active === 0 && index === items.length - 1)
    )
      return styles.webStandardCardPrev;

    if (
      index === active + 1 ||
      (active === items.length - 1 && index === 0)
    )
      return styles.webStandardCardNext;

    return styles.webStandardCardHidden;
  };

  return (
    <section className={styles.webStandardSection}>
      <div className={styles.webStandardInner}>
        <div className={styles.webStandardGrid}>
          {/* LEFT */}
          <div className={styles.webStandardContent}>
            {standard.kicker && (
              <span className={styles.webStandardKicker}>
                {standard.kicker}
              </span>
            )}
            <h2 className={styles.webStandardTitle}>
              {standard.title}
            </h2>
            {standard.text && (
              <p className={styles.webStandardText}>
                {standard.text}
              </p>
            )}
          </div>

          {/* RIGHT ROTATOR */}
          {items.length > 0 && (
            <div
              className={styles.webStandardCarousel}
              onWheel={onWheel}
              onMouseEnter={pause}
              onMouseLeave={resume}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
            >
              <div className={styles.webStandardStack}>
                {items.map((item, i) => (
                  <div
                    key={i}
                    className={`${styles.webStandardCard} ${getCardState(i)}`}
                  >
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
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
