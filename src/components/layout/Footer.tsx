import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import FloatingIcons from "../ui/FloatingIcons";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-primary to-primary-dark text-white">
      <FloatingIcons />

      {/* Decorative wave at top */}
      <svg
        className="absolute top-0 left-0 w-full h-12 md:h-20 text-primary-dark/40"
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
        aria-hidden
      >
        <path
          d="M0,0 C300,100 900,0 1200,100 L1200,0 L0,0 Z"
          fill="currentColor"
          opacity="0.12"
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <img
              src="/assets/icons/propify.png"
              alt="Propify logo"
              className="w-20 h-20 object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold">Propify</h3>
              <p className="text-sm opacity-80 mt-1 max-w-xs">
                Real estate platform for properties, bookings, and management.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer Navigation" className="flex justify-center">
            <ul className="flex gap-6 text-sm font-medium">
              <li>
                <a href="#" className="hover:underline hover:opacity-95">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:opacity-95">
                  Properties
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline hover:opacity-95">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>

          {/* Social & CTA */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex gap-3">
              <SocialLink href="#" label="Facebook">
                <FaFacebookF />
              </SocialLink>
              <SocialLink href="#" label="LinkedIn">
                <FaLinkedinIn />
              </SocialLink>
              <SocialLink href="#" label="Twitter">
                <FaTwitter />
              </SocialLink>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 rounded-full my-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs opacity-80">
          <p>© {new Date().getFullYear()} Propify. All rights reserved.</p>
          <p className="text-xs">Made with ❤️ by Wajd Heshme</p>
        </div>
      </div>

      {/* Bottom curved wave */}
      <svg
        className="absolute bottom-0 left-0 w-full h-16 text-white/8"
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
        aria-hidden
      >
        <path d="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z" fill="currentColor" />
      </svg>
    </footer>
  );
}

function SocialLink({ children, href, label }: { children: React.ReactNode; href: string; label: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-primary shadow-sm hover:scale-105 transform transition-all duration-150"
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="sr-only">{label}</span>
      <span className="text-xs">{children}</span>
    </a>
  );
}
