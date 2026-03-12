import React, { useState } from "react";
import { IoIosLock } from "react-icons/io";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (data: Record<string, string>) => void;
  isLoading?: boolean;
  error?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  type,
  onSubmit,
  isLoading,
  error,
}) => {
  const { t } = useTranslation("authForm"); 
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("emailLabel")}
        </label>
        <div className="relative">
          <input
            name="email"
            type="email"
            placeholder={t("emailPlaceholder")}
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 pr-11 text-sm
            focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/30
            outline-none transition"
            aria-label={t("emailLabel")}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary opacity-70">
            <MdOutlineAlternateEmail size={18} />
          </span>
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("passwordLabel")}
        </label>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder={t("passwordPlaceholder")}
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 pr-12 text-sm
            focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/30
            outline-none transition"
            aria-label={t("passwordLabel")}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary opacity-70">
            <IoIosLock size={18} />
          </span>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition"
            aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
          >
            {showPassword ? <HiEyeOff /> : <HiEye />}
          </button>
        </div>
      </div>

      {/* Register fields */}
      {type === "register" && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("fullNameLabel")}
            </label>
            <input
              name="name"
              type="text"
              placeholder={t("fullNamePlaceholder")}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm
              focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/30
              outline-none transition"
              aria-label={t("fullNameLabel")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("confirmPasswordLabel")}
            </label>
            <input
              name="password_confirmation"
              type={showPassword ? "text" : "password"}
              placeholder={t("confirmPasswordPlaceholder")}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm
              focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/30
              outline-none transition"
              aria-label={t("confirmPasswordLabel")}
            />
          </div>
        </>
      )}

      {/* Google Sign-in */}
      {type === "login" && (
        <div>
          <a
            href="/auth/google"
            className="w-full inline-flex items-center justify-center gap-3 rounded-xl py-3 text-sm font-medium
              border border-gray-200 bg-white text-gray-700 hover:shadow-md transition"
            aria-label={t("googleSignIn")}
          >
            <FaGoogle className="text-red-500" />
            {t("googleSignIn")}
          </a>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl py-3 text-sm font-semibold text-white
        bg-linear-to-r from-primary to-indigo-600
        shadow-lg shadow-primary/30
        transition hover:opacity-95 active:scale-[0.97]"
      >
        {isLoading
          ? t("loading")
          : type === "login"
          ? t("submitLogin")
          : t("submitRegister")}
      </button>

      {/* Error */}
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

{/* Links */}
<div className="mt-4 text-center text-sm text-gray-500 space-y-2">
  {type === "register" ? (
    <>
      {/* رابط تسجيل الدخول */}
      <span>
        {t("haveAccount")}{" "}
        <Link to="/login" className="text-primary font-medium hover:underline">
          {t("signInLink")}
        </Link>
      </span>

      {/* رابط العودة للهوم */}
      <div className="mt-3">
        <Link
          to="/"
          className="inline-block text-indigo-400 font-medium hover:underline text-sm"
        >
         {t("backToHome")}
        </Link>
      </div>
    </>
  ) : (
    <span>
      {t("noAccount")}{" "}
      <Link to="/register" className="text-primary font-medium hover:underline">
        {t("signUpLink")}
      </Link>
    </span>
  )}
</div>
    </form>
  );
};

export default AuthForm;