"use client";

import { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./services.module.css";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

type Props = {
  items: string[];
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
};

const ServicesStickyNav = forwardRef<HTMLDivElement, Props>(
  ({ items, activeIndex, onPrev, onNext }, ref) => {
    const titleRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      const el = titleRef.current;
      if (!el) return;

      gsap.fromTo(
        el,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" }
      );
    }, [activeIndex]);

    const canPrev = activeIndex > 0;
    const canNext = activeIndex < items.length - 1;

    const currentLabel = items[activeIndex] || "Soluzione";
    const currentIndexLabel = String(activeIndex + 1).padStart(2, "0");
    const totalLabel = String(items.length).padStart(2, "0");

    return (
      <div ref={ref} className={styles.stickyNav}>
        <div className={styles.stickyNavInner}>
          <button
            type="button"
            className={styles.navArrow}
            onClick={onPrev}
            disabled={!canPrev}
            aria-label="Soluzione precedente"
          >
            <HiOutlineChevronLeft />
          </button>

          <div className={styles.navCenter} aria-live="polite">
            <span className={styles.navEyebrow}>Soluzione attiva</span>
            <span className={styles.navTitle} ref={titleRef}>
              {currentLabel}
            </span>
          </div>

          <div className={styles.navMeta} aria-hidden="true">
            {currentIndexLabel} / {totalLabel}
          </div>

          <button
            type="button"
            className={styles.navArrow}
            onClick={onNext}
            disabled={!canNext}
            aria-label="Soluzione successiva"
          >
            <HiOutlineChevronRight />
          </button>
        </div>
      </div>
    );
  }
);

ServicesStickyNav.displayName = "ServicesStickyNav";
export default ServicesStickyNav;