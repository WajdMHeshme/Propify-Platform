import React, { useMemo } from "react";
import {
  FaHome,
  FaBuilding,
  FaKey,
  FaWarehouse,
} from "react-icons/fa";
import { PiStarFourFill } from "react-icons/pi";
import type { FloatingIconsProps } from "../../types/ui";


const FloatingIcons: React.FC<FloatingIconsProps> = ({ starCount = 20 }) => {

  const stars = useMemo(
    () =>
      Array.from({ length: starCount }).map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 6 + 6,
        delay: `${Math.random() * 4}s`,
        duration: `${Math.random() * 3 + 3}s`,
      })),
    [starCount]
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars?.map((star) => (
        <PiStarFourFill 
          key={star.id}
          className="absolute text-white/40 animate-starTwinkle"
          style={{
            top: star.top,
            left: star.left,
            fontSize: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}

      <FloatingIcon style="left-6 top-12" delay="0s">
        <FaHome />
      </FloatingIcon>

      <FloatingIcon style="right-10 top-32" delay="1s" size="lg">
        <FaBuilding />
      </FloatingIcon>

      <FloatingIcon style="left-10 bottom-32" delay="2s">
        <FaWarehouse />
      </FloatingIcon>

      <FloatingIcon style="right-1/3 bottom-1/3" delay="2.5s">
        <FaKey />
      </FloatingIcon>

      {/* Animations */}
      <style>{`
        @keyframes floatIcon {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes starTwinkle {
          0%,100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.4);
          }
        }

        .animate-starTwinkle {
          animation-name: starTwinkle;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingIcons;

/* 🧩 Helper Component */
const FloatingIcon = ({
  children,
  style,
  delay,
  size = "md",
}: {
  children: React.ReactNode;
  style: string;
  delay: string;
  size?: "sm" | "md" | "lg";
}) => {
  const sizes = {
    sm: "w-14 h-14 text-lg",
    md: "w-20 h-20 text-2xl",
    lg: "w-28 h-28 text-3xl",
  };

  return (
    <div
      className={`absolute ${style} opacity-20`}
      style={{ animation: `floatIcon 8s ease-in-out infinite`, animationDelay: delay }}
    >
      <div
        className={`rounded-2xl bg-white/5 backdrop-blur-sm shadow-lg flex items-center justify-center text-white ${sizes[size]}`}
      >
        {children}
      </div>
    </div>
  );
};
