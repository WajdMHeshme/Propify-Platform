import { useState } from "react";
import { FaBell, FaBars, FaTimes, FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Properties", href: "#" },
  { name: "Contact Us", href: "#" },
];

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  return (
    <header className="w-full">
      {/* Main Navbar */}
      <div className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-36">
              <img
                src="/logo.png"
                alt="Propify"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-10 text-sm font-semibold">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="
                  relative text-gray-600
                  transition-all duration-300
                  hover:text-primary
                  after:absolute after:left-0 after:-bottom-1
                  after:h-0.5 after:w-0
                  after:bg-primary after:rounded-full
                  after:transition-all after:duration-300
                  hover:after:w-full
                "
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="
                flex items-center gap-2
                px-3 py-2
                rounded-full
                text-sm font-medium
                text-gray-600
                hover:text-primary
                hover:bg-gray-100
                transition
              "
            >
              <FaGlobe size={16} />
              <span className="uppercase">{i18n.language}</span>
            </button>

            {/* Sign In / Sign Up */}
            <button className="text-sm font-medium text-gray-700 hover:text-primary transition">
              Sign In
            </button>
            <button className="btn-primary text-sm">Sign Up</button>

            {/* Notifications */}
            <button className="relative p-2 rounded-full text-gray-500 hover:text-primary hover:bg-gray-100 transition">
              <FaBell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
          >
            {open ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden bg-white border-t shadow-sm">
            <nav className="flex flex-col gap-2 px-6 py-6 text-sm font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="
                    px-3 py-2 rounded-md
                    text-gray-600
                    transition-all duration-200
                    hover:bg-gray-100 hover:text-primary
                    active:scale-[0.98]
                  "
                >
                  {link.name}
                </a>
              ))}

              {/* Language Toggle Mobile */}
              <button
                onClick={toggleLanguage}
                className="
                  mt-2 px-3 py-2
                  rounded-md
                  flex items-center gap-2
                  text-gray-600
                  hover:bg-gray-100
                  hover:text-primary
                  transition
                "
              >
                <FaGlobe size={16} />
                <span>{i18n.language === "en" ? "العربية" : "English"}</span>
              </button>

              {/* Mobile Sign In / Sign Up */}
              <div className="pt-4 mt-4 border-t flex flex-col gap-2">
                <button className="text-gray-700 font-medium hover:text-primary text-left">
                  Sign In
                </button>
                <button className="btn-primary w-full text-left">Sign Up</button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
