"use client";

import { useEffect, useMemo, useRef } from "react";
import styles from "./CookieDeclarationEmbed.module.css";

type Props = {
  scriptCode?: string;
};

function extractScriptSrc(scriptCode?: string) {
  if (!scriptCode) return null;

  const match = scriptCode.match(/src=["']([^"']+)["']/i);
  return match?.[1] || null;
}

export default function CookieDeclarationEmbed({ scriptCode }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scriptSrc = useMemo(() => extractScriptSrc(scriptCode), [scriptCode]);

  useEffect(() => {
    if (!containerRef.current || !scriptSrc) return;

    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.id = "CookieDeclaration";
    script.src = scriptSrc;
    script.type = "text/javascript";
    script.async = true;

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [scriptSrc]);

  if (!scriptSrc) {
    return null;
  }

  return (
    <section className={styles.wrapper}>
      <div ref={containerRef} />
    </section>
  );
}