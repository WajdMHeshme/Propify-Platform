import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { PiBookmarksSimpleBold, PiHeartStraightBold } from "react-icons/pi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Topbar */}
      {!isScrolled && (
        <div className="w-full h-12 bg-primary text-white flex items-center justify-between px-4">
          Topbar
        </div>
      )}

      {/* Navbar */}
      <header
        className={`w-full fixed left-0 z-50 bg-white shadow-sm transition-all duration-300 ${
          isScrolled ? "top-0" : "top-12"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="" className="w-36">
            <img
              src="/logo.png"
              alt="Propify"
              className="w-full h-full object-contain"
            />
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-10 text-sm font-semibold">
            <Link to="" className="hover:text-primary">
              Home
            </Link>
            <Link to="properties" className="hover:text-primary">
              Properties
            </Link>
            <Link to="contact-us" className="hover:text-primary">
              Contact Us
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Heart Icon */}
            <button className="p-2 rounded-full hover:bg-gray-100">
              <PiHeartStraightBold  size={20} color="#5659f9"/>
            </button>

            {/* Bell Icon */}
            <button className="p-2 rounded-full hover:bg-gray-100">
              <PiBookmarksSimpleBold  size={20} color="#5659f9"/>
            </button>

            {/* Language */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100"
            >
              <FaGlobe size={16} color="#5659f9"/>
              <span className="uppercase">{i18n.language}</span>
            </button>

            <Link
              to="/login"
              className="text-sm font-medium hover:text-primary"
            >
              Sign In
            </Link>
            <Link to="/register" className="btn-primary text-sm">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-md"
          >
            {open ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden bg-white border-t shadow-sm">
            <nav className="flex flex-col gap-2 px-6 py-6 text-sm font-medium">
              <a href="#" className="px-3 py-2 hover:bg-gray-100">
                Home
              </a>
              <a href="#" className="px-3 py-2 hover:bg-gray-100">
                Properties
              </a>
              <a href="#" className="px-3 py-2 hover:bg-gray-100">
                Contact Us
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
