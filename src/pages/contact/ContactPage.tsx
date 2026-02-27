import ContactForm from "../../sections/contact/ContactForm"
import SharedHero from "../../sections/contact/SharedHero"
import ContactHero from "../../sections/contact/SharedHero"
import SupportHours from "../../sections/contact/SupportHours"

const ContactPage = () => {
  return (
    <>
      <SharedHero smallTitle="Contact Support" title="Get in Touch" desc="            Have a question about your booking? Need help finding a hotel?
            Our team is here to help you anytime."/>
      <SupportHours />
      <ContactForm />
    </>
  )
}

export default ContactPage
