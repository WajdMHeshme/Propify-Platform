import TitleSection from "../shared/TitleSection";
import { FAQS } from "../../data/data";
import FaqAccordion from "../../components/ui/FAQAccordion";
import { FaQuestion } from "react-icons/fa6";

export default function FaqSection() {
  return (
    <section className="relative bg-[#f4f4ff] py-20 sm:py-28 overflow-hidden">
      {/* Decorative large question marks */}
      <FaQuestion className="hidden lg:block absolute left-0 top-16 text-[220px] text-primary/10 pointer-events-none select-none -rotate-12" />
      <FaQuestion className="hidden lg:block absolute right-0 top-32 text-[220px] text-primary/10 pointer-events-none select-none rotate-6" />


      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <TitleSection
          title="FAQ'"
          keyword="S"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet."
          underline={true}
          underlineSize="lg"
          underlineClassName="text-primary"
        />

        {/* Accordion */}
        <div className="mt-10 max-w-3xl mx-auto">
          <FaqAccordion items={FAQS} />
        </div>
      </div>
    </section>
  );
}
