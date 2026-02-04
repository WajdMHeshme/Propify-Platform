import ChooseUsCard from "../../components/cards/ChooseUsCard";
import { chooseUsFeatures } from "../../data/data";
import TitleSection from "../shared/TitleSection";

export default function ChooseUsSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <TitleSection
          title="Why Choose"
          desc="Discover the benefits of choosing Propify for your real estate needs. We are committed to providing exceptional service and unparalleled expertise."
          keyword="Propify"
          underline
        />

        {/* Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {chooseUsFeatures.map((feature) => (
            <ChooseUsCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
