// src/utils/imagePicker.ts
const LOCAL_IMAGES = [
  "/assets/images/property.webp",
  "/assets/images/imageSlideCard2.webp",
  "/assets/images/PRP.png",
  "/assets/images/Propify.png",
  "/assets/images/main.png",
  "/assets/images/logo.png",
  "/assets/images/prop1.webp",
  "/assets/images/prop2.webp",
    "/assets/images/prop3.webp",
];

/** mulberry32 RNG (seeded) */
function mulberry32(seed: number) {
  let t = seed >>> 0;
  return function () {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/** seeded shuffle (Fisher-Yates) */
function seededShuffle<T>(arr: T[], rng: () => number) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * pickRandomImages(seed?, count)
 * - seed:number  -> deterministic selection per seed (good: property.id)
 * - if no seed -> random selection
 */
export function pickRandomImages(seed?: number, count = 2): string[] {
  if (LOCAL_IMAGES.length === 0) return [];
  const rng = typeof seed === "number" ? mulberry32(seed) : Math.random;
  const shuffled = seededShuffle(LOCAL_IMAGES, rng);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}