// src/components/ui/Slider.tsx
import SliderDots from "./SliderDots";
import { useSlider } from "../../hooks/useSlider";
import type { SliderProps } from "../../types/ui";



export default function Slider<T>({
  items,
  renderItem,
  slidesToShow = 3,
  gap = 16,
  className = "",
  autoplay = false,
  autoplayInterval = 4000,
}: SliderProps<T>) {

  const {
    containerRef,
    trackRef,
    visibleCount,
    currentIndex,
    scrollToIndex,
  } = useSlider(items.length, { slidesToShow, gap, autoplay, autoplayInterval });

  const gapPx = `${gap}px`;
  const showDots = items.length > visibleCount;

  return (
    <div className={`relative ${className}`}>
      <div ref={containerRef} className="overflow-x-auto">

        <div ref={trackRef} className="flex" style={{ gap: gapPx }}>
          {items.map((it, idx) => {

            const totalGap = gap * (visibleCount - 1);
            const widthCalc = `calc((100% - ${totalGap}px) / ${visibleCount})`;

            return (
              <div key={idx} className="shrink-0" style={{ width: widthCalc }}>
                {renderItem(it, idx)}
              </div>
            );
          })}
        </div>

      </div>



      {showDots && (
        <SliderDots
          itemsLength={items.length}
          visibleCount={visibleCount}
          currentIndex={currentIndex}
          onClick={scrollToIndex}
        />
      )}
    </div>
  );
}