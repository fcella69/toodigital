"use client";

import { useEffect, useRef } from "react";
import styles from "./GridBackground.module.css";
import { startGridEngine } from "./gridEngine";

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const stop = startGridEngine(canvasRef.current);

    return () => {
      stop();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
    />
  );
}
