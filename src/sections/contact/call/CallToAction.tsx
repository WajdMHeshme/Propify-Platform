import { Link } from "react-router-dom";
import FloatingIcons from "../../../components/ui/FloatingIcons";

export default function CallToAction() {
  return (
    <section className="px-6 sm:px-12 md:px-0">

          <div className="bg-linear-to-r from-primary to-primary-dark text-white rounded-xl max-w-7xl mx-auto py-8 md:py-16 mb-16 relative overflow-hidden">
      <FloatingIcons />
      {/* Optional decorative shapes */}
      <div className="absolute top-0 left-0 w-24 h-24 border border-white/20 rotate-45 rounded-sm" />
      <div className="absolute bottom-0 right-10 w-16 h-16 border border-white/20 rounded-full" />
      <div className="absolute top-1/2 left-1/3 w-40 h-40 border border-white/10 rounded-full opacity-20 -translate-y-1/2" />

      <div className="relative z-10 text-center flex flex-col items-center gap-6">
        <p className="uppercase text-sm opacity-80">Sign up or contact us</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug">
          Ready to <br /> Get Started?
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link to="/register" className="bg-white text-primary font-semibold px-6 py-2 rounded-lg hover:bg-white/90 transition">
            Sign Up
          </Link>
          <Link to="/contact-us" className="border border-white text-white font-semibold px-6 py-2 rounded-lg hover:bg-white/10 transition">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
    </section>

  );
}
