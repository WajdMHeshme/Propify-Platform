import FloatingIcons from "../../components/ui/FloatingIcons";

export default function ContactHero() {
  return (
    <section className="px-6 sm:px-12 md:px-0 mt-16">
      <div className="bg-linear-to-r from-primary to-primary-dark text-white rounded-xl max-w-7xl mx-auto py-12 md:py-20 mb-16 relative overflow-hidden">

        <FloatingIcons />

        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-24 h-24 border border-white/20 rotate-45 rounded-sm" />
        <div className="absolute bottom-0 right-10 w-16 h-16 border border-white/20 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 border border-white/10 rounded-full opacity-20 -translate-y-1/2" />

        <div className="relative z-10 text-center flex flex-col items-center gap-6 px-4">

          <p className="uppercase text-sm opacity-80 tracking-wider">
            Contact Support
          </p>

          <h1 className="text-3xl md:text-5xl font-bold leading-snug">
         Contact Us
          </h1>

          <p className="text-white/90 text-base md:text-lg max-w-2xl leading-relaxed">
            Have a question about your booking? Need help finding a hotel?
            <br className="hidden md:block" />
            Our team is here to help you anytime.
          </p>

        </div>
      </div>
    </section>
  );
}
