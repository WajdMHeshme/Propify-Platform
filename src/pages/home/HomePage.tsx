import HeroSection from "../../sections/home/HeroSection";
import PropertiesSection from "../../sections/shared/PropertiesSection";
import FeaturesSection from "../../sections/home/FeaturesSection";
import FaqSection from "../../sections/home/FAQSection";
import ChooseUsSection from "../../sections/home/ChooseUsSection";
import CallToAction from "../../sections/contact/call/CallToAction";
const HomePage = () => {
  return (
    <div className="space-y-16">
      <HeroSection />
      <PropertiesSection />
      <FeaturesSection />
      <ChooseUsSection />
      <FaqSection />
      <CallToAction />
    </div>
  );
};

export default HomePage;
