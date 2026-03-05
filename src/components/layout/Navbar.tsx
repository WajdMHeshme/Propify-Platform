import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaGlobe } from "react-icons/fa";
import { PiBookmarksSimpleBold, PiHeartStraightBold } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "../../hooks/useCurrentUser";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { i18n } = useTranslation();
  const { data: user } = useCurrentUser();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
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
          <Link to="/" className="w-36">
            <img
              src="/logo.png"
              alt="Propify"
              className="w-full h-full object-contain"
            />
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-10 text-sm font-semibold">
            <Link to="/" className="hover:text-primary">Home</Link>
            <Link to="/properties" className="hover:text-primary">Properties</Link>
            <Link to="/contact-us" className="hover:text-primary">Contact Us</Link>
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4 relative">
            {/* Heart Icon */}
            <button className="p-2 rounded-full hover:bg-gray-100">
              <PiHeartStraightBold size={20} color="#5659f9" />
            </button>

            {/* Bookmark Icon */}
            <Link to="/bookings" className="p-2 rounded-full hover:bg-gray-100">
              <PiBookmarksSimpleBold size={20} color="#5659f9" />
            </Link>

            {/* Language */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100"
            >
              <FaGlobe size={16} color="#5659f9" />
              <span className="uppercase">{i18n.language}</span>
            </button>

            {/* Auth / User */}
            {!user && (
              <>
                <Link to="/login" className="text-sm font-medium hover:text-primary">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Sign Up
                </Link>
              </>
            )}

            {user && (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="text-primary font-semibold px-3 py-2 rounded hover:bg-gray-100 transition"
                >
                  {user.name}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b border-gray-200 bg-purple-50 rounded-t-lg">
                      <p className="font-semibold text-primary">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <ul className="flex flex-col">
                      <li>
                        <button
                          onClick={() => {
                            navigate("/profile");
                            setDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                        >
                          Profile
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 transition"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
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
          <div className="lg:hidden bg-white border-t shadow-md">
            <nav className="flex flex-col gap-2 px-6 py-6 text-sm font-medium">
              <Link to="/" className="px-3 py-2 hover:bg-gray-100 rounded">
                Home
              </Link>
              <Link to="/properties" className="px-3 py-2 hover:bg-gray-100 rounded">
                Properties
              </Link>
              <Link to="/contact-us" className="px-3 py-2 hover:bg-gray-100 rounded">
                Contact Us
              </Link>

              <div className="mt-4 border-t pt-4 flex flex-col gap-2">
                {!user && (
                  <>
                    <Link to="/login" className="px-3 py-2 hover:bg-gray-100 rounded">
                      Sign In
                    </Link>
                    <Link to="/register" className="px-3 py-2 btn-primary text-sm rounded">
                      Sign Up
                    </Link>
                  </>
                )}

                {user && (
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setOpen(false);
                      }}
                      className="px-3 py-2 hover:bg-gray-100 rounded text-left text-primary font-semibold"
                    >
                      {user.name}
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-3 py-2 hover:bg-gray-100 rounded text-left text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}

                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 mt-2"
                >
                  <FaGlobe size={16} color="#5659f9" />
                  <span className="uppercase">{i18n.language}</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}