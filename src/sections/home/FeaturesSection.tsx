
import TitleSection from "../shared/TitleSection";
import FeatureCard from "../../components/cards/FeatureCard";
import { features } from "../../data/data";



export default function FeaturesSection() {
  return (
    <section className="w-full bg-[#f4f4ff] py-16">
      <div className="max-w-7xl mx-auto px-6">

        <TitleSection
          title="Featured Properties For"
          keyword="Students"
          desc="Lorem ipsum dolor sit amet..."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features?.map((feature, idx) => (
            <FeatureCard
              key={idx}
              title={feature.title}
              desc={feature.desc}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
