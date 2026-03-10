// src/components/layout/DesktopNav.tsx
import { NavLink, Link, useNavigate } from "react-router-dom";
import { PiUserCircleBold } from "react-icons/pi";
import { FaGlobe } from "react-icons/fa";
import QuickActionsDropdown from "../ui/ActionsDropdown";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useTranslation } from "react-i18next";

export default function DesktopNav() {
  const { data: user } = useCurrentUser() as { data?: any };
  const { t, i18n } = useTranslation("navbar");
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const isRTL = i18n.dir ? i18n.dir(i18n.language) === "rtl" : i18n.language === "ar";

  // center links position changes with direction
  const centerLinksClass = isRTL
    ? "absolute right-[40%] translate-x-1/2 flex items-center gap-4"
    : "absolute left-[40%] -translate-x-1/2 flex items-center gap-4";

  // controls side: ml-auto for LTR, mr-auto for RTL
  const controlsSide = isRTL ? "mr-auto" : "ml-auto";

  const base = "px-4 py-2 transition-all duration-200 text-sm font-semibold flex items-center gap-1";
  const active = "bg-primary text-white shadow-sm rounded-[4px]";
  const inactive = "text-gray-600 hover:bg-gray-100 hover:text-primary";

  return (
    <nav className="hidden lg:flex items-center w-full relative">
      {/* Center links */}
      <div className={centerLinksClass}>
        <NavLink to="/" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
          {t("home")}
        </NavLink>

        <NavLink to="/properties" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
          {t("properties")}
        </NavLink>

        <NavLink to="/contact-us" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
          {t("contactUs")}
        </NavLink>
      </div>

      {/* Right side: language, auth (Sign In / Sign Up) & QuickActionsDropdown (beside them) */}
      <div className={`${controlsSide} flex items-center gap-2`}>
        <QuickActionsDropdown />
        {/* Language toggle - outside the dropdown */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 text-sm"
          aria-label={t("toggleLanguage")}
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
            <span className="font-medium">{user?.name}</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="px-3 py-2 rounded-md hover:bg-gray-100 text-sm">
              {t("signIn")}
            </Link>
            <Link to="/register" className="btn-primary px-3 py-2 text-sm">
              {t("signUp")}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}