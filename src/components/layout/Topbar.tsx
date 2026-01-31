import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaTimes } from "react-icons/fa";

const Topbar: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(true);

  if (!visible) return null;

  return (
    <div className="w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-primary to-primary-dark"></div>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-12"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,32 C180,70 300,0 540,28 C780,56 980,10 1440,40 L1440,80 L0,80 Z"
          fill="white"
        />
        <path
          d="M0,10 C220,40 360,-10 600,16 C840,42 1040,8 1440,20"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />
      </svg>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-12 flex items-center justify-between text-white text-xs lg:text-sm">
        {/* Left group */}
        <div className="flex items-center gap-4 md:gap-8">
          <a
            href="tel:+1234567890"
            className="hidden sm:flex items-center gap-2 px-2 py-1 rounded-md hover:bg-white/10 transition transform-gpu duration-150"
            aria-label="Call"
          >
            <FaPhoneAlt className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap text-[13px]">+1 234 567 890</span>
          </a>

          <a
            href="mailto:support@propify.com"
            className="hidden sm:flex items-center gap-2 px-2 py-1 rounded-md hover:bg-white/10 transition transform-gpu duration-150"
            aria-label="Email"
          >
            <FaEnvelope className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap text-[13px]">support@propify.com</span>
          </a>
        </div>

        {/* Right group */}
        <div className="flex items-center gap-3">
          <nav className="hidden sm:flex items-center gap-4">
            <a
              href="#"
              className="text-white/90 hover:text-white underline-offset-4 hover:underline transition text-[13px]"
            >
              Help
            </a>
            <a
              href="#"
              className="text-white/90 hover:text-white underline-offset-4 hover:underline transition text-[13px]"
            >
              Support
            </a>
          </nav>

          {/* Small CTA (optional) */}
          <a
            href="#"
            className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-[13px] font-semibold transition transform-gpu duration-150"
          >
            Explore Deals
          </a>

          {/* Close button */}
          <button
            onClick={() => setVisible(false)}
            aria-label="Close topbar"
            className="p-1.5 rounded-full hover:bg-white/10 transition"
          >
            <FaTimes className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
