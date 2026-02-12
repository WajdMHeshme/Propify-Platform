import {
  FaClock,
  FaCalendarAlt,
  FaEnvelopeOpenText,
  FaHeadset,
} from "react-icons/fa";
import { MdWeekend } from "react-icons/md";

export default function SupportHours() {
  return (
    <section className="px-6 sm:px-12 md:px-0 mb-20">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden grid md:grid-cols-2">
        {/* Left Gradient Panel */}
        <div className="bg-linear-to-br from-primary to-primary-dark text-white p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
          {/* Background Icons */}
          <FaClock className="absolute text-white/10 text-[120px] top-6 left-6 rotate-12" />
          <FaHeadset className="absolute text-white/10 text-[100px] bottom-10 right-6 -rotate-12" />

          <div className="relative z-10">
            <p className="uppercase text-sm opacity-80 mb-3 tracking-wider">
              Availability
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
              Support Hours
            </h2>

            <p className="text-white/90 leading-relaxed max-w-md">
              Our support team is available during the following hours to assist
              you with bookings, payments, or any technical issues.
            </p>
          </div>
        </div>

        {/* Hours List */}
        <div className="p-8 md:p-12 flex items-center bg-gray-50">
          <div className="w-full space-y-5">
            <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary p-2 rounded-md">
                  <FaCalendarAlt />
                </div>
                <span className="text-gray-700 font-medium">
                  Monday - Friday
                </span>
              </div>
              <span className="text-primary font-semibold">
                9:00 AM - 6:00 PM
              </span>
            </div>

            <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary p-2 rounded-md">
                  <MdWeekend />
                </div>
                <span className="text-gray-700 font-medium">Saturday</span>
              </div>
              <span className="text-primary font-semibold">
                10:00 AM - 4:00 PM
              </span>
            </div>

            <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary p-2 rounded-md">
                  <FaClock />
                </div>
                <span className="text-gray-700 font-medium">Sunday</span>
              </div>
              <span className="text-primary font-semibold">
                Online Support Only
              </span>
            </div>

            <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition border border-primary/10">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary p-2 rounded-md">
                  <FaEnvelopeOpenText />
                </div>
                <span className="text-gray-700 font-medium">
                  Emergency Support
                </span>
              </div>
              <span className="text-primary font-semibold">24/7 Email</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
