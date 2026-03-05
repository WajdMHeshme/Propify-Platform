import React, { useState } from "react";
import { IoIosLock } from "react-icons/io";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link } from "react-router-dom";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (data: Record<string, string>) => void;
  isLoading?: boolean;
  error?: string; // تأكد أن error نص فقط
}

const AuthForm: React.FC<AuthFormProps> = ({
  type,
  onSubmit,
  isLoading,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email address
        </label>
        <div className="relative">
          <input
            name="email"
            type="email"
            placeholder="name@example.com"
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 pl-11 text-sm
            focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/30
            outline-none transition"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-70">
            <MdOutlineAlternateEmail size={18} />
          </span>
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 pl-11 pr-12 text-sm
            focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/30
            outline-none transition"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-70">
            <IoIosLock size={18} />
          </span>

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition"
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
              Full Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="John Doe"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm
              focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/30
              outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              name="password_confirmation"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm
              focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/30
              outline-none transition"
            />
          </div>
        </>
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
        {isLoading ? "Loading..." : type === "login" ? "Sign in" : "Sign up"}
      </button>

      {/* Error */}
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {/* Link to Login */}
      {type === "register" && (
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      )}
    </form>
  );
};

export default AuthForm;