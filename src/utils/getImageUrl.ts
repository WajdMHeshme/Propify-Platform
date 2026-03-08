// src/utils/getImageUrl.ts
export const getImageUrl = (path?: string | null) => {
  if (!path) return "/placeholder.jpg"; // عدّل المسار لو عندك placeholder مختلف
  if (path.startsWith("http")) return path;

  // بعض الـ backends يرجّع المسار بدون /storage أو مع مسار نسبي
  // عدّل baseURL حسب سيرفرك
  const normalized = path.startsWith("/") ? path : `storage/${path}`;
  return `http://localhost:8000/${normalized}`;
};