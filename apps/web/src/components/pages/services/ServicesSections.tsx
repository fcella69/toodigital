"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import styles from "./services.module.css";

import ServicesStickyNav from "./ServicesStickyNav";

import ServiceWeb from "./ServiceWeb";
import ServiceBrand from "./ServiceBrand";
import ServiceGrowth from "./ServiceGrowth";
import ServiceConsulting from "./ServiceConsulting";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

type Props = {
  web: any;
  brand: any;
  growth: any;
  consulting: any;
};

export default function ServicesSections({
  web,
  brand,
  growth,
  consulting,
}: Props) {

  const sections = [
    { id: "web", comp: ServiceWeb, data: web },
    { id: "brand", comp: ServiceBrand, data: brand },
    { id: "growth", comp: ServiceGrowth, data: growth },
    { id: "consulting", comp: ServiceConsulting, data: consulting },
  ];

  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const bgEl = bgRef.current;
    if (!bgEl) return;

    triggersRef.current.forEach(t => t.kill());
    triggersRef.current = [];

    sections.forEach((section, i) => {

      if (i === sections.length - 1) return;

      const current = sectionRefs.current[i];
      const next = sectionRefs.current[i + 1];
      if (!current || !next) return;

      gsap.set(next, { yPercent: 18, clearProps: "scale,opacity" });
      gsap.set(bgEl, { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "none" } });

      tl.to(current, {
        yPercent: -18,
        scale: 0.92,
        opacity: 0.55,
        transformOrigin: "center bottom",
      }, 0);

      tl.to(next, {
        yPercent: 0,
      }, 0);

      const st = ScrollTrigger.create({
        animation: tl,
        trigger: current,
        start: "bottom bottom",
        end: "+=70%",
        scrub: true,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,

        onUpdate: (self) => {
          if (self.isActive) {
            setActiveIndex(self.progress >= 0.5 ? i + 1 : i);
            setProgress(self.progress);
            gsap.set(bgEl, { opacity: self.progress });
          }
        },

        onLeave: () => {
          setActiveIndex(i + 1);
          setProgress(0);
          gsap.set(bgEl, { opacity: 0 });
        },

        onLeaveBack: () => {
          setActiveIndex(i);
          setProgress(0);
          gsap.set(bgEl, { opacity: 0 });
        },
      });

      triggersRef.current.push(st);
    });

    return () => {
      triggersRef.current.forEach(t => t.kill());
      triggersRef.current = [];
    };
  }, []);

  const goToIndex = useCallback((index: number) => {
    const target = sectionRefs.current[index];
    if (!target) return;

    gsap.to(window, {
      scrollTo: { y: target, autoKill: true },
      duration: 1.1,
      ease: "power3.inOut",
    });
  }, []);

  return (
    <section className={styles.servicesArea} id="services-area">
      <div ref={bgRef} className={styles.servicesBg} />

      <div className={styles.servicesContent}>
        <ServicesStickyNav
          items={sections.map(s => s.data?.navTitle || s.id)}
          activeIndex={activeIndex}
          progress={progress}
          onPrev={() => goToIndex(activeIndex - 1)}
          onNext={() => goToIndex(activeIndex + 1)}
        />

        {sections.map((section, i) => {
          const Comp = section.comp;
          return (
            <div
              key={section.id}
              ref={(el) => {
                if (el) sectionRefs.current[i] = el;
              }}
              id={`service-${section.id}`}
              className={styles.stackSection}
            >
              <Comp
                service={section.data}
                index={i}
                active={activeIndex === i}
                setSectionRef={() => null}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}