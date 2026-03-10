// src/components/ui/useSlider.ts
import { useEffect, useRef, useState } from "react";
import type { UseSliderOptions } from "../types/ui";


export function useSlider(itemsLength: number, options: UseSliderOptions = {}) {

  const { slidesToShow = 3, autoplay = false, autoplayInterval = 4000 } = options;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [visibleCount, setVisibleCount] = useState(slidesToShow);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);

  useEffect(() => {
    function update() {
      const w = window.innerWidth;

      if (w < 640) setVisibleCount(1);
      else if (w < 1024) setVisibleCount(Math.min(2, slidesToShow));
      else setVisibleCount(slidesToShow);
    }

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, [slidesToShow]);

  const maxIndex = Math.max(0, itemsLength - visibleCount);

  const getChildren = () =>
    trackRef.current
      ? (Array.from(trackRef.current.children) as HTMLElement[])
      : [];

  const scrollToIndex = (index: number, smooth = true) => {
    const container = containerRef.current;
    const children = getChildren();

    if (!container || children.length === 0) return;

    const child = children[index];
    if (!child) return;

    container.scrollTo({
      left: child.offsetLeft,
      behavior: smooth ? "smooth" : "auto",
    });

    setCurrentIndex(index);
  };

  const next = () => {
    scrollToIndex(Math.min(currentIndex + visibleCount, maxIndex));
  };

  const prev = () => {
    scrollToIndex(Math.max(currentIndex - visibleCount, 0));
  };

  useEffect(() => {
    if (!autoplay) return;

    const id = setInterval(() => {
      const nextIndex =
        currentIndex >= maxIndex ? 0 : currentIndex + visibleCount;

      scrollToIndex(nextIndex);
    }, autoplayInterval);

    return () => clearInterval(id);
  }, [autoplay, autoplayInterval, currentIndex, visibleCount, maxIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      startXRef.current = e.clientX;
      startScrollLeftRef.current = container.scrollLeft;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;

      const dx = e.clientX - startXRef.current;
      container.scrollLeft = startScrollLeftRef.current - dx;
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return {
    containerRef,
    trackRef,
    visibleCount,
    currentIndex,
    scrollToIndex,
    next,
    prev,
  };
}