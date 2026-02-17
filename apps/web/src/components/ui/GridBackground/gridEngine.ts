type Spark = {
  x: number;
  y: number;
  dir: "up" | "down" | "left" | "right";
  life: number;
  color: "blue" | "orange";
};

export function startGridEngine(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!;
  let width = 0;
  let height = 0;
  let animationId = 0;

  const GRID_SIZE = 80;
  const SPARK_SPEED = 2.2;
  const MAX_LIFE = 280;

  const sparks: Spark[] = [];

  /* =========================
     RESIZE
  ========================= */
  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };

  resize();
  window.addEventListener("resize", resize);

  /* =========================
     CREATE SPARK
  ========================= */
  const createSpark = () => {
    const cols = Math.floor(width / GRID_SIZE);
    const rows = Math.floor(height / GRID_SIZE);

    const col = Math.floor(Math.random() * cols);
    const row = Math.floor(Math.random() * rows);

    const dirs: Spark["dir"][] = ["up", "down", "left", "right"];

    sparks.push({
      x: col * GRID_SIZE,
      y: row * GRID_SIZE,
      dir: dirs[Math.floor(Math.random() * dirs.length)],
      life: MAX_LIFE,
      color: Math.random() < 0.25 ? "orange" : "blue", // ~1 scintilla su 12
    });
  };

  /* =========================
     UPDATE SPARK
  ========================= */
  const updateSpark = (s: Spark) => {
    switch (s.dir) {
      case "up":
        s.y -= SPARK_SPEED;
        break;
      case "down":
        s.y += SPARK_SPEED;
        break;
      case "left":
        s.x -= SPARK_SPEED;
        break;
      case "right":
        s.x += SPARK_SPEED;
        break;
    }

    s.life--;
  };

  /* =========================
     DRAW SPARK (SOFT + SCIA)
  ========================= */
  const drawSpark = (s: Spark) => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);

    if (s.color === "orange") {
      ctx.fillStyle = "rgba(238,98,36,0.9)";
      ctx.shadowColor = "rgba(238,98,36,0.55)";
    } else {
      ctx.fillStyle = "rgba(80,160,255,0.85)";
      ctx.shadowColor = "rgba(80,160,255,0.6)";
    }

    ctx.shadowBlur = 2;
    ctx.fill();
    ctx.shadowBlur = 0;
  };

  /* =========================
     LOOP
  ========================= */
  const animate = () => {
    // fade lento → scia morbida e non invasiva
    ctx.fillStyle = "rgba(0,0,32,0.08)";
    ctx.fillRect(0, 0, width, height);

    // spawn sparks (pochi)
    if (Math.random() < 0.02 && sparks.length < 6) {
      createSpark();
    }

    // update sparks
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      updateSpark(s);
      drawSpark(s);

      if (
        s.life <= 0 ||
        s.x < 0 ||
        s.y < 0 ||
        s.x > width ||
        s.y > height
      ) {
        sparks.splice(i, 1);
      }
    }

    animationId = requestAnimationFrame(animate);
  };

  animate();

  /* =========================
     CLEANUP
  ========================= */
  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener("resize", resize);
  };
}
