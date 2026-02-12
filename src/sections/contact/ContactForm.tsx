import {
  FaHotel,
  FaHeadset,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

export default function ContactForm() {
  return (
    <section className="px-6 sm:px-12 md:px-0 mb-20">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden grid md:grid-cols-2">
        <div className="bg-linear-to-br from-primary to-primary-dark text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Background Icons */}
          <FaHotel className="absolute text-white/10 text-[120px] top-6 left-6 rotate-12" />
          <FaHeadset className="absolute text-white/10 text-[100px] bottom-10 right-6 -rotate-12" />
          <FaMapMarkerAlt className="absolute text-white/10 text-[140px] top-1/2 left-1/3 -translate-y-1/2 rotate-6" />
          <FaEnvelope className="absolute text-white/10 text-[110px] bottom-6 left-10 rotate-[-8deg]" />

          <div className="relative z-10 flex flex-col h-full justify-between">
            {/* Top */}
            <div>
              <p className="uppercase text-sm opacity-80 mb-3 tracking-wider">
                Support Team
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
                We're Here to Help
              </h2>

              <p className="text-white/90 leading-relaxed max-w-md">
                Whether you have a booking issue, payment question, or need help
                finding the perfect hotel — our team is ready to assist you.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/20 my-8"></div>

            {/* Contact Info */}
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-md">
                  <FaEnvelope />
                </div>
                <span className="text-white/90">support@resvbar.com</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-md">
                  <FaPhoneAlt />
                </div>
                <span className="text-white/90">+1 000 000 000</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-md">
                  <MdLocationOn />
                </div>
                <span className="text-white/90">Los Angeles, USA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-8 md:p-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Send us a Message
          </h3>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />

            <select className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40">
              <option>Booking Issue</option>
              <option>Payment Problem</option>
              <option>Technical Issue</option>
              <option>Partnership</option>
              <option>General Inquiry</option>
            </select>

            <textarea
              rows={4}
              placeholder="Your Message"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
