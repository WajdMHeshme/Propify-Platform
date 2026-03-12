import ChooseUsCard from "../../components/cards/ChooseUsCard";
import type { IconKey } from "../../types/ui";
import TitleSection from "../shared/TitleSection";

const chooseUsFeatures = [
  { id: 1, icon: "home", featureKey: "verifiedProperties" },
  { id: 2, icon: "shield", featureKey: "securePayments" },
  { id: 3, icon: "clock", featureKey: "fastBooking" },
  { id: 4, icon: "support", featureKey: "support247" },
];

export default function ChooseUsSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <TitleSection
          sectionKey="chooseUsTitle"
          underline
          underlineSize="lg"
          underlineClassName="text-primary"
        />

        {/* Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-10">
          {chooseUsFeatures.map((feature) => (
            <ChooseUsCard
              key={feature.id}
              icon={feature.icon as IconKey}
              featureKey={feature.featureKey}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
