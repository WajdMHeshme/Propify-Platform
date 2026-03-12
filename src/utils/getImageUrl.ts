// src/utils/getImageUrl.ts
export const getImageUrl = (path?: string | null) => {
  if (!path) return "/placeholder.jpg";
  if (path.startsWith("http")) return path;


  const normalized = path.startsWith("/") ? path : `storage/${path}`;
  return `https://unilobed-palatially-selah.ngrok-free.dev/${normalized}`;
};