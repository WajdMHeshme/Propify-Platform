// src/pages/contact/ContactPage.tsx
import ContactForm from "../../sections/contact/ContactForm";
import SharedHero from "../../sections/contact/SharedHero";
import SupportHours from "../../sections/contact/SupportHours";
import FaqSection from "../../sections/home/FAQSection";
import { useTranslation } from "react-i18next";

const ContactPage = () => {
  const { t } = useTranslation("sharedHero");

  return (
    <>
      <SharedHero
        smallTitle={t("sharedHero.smallTitle")}
        title={t("sharedHero.title")}
        desc={t("sharedHero.desc")}
      />
      <SupportHours />
      <ContactForm />
      <FaqSection />
    </>
  );
};

export default ContactPage;