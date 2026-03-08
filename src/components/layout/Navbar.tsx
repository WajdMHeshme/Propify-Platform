import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import Topbar from "./Topbar";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Hamburger from "../ui/HamburgerIcon"; // لو عندك هذا المكوّن، وإلا استبدل بأيقونات FaBars/FaTimes

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: user } = useCurrentUser();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {!isScrolled && <Topbar />}

      <header
        className={`w-full fixed left-0 z-50 bg-white shadow-sm transition-all duration-300 ${
          isScrolled ? "top-0" : "top-12"
        }`}
      >
        {/* wrapper relative مهم عشان DesktopNav الي absolute يركز بالنسبة له */}
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between relative">
          {/* Left: Logo */}
          <Link to="/" className="w-36 shrink-0">
            <img src="/assets/images/logo.png" alt="Propify" className="w-full h-full object-contain" />
          </Link>

          {/* Center: Desktop links (absolute centered) */}
          <DesktopNav />

  

          {/* Mobile: bookings + user name/sign + hamburger */}
          <div className="lg:hidden flex items-center gap-2">

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