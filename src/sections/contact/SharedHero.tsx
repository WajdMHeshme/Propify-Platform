// components/sections/SharedHero.tsx
import FloatingIcons from "../../components/ui/FloatingIcons";
import HeroFilterSection from "../../components/layout/HeroFilterSection";
import type { SharedHeroProps } from "../../types/ui";


export default function SharedHero({
  smallTitle,
  title,
  desc,
  showFilter = false,
  onFilterChange,
}: SharedHeroProps) {
  return (
    <section className="mb-16">
      {/* Hero block */}
      <div className="bg-linear-to-r from-primary to-primary-dark text-white py-12 md:py-20 mb-0 relative overflow-hidden">
        <FloatingIcons />

        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-24 h-24 border border-white/20 rotate-45 rounded-sm" />
        <div className="absolute bottom-0 right-10 w-16 h-16 border border-white/20 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 border border-white/10 rounded-full opacity-20 -translate-y-1/2" />

        <div className="relative z-10 text-center flex flex-col items-center gap-6 px-4">
          <p className="uppercase text-sm opacity-80 tracking-wider">
            {smallTitle}
          </p>

          <h1 className="text-3xl md:text-5xl font-bold leading-snug">{title}</h1>

          <p className="text-white/90 text-base md:text-lg max-w-2xl leading-relaxed">
            {desc}
          </p>
        </div>
      </div>


      {showFilter && (
        <div className="-mt-12 md:-mt-16 px-4">
          <HeroFilterSection onFilterChange={onFilterChange} />
        </div>
      )}
    </section>
  );
}