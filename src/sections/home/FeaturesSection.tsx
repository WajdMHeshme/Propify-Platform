import TitleSection from "../shared/TitleSection";
import FeatureCard from "../../components/cards/FeatureCard";
import { FaUserShield, FaLock, FaComments, FaBolt } from "react-icons/fa";

const features = [
  { featureKey: "secureAccount", icon: FaUserShield },
  { featureKey: "rentalPrivacy", icon: FaLock },
  { featureKey: "directCommunication", icon: FaComments },
  { featureKey: "fastBooking", icon: FaBolt },
];

export default function FeaturesSection() {
  return (
    <section className="w-full bg-[#f4f4ff] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <TitleSection
          sectionKey="features" 
          underline={true}
          underlineSize="lg"
          underlineClassName="text-primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              featureKey={feature.featureKey}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}