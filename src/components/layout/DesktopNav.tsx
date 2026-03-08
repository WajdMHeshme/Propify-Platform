import { NavLink, Link, useNavigate } from "react-router-dom";
import { PiUserCircleBold } from "react-icons/pi";
import { FaGlobe } from "react-icons/fa";
import QuickActionsDropdown from "../ui/ActionsDropdown";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useTranslation } from "react-i18next";

type User = {
  name: string;
};

export default function DesktopNav() {
  const { data: user } = useCurrentUser() as { data?: User | null };
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const base = "px-4 py-2 transition-all duration-200 text-sm font-semibold flex items-center gap-1";
  const active = "bg-primary text-white shadow-sm rounded-[4px]";
  const inactive = "text-gray-600 hover:bg-gray-100 hover:text-primary";

  return (
    <nav className="hidden lg:flex items-center w-full relative">
      {/* Center links */}
      <div className="absolute left-[40%] -translate-x-1/2 flex items-center gap-4">
        <NavLink to="/" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
          Home
        </NavLink>

        <NavLink to="/properties" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
          Properties
        </NavLink>

        <NavLink to="/contact-us" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
          Contact Us
        </NavLink>
      </div>

      {/* Right side: language, auth (Sign In / Sign Up) & QuickActionsDropdown (beside them) */}
      <div className="ml-auto flex items-center gap-2">
                <QuickActionsDropdown />
        {/* Language toggle - outside the dropdown */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 text-sm"
          aria-label="Toggle language"
        >
          <FaGlobe size={14} className="text-primary" />
          {i18n.language.toUpperCase()}
        </button>

        {/* Auth actions - remain visible outside the dropdown */}
        {user ? (
          <button
            onClick={() => navigate("/profile")}
            className="px-3 py-2 rounded-md hover:bg-gray-100 flex items-center gap-1 text-gray-700 transition-colors"
          >
            <PiUserCircleBold size={18} className="text-primary" />
            <span className="font-medium">{user.name}</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="px-3 py-2 rounded-md hover:bg-gray-100 text-sm">
              Sign In
            </Link>
            <Link to="/register" className="btn-primary px-3 py-2 text-sm">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}