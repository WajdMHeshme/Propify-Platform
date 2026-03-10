import { useTranslation } from "react-i18next";
import type { IconKey } from "../../types/ui";
import type { ReactNode } from "react";
import { FaShieldAlt, FaHeadset, FaHome, FaRegClock } from "react-icons/fa";

const iconMap: Record<IconKey, ReactNode> = {
  home: <FaHome />,
  shield: <FaShieldAlt />,
  clock: <FaRegClock />,
  support: <FaHeadset />,
};

type ChooseUsCardProps = {
  icon: IconKey;
  featureKey?: string; // المفتاح للترجمة
  title?: string; // بديل لو ما فيه ترجمة
  description?: string; // بديل لو ما فيه ترجمة
};

export default function ChooseUsCard({
  icon,
  featureKey,
  title: propTitle,
  description: propDesc,
}: ChooseUsCardProps) {
  const { t } = useTranslation("chooseUs");

  const title = featureKey
    ? t(`${featureKey}.title`)
    : propTitle ?? "";

  const description = featureKey
    ? t(`${featureKey}.desc`)
    : propDesc ?? "";

  return (
    <div
      className="
        group relative
        bg-white
        rounded-2xl
        p-7
        text-center
        border border-primary/10
        transition-all duration-300
        hover:-translate-y-3
        hover:shadow-2xl
        hover:border-primary/30
      "
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition pointer-events-none" />

      {/* Icon */}
      <div
        className="
          relative z-10
          mx-auto mb-6
          w-16 h-16
          flex items-center justify-center
          rounded-full
          bg-primary/10
          text-primary
          text-2xl
          transition-all duration-300
          group-hover:bg-primary
          group-hover:text-white
          group-hover:scale-110
        "
      >
        {iconMap[icon]}
      </div>

      {/* Content */}
      <h3 className="relative z-10 text-lg font-bold text-gray-900 mb-3">
        {title}
      </h3>

      {/* Divider */}
      <span className="block mx-auto mb-4 h-1 w-10 rounded-full bg-primary/20 group-hover:bg-primary transition" />

      <p className="relative z-10 text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}