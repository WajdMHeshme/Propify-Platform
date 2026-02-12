import { useTranslation } from "react-i18next";
import HeroFilterSection from "../../components/layout/HeroFilterSection";
import FloatingIcons from "../../components/ui/FloatingIcons";

const HeroSection = () => {
  const { t } = useTranslation("hero");

  const handleFilter = (filters: {
    city: string;
    price: string;
    type: string;
  }) => {
    console.log("Filters selected:", filters);
  };

  return (
    <section className="relative h-225 md:h-[90vh] overflow-hidden flex flex-col items-center">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-r from-primary to-primary-dark" />

      {/* Floating Icons */}
      <FloatingIcons />

      {/* Decorative SVG Waves */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 500"
        preserveAspectRatio="none"
        aria-hidden
      >
        <g className="animate-wave">
          <path
            d="M0,120 C200,200 360,40 600,90 C840,140 1040,60 1440,120 L1440,0 L0,0 Z"
            fill="rgba(255,255,255,0.10)"
          />
        </g>
        <g
          className="animate-wave--slow wave-offset"
          style={{ transform: "translateY(6px)" }}
        >
          <path
            d="M0,260 C240,320 420,200 660,240 C900,280 1100,220 1440,260 L1440,0 L0,0 Z"
            fill="rgba(255,255,255,0.06)"
          />
        </g>
      </svg>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-white text-center mt-20">
        <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur">
          {t("platform")}
        </span>

        <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-6xl">
          {t("titleLine1")} <br />
          <span className="text-white">{t("titleLine2")}</span>
        </h1>

        <p className="mb-10 max-w-2xl text-base text-white/90 md:text-lg mx-auto">
          {t("description")}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row justify-center">
          <button className="rounded-xl bg-white px-8 py-3 font-semibold text-primary transition hover:scale-105 hover:bg-white/90">
            {t("exploreBtn")}
          </button>

          <button className="rounded-xl border border-white/40 px-8 py-3 font-semibold text-white transition hover:bg-white/15">
            {t("learnBtn")}
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="w-full  bottom-8 z-20 px-4 md:px-8">
        <HeroFilterSection onFilterChange={handleFilter} />
      </div>
    </section>
  );
};

export default HeroSection;
