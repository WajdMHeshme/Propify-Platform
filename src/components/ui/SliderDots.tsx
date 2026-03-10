// src/components/ui/SliderDots.tsx 

import type { DotsProps } from "../../types/ui";


export default function SliderDots({
  itemsLength,
  visibleCount,
  currentIndex,
  onClick,
}: DotsProps) {

  const pages = Math.ceil(itemsLength / visibleCount);

  return (
    <div className="flex justify-center gap-4 mt-4">
      {Array.from({ length: pages }).map((_, i) => {
        const index = i * visibleCount;

        const active =
          currentIndex >= index && currentIndex < index + visibleCount;

        return (
          <button
            key={i}
            className={`w-3 h-3 rounded-full ${
              active ? "bg-indigo-600" : "bg-gray-300"
            }`}
            onClick={() => onClick(index)}
          />
        );
      })}
    </div>
  );
}