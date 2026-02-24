"use client";

import { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./services.module.css";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

type Props = {
    items: string[];
    activeIndex: number;
    progress: number;
    onPrev: () => void;
    onNext: () => void;
};

const ServicesStickyNav = forwardRef<HTMLDivElement, Props>(
    ({ items, activeIndex, progress, onPrev, onNext }, ref) => {
        const titleRef = useRef<HTMLSpanElement>(null);

        // micro transizione titolo (slide/fade)
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

        return (
            <div ref={ref} className={styles.stickyNav}>
                <div className={styles.stickyNavInner}>
                    <button
                        type="button"
                        className={styles.navArrow}
                        onClick={onPrev}
                        disabled={!canPrev}
                        aria-label="Servizio precedente"
                    >
                        <HiOutlineChevronLeft />
                    </button>

                    <div className={styles.navTitleWrap} aria-live="polite">
                        <span className={styles.navTitle} ref={titleRef}>
                            {items[activeIndex] || "Servizio"}
                        </span>
                    </div>

                    <button
                        type="button"
                        className={styles.navArrow}
                        onClick={onNext}
                        disabled={!canNext}
                        aria-label="Servizio successivo"
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