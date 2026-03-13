// src/utils/getImageUrl.ts

const LOCAL_IMAGES = [
  "/assets/images/property.webp",
  "/assets/images/imageSlideCard2.webp",
  "/assets/images/prop1.webp",
  "/assets/images/prop2.webp",
  "/assets/images/prop3.webp",
];

const getRandomIndex = () => Math.floor(Math.random() * LOCAL_IMAGES.length);

export const getImageUrl = (path?: string | null, index?: number) => {

  // external images
  if (path?.startsWith("http")) return path;

  // storage path coming from API
  if (path?.startsWith("/storage")) {
    const base = import.meta.env.VITE_API_URL;
    if (base) {
      const normalizedBase = base.replace(/\/$/, "");
      return `${normalizedBase}${path}`;
    }
  }

  // other relative paths
  if (path && !path.startsWith("/")) {
    const base = import.meta.env.VITE_API_URL;
    if (base) {
      const normalizedBase = base.replace(/\/$/, "");
      return `${normalizedBase}/storage/${path}`;
    }
  }

  // fallback images
  const idx =
    typeof index === "number"
      ? index % LOCAL_IMAGES.length
      : getRandomIndex();

  return LOCAL_IMAGES[idx];
};