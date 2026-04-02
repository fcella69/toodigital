"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./services.module.css";

import ServicesStickyNav from "./ServicesStickyNav";

import ServiceWeb from "./ServiceWeb";
import ServiceBrand from "./ServiceBrand";
import ServiceGrowth from "./ServiceGrowth";
import ServiceConsulting from "./ServiceConsulting";

type Props = {
  web: any;
  brand: any;
  growth: any;
  consulting: any;
};

type SectionItem = {
  id: string;
  comp: any;
  data: any;
};

type TransitionOptions = {
  animate?: boolean;
  updateHash?: boolean;
  replaceHash?: boolean;
};

export default function ServicesSections({
  web,
  brand,
  growth,
  consulting,
}: Props) {
  const sections = useMemo<SectionItem[]>(
    () =>
      [
        { id: "web", comp: ServiceWeb, data: web },
        { id: "brand", comp: ServiceBrand, data: brand },
        { id: "growth", comp: ServiceGrowth, data: growth },
        { id: "consulting", comp: ServiceConsulting, data: consulting },
      ].filter((section) => Boolean(section.data)),
    [web, brand, growth, consulting]
  );

  const stageShellRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const currentIndexRef = useRef(0);
  const animatingRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);

  const getIndexFromHash = useCallback(
    (hash: string) => {
      const cleanHash = hash.replace("#", "").trim().toLowerCase();
      if (!cleanHash) return -1;

      return sections.findIndex(
        (section) => section.id.toLowerCase() === cleanHash
      );
    },
    [sections]
  );

  const setHash = useCallback(
    (index: number, replace = false) => {
      const target = sections[index];
      if (!target) return;

      const nextHash = `#${target.id}`;
      const currentHash = window.location.hash;

      if (currentHash === nextHash) return;

      const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`;

      if (replace) {
        window.history.replaceState({ serviceSection: target.id }, "", nextUrl);
      } else {
        window.history.pushState({ serviceSection: target.id }, "", nextUrl);
      }
    },
    [sections]
  );

  const scrollStageToTop = useCallback((smooth = true) => {
    if (!stageShellRef.current) return;

    const rootStyles = getComputedStyle(document.documentElement);
    const headerHeightVar = rootStyles
      .getPropertyValue("--header-height")
      .trim();

    const parsedHeaderHeight = Number.parseInt(headerHeightVar, 10);
    const headerHeight = Number.isNaN(parsedHeaderHeight)
      ? 84
      : parsedHeaderHeight;

    const stickyNavOffset = 96;

    const top =
      window.scrollY +
      stageShellRef.current.getBoundingClientRect().top -
      headerHeight -
      stickyNavOffset;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

  const getPanelHeight = useCallback((index: number) => {
    const panel = panelRefs.current[index];
    if (!panel) return 0;

    return panel.offsetHeight;
  }, []);

  const syncStageHeight = useCallback(
    (index: number, animate = false) => {
      const stage = stageRef.current;
      if (!stage) return;

      const nextHeight = getPanelHeight(index);
      if (!nextHeight) return;

      if (animate) {
        gsap.to(stage, {
          height: nextHeight,
          duration: 0.42,
          ease: "power2.out",
          overwrite: true,
        });
      } else {
        gsap.set(stage, {
          height: nextHeight,
        });
      }
    },
    [getPanelHeight]
  );

  const lockStageHeightForTransition = useCallback(
    (fromIndex: number, toIndex: number) => {
      const stage = stageRef.current;
      if (!stage) return;

      const fromHeight = getPanelHeight(fromIndex);
      const toHeight = getPanelHeight(toIndex);
      const lockedHeight = Math.max(fromHeight, toHeight);

      if (!lockedHeight) return;

      gsap.set(stage, {
        height: lockedHeight,
      });
    },
    [getPanelHeight]
  );

  const showPanelImmediately = useCallback(
    (index: number) => {
      panelRefs.current.forEach((panel, panelIndex) => {
        if (!panel) return;

        if (panelIndex === index) {
          gsap.set(panel, {
            display: "block",
            autoAlpha: 1,
            xPercent: 0,
            scale: 1,
            zIndex: 2,
            pointerEvents: "auto",
            force3D: true,
          });
        } else {
          gsap.set(panel, {
            display: "block",
            autoAlpha: 0,
            xPercent: 0,
            scale: 1,
            zIndex: 1,
            pointerEvents: "none",
            force3D: true,
          });
        }
      });

      currentIndexRef.current = index;
      setActiveIndex(index);
      animatingRef.current = false;

      requestAnimationFrame(() => {
        syncStageHeight(index, false);
      });
    },
    [syncStageHeight]
  );

  const goToIndex = useCallback(
    (targetIndex: number, options: TransitionOptions = {}) => {
      const {
        animate = true,
        updateHash = true,
        replaceHash = false,
      } = options;

      if (targetIndex < 0 || targetIndex > sections.length - 1) return;
      if (animatingRef.current) return;

      const currentIndex = currentIndexRef.current;

      if (targetIndex === currentIndex) {
        scrollStageToTop(true);

        if (updateHash) {
          setHash(targetIndex, replaceHash);
        }
        return;
      }

      const currentPanel = panelRefs.current[currentIndex];
      const nextPanel = panelRefs.current[targetIndex];
      const stage = stageRef.current;

      if (!currentPanel || !nextPanel || !stage) return;

      scrollStageToTop(true);

      if (!animate) {
        showPanelImmediately(targetIndex);

        if (updateHash) {
          setHash(targetIndex, replaceHash);
        }

        requestAnimationFrame(() => {
          scrollStageToTop(false);
        });

        return;
      }

      animatingRef.current = true;

      const direction = targetIndex > currentIndex ? 1 : -1;

      gsap.killTweensOf([currentPanel, nextPanel, stage]);

      lockStageHeightForTransition(currentIndex, targetIndex);

      gsap.set(currentPanel, {
        display: "block",
        autoAlpha: 1,
        xPercent: 0,
        scale: 1,
        zIndex: 3,
        pointerEvents: "none",
        transformOrigin: "center center",
        force3D: true,
        borderRadius: 0,
        boxShadow: "0 0 0 0 rgba(33, 59, 110, 0)",
      });

      gsap.set(nextPanel, {
        display: "block",
        autoAlpha: 1,
        xPercent: direction > 0 ? 100 : -100,
        scale: 1.02,
        zIndex: 5,
        pointerEvents: "none",
        transformOrigin: "center center",
        force3D: true,
        borderRadius: 0,
        boxShadow: "0 0 0 0 rgba(33, 59, 110, 0)",
      });

      setActiveIndex(targetIndex);

      if (updateHash) {
        setHash(targetIndex, replaceHash);
      }

      const tl = gsap.timeline({
        defaults: {
          overwrite: "auto",
        },
        onComplete: () => {
          gsap.set(currentPanel, {
            autoAlpha: 0,
            xPercent: 0,
            scale: 1,
            zIndex: 1,
            pointerEvents: "none",
            borderRadius: 0,
            boxShadow: "0 0 0 0 rgba(33, 59, 110, 0)",
          });

          gsap.set(nextPanel, {
            autoAlpha: 1,
            xPercent: 0,
            scale: 1,
            zIndex: 2,
            pointerEvents: "auto",
            borderRadius: 0,
            boxShadow: "0 0 0 0 rgba(33, 59, 110, 0)",
          });

          currentIndexRef.current = targetIndex;
          animatingRef.current = false;

          syncStageHeight(targetIndex, true);

          requestAnimationFrame(() => {
            scrollStageToTop(false);
          });
        },
      });

      tl.to(
        currentPanel,
        {
          duration: 0.2,
          scale: 0.968,
          borderRadius: 30,
          boxShadow:
            "0 0 0 1px rgba(41, 67, 122, 0.72), 0 22px 60px rgba(8, 12, 22, 0.42)",
          ease: "power2.out",
        },
        0
      )
        .to(
          nextPanel,
          {
            duration: 0.28,
            xPercent: direction > 0 ? 8 : -8,
            scale: 1.008,
            ease: "power3.out",
          },
          0.08
        )
        .to(
          currentPanel,
          {
            duration: 0.34,
            xPercent: direction > 0 ? -20 : 20,
            scale: 0.936,
            ease: "power3.in",
          },
          0.12
        )
        .to(
          nextPanel,
          {
            duration: 0.46,
            xPercent: 0,
            scale: 1,
            ease: "power4.out",
          },
          0.28
        )
        .to(
          currentPanel,
          {
            duration: 0.2,
            autoAlpha: 0.08,
            ease: "power2.out",
          },
          0.34
        );
    },
    [
      sections.length,
      lockStageHeightForTransition,
      scrollStageToTop,
      setHash,
      showPanelImmediately,
      syncStageHeight,
    ]
  );

  useEffect(() => {
    if (!sections.length) return;

    const hashIndex = getIndexFromHash(window.location.hash);
    const initialIndex = hashIndex >= 0 ? hashIndex : 0;

    requestAnimationFrame(() => {
      showPanelImmediately(initialIndex);

      if (hashIndex >= 0) {
        scrollStageToTop(false);
      }
    });

    const observer = new ResizeObserver(() => {
      if (!animatingRef.current) {
        syncStageHeight(currentIndexRef.current, false);
      }
    });

    panelRefs.current.forEach((panel) => {
      if (panel) observer.observe(panel);
    });

    resizeObserverRef.current = observer;

    const onPopState = () => {
      const indexFromHash = getIndexFromHash(window.location.hash);
      const safeIndex = indexFromHash >= 0 ? indexFromHash : 0;

      goToIndex(safeIndex, {
        animate: true,
        updateHash: false,
      });
    };

    const onHashChange = () => {
      const indexFromHash = getIndexFromHash(window.location.hash);
      const safeIndex = indexFromHash >= 0 ? indexFromHash : 0;

      goToIndex(safeIndex, {
        animate: true,
        updateHash: false,
      });
    };

    window.addEventListener("popstate", onPopState);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [
    sections,
    getIndexFromHash,
    goToIndex,
    scrollStageToTop,
    showPanelImmediately,
    syncStageHeight,
  ]);

  if (!sections.length) return null;

  return (
    <section className={styles.servicesArea} id="services-area">
      <div className={styles.servicesBg} />

      <div className={styles.servicesContent}>
        <ServicesStickyNav
          items={sections.map((section) => section.data?.navTitle || section.id)}
          activeIndex={activeIndex}
          onPrev={() => goToIndex(activeIndex - 1)}
          onNext={() => goToIndex(activeIndex + 1)}
        />

        <div ref={stageShellRef} className={styles.servicesStageShell}>
          <div ref={stageRef} className={styles.servicesStage}>
            {sections.map((section, i) => {
              const Comp = section.comp;

              return (
                <div
                  key={section.id}
                  ref={(el) => {
                    panelRefs.current[i] = el;
                  }}
                  id={section.id}
                  className={styles.servicePanel}
                  data-section-id={section.id}
                >
                  <div className={styles.servicePanelScroll}>
                    <Comp
                      service={section.data}
                      index={i}
                      active={activeIndex === i}
                      setSectionRef={() => null}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}