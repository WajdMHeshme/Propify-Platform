// src/components/layout/MobileMenu.tsx
import { NavLink, Link, useNavigate } from "react-router-dom";
import { PiBookmarksSimpleBold } from "react-icons/pi";
import { FiHeart, FiUser, FiLogOut } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import type { MobileMenuProps } from "../../types/ui";

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { data: user } = useCurrentUser();
  const { t, i18n } = useTranslation("navbar");
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

  if (!open) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-40">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Panel */}
      <aside
        className={`absolute right-0 top-20 h-[calc(100%-5rem)] pt-2 w-80 max-w-full bg-white shadow-xl transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 h-full flex flex-col">
          {/* Nav Links */}
          <nav className="flex flex-col gap-2 mt-4">
            <NavLink
              to="/"
              onClick={onClose}
              className={({ isActive }) =>
                `px-4 py-3 rounded-md text-sm font-semibold ${
                  isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {t("home")}
            </NavLink>

            <NavLink
              to="/properties"
              onClick={onClose}
              className={({ isActive }) =>
                `px-4 py-3 rounded-md text-sm font-semibold ${
                  isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {t("properties")}
            </NavLink>

            <NavLink
              to="/contact-us"
              onClick={onClose}
              className={({ isActive }) =>
                `px-4 py-3 rounded-md text-sm font-semibold ${
                  isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {t("contactUs")}
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="mt-6 border-t border-gray-200 pt-4 flex-1 overflow-auto flex flex-col gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-3 rounded-md hover:bg-gray-100"
            >
              <span className="uppercase">{i18n.language}</span>
              <span className="ml-auto text-sm text-gray-500">{t("language")}</span>
            </button>

            <Link
              to="/bookings"
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-3 rounded-md hover:bg-gray-100"
            >
              <PiBookmarksSimpleBold size={18} color="#5659f9" />
              <span className="text-sm font-medium">{t("bookings")}</span>
            </Link>

            {/* Favorites link */}
            <Link
              to="/favorite"
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-3 rounded-md hover:bg-gray-100"
              title={t("favorites")}
            >
              <FiHeart size={18} className="text-primary" />
              <span className="text-sm font-medium">{t("favorites")}</span>
            </Link>

            {/* Profile / Auth area */}
            {user ? (
              <div className="border-2 border-primary rounded-md bg-gray-50 p-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {/* initials */}
                    {user.name
                      ? user.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .slice(0, 2)
                      : "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-primary truncate">{user.name}</p>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      navigate("/profile");
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white text-left"
                  >
                    <FiUser />
                    <span className="text-sm">{t("profile")}</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      handleLogout();
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white text-left text-red-500"
                  >
                    <FiLogOut />
                    <span className="text-sm">{t("logout")}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  onClick={onClose}
                  className="px-4 py-2 rounded-md hover:bg-gray-100"
                >
                  {t("signIn")}
                </Link>
                <Link
                  to="/register"
                  onClick={onClose}
                  className="btn-primary px-4 py-2 rounded-md"
                >
                  {t("signUp")}
                </Link>
              </div>
            )}
          </div>

          <div className="mt-4 text-xs text-gray-400">{t("copyright", { year: new Date().getFullYear() })}</div>
        </div>
      </aside>
    </div>
  );
}