// src/components/layout/Navbar.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import Topbar from "./Topbar";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Hamburger from "../ui/HamburgerIcon";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: user } = useCurrentUser();
  const { i18n } = useTranslation(); // using default namespace here, just to read language/dir

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isRTL = i18n.dir ? i18n.dir(i18n.language) === "rtl" : i18n.language === "ar";

  // orders: for LTR -> logo (1) | center (2) | controls (3)
  // for RTL  -> controls (1) | center (2) | logo (3)
  const logoOrder = isRTL ? "order-3" : "order-1";
  const centerOrder = "order-2"; // center always order-2
  const controlsOrder = isRTL ? "order-1" : "order-3";

  // add row-reverse so the visual reading/flow fits when needed (keeps flex behavior consistent)
  const flexRowDirection = isRTL ? "flex-row-reverse" : "flex-row";

  // choose logo based on language
  const logoSrc = i18n.language === "ar" ? "/assets/images/arabic_logo.png" : "/assets/images/logo.png";

  return (
    <>
      {!isScrolled && <Topbar />}

      <header
        className={`w-full fixed left-0 z-50 bg-white shadow-sm transition-all duration-300 ${isScrolled ? "top-0" : "top-12"}`}
      >
        {/* wrapper relative مهم عشان DesktopNav الي absolute يركز بالنسبة له */}
        <div className={`max-w-7xl mx-auto px-4 h-20 flex items-center justify-between relative ${flexRowDirection}`}>
          {/* Left: Logo */}
          <Link to="/" className={`w-36 shrink-0 ${logoOrder}`}>
            <img
              src={logoSrc}
              alt="Propify"
              className="w-full h-full object-contain"
            />
          </Link>

          {/* Center: Desktop links (absolute centered) */}
          <div className={`${centerOrder} w-full`}>
            <DesktopNav />
          </div>

          {/* Mobile: bookings + user name/sign + hamburger */}
          <div className={`${controlsOrder} lg:hidden flex items-center gap-2`}>
            {/* user name or auth links */}
            {user ? (
              <span className="px-3 py-2 font-semibold text-primary">{user.name}</span>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="px-3 py-2 rounded-md hover:bg-gray-100 text-sm">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary px-3 py-2 text-sm">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Hamburger (animated) */}
            <Hamburger open={open} onClick={() => setOpen(!open)} />
          </div>
        </div>
      </header>

      {/* Mobile menu slide / dropdown */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}