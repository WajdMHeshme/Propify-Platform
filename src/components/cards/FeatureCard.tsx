import type { FeatureCardProps } from "../../types/ui";
import { useTranslation } from "react-i18next";

export default function FeatureCard({
  featureKey,
  icon: Icon,
}: Omit<FeatureCardProps, "title" | "desc"> & { featureKey: string; icon: any }) {
  const { t } = useTranslation("features");

  const title = t(`${featureKey}.title`);
  const desc = t(`${featureKey}.desc`);

  return (
    <article className="group flex flex-col items-start bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white ring-1 ring-primary/30 text-primary mb-4">
        <Icon size={26} />
      </div>

      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>

      <div className="w-12 h-1 bg-primary rounded-full my-3 transition-all group-hover:w-20" />

      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
    </article>
  );
}