import TitleSection from "../shared/TitleSection";
import FaqAccordion from "../../components/ui/FAQAccordion";
import { FaQuestion } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

export default function FaqSection() {

  const { t } = useTranslation("titleSection");
  const { t: tFaq } = useTranslation("faq");

  let rawItems = tFaq("items", { returnObjects: true });

  const items = Array.isArray(rawItems)
    ? rawItems.map((item: any, idx) => ({
        id: idx + 1,
        question: item.question ?? "",
        answer: item.answer ?? "",
      }))
    : [];

  return (
    <section className="relative bg-[#f4f4ff] py-20 sm:py-28 overflow-hidden">
      <FaQuestion className="hidden lg:block absolute left-0 top-16 text-[220px] text-primary/10 pointer-events-none select-none -rotate-12" />
      <FaQuestion className="hidden lg:block absolute right-0 top-32 text-[220px] text-primary/10 pointer-events-none select-none rotate-6" />

      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <TitleSection
          title={t("faqTitle")}
          keyword={t("faqKeyword")}
          desc={t("faqDesc")}
          underline
          underlineSize="lg"
          underlineClassName="text-primary"
        />

        <div className="mt-10 max-w-3xl mx-auto">
          <FaqAccordion items={items} />
        </div>
      </div>
    </section>
  );
}