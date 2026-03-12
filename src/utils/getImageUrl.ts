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
  // 1) external or local absolute path (public/)
  if (path) {
    if (path.startsWith("http")) return path;
    if (path.startsWith("/")) return path; 
    const base = (import.meta.env.VITE_API_URL as string | undefined) || "";
    // remove trailing / from base
    const normalizedBase = base.replace(/\/$/, "");
    // remove leading slashes from path
    const normalizedPath = path.replace(/^\/+/, "");
    if (normalizedBase) return `${normalizedBase}/storage/${normalizedPath}`;
    return `/storage/${normalizedPath}`;
  }

  // 2) no path -> fallback to LOCAL_IMAGES
  const idx = typeof index === "number" ? index % LOCAL_IMAGES.length : getRandomIndex();
  return LOCAL_IMAGES[idx];
};