export async function fireLendConfetti(): Promise<void> {
  const { default: confetti } = await import("canvas-confetti");

  const gold = ["#c9a227", "#d4af37", "#c5a04d", "#f5e6b3", "#22c55e"];

  confetti({
    particleCount: 80,
    spread: 65,
    origin: { y: 0.55 },
    colors: gold,
    disableForReducedMotion: true,
  });

  window.setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: gold,
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: gold,
      disableForReducedMotion: true,
    });
  }, 200);
}
