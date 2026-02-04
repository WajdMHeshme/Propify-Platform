import React, { useState } from "react";
import { IoIosLock } from "react-icons/io";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link } from "react-router-dom"; // إذا تستخدم react-router

interface AuthFormProps {
  type: "login" | "register";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-6">
      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email address
        </label>
        <div className="relative">
          <input
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

      {/* Additional fields for Register */}
      {type === "register" && (
        <>
          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 pl-11 pr-12 text-sm
                focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/30
                outline-none transition"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-70">
                <IoIosLock size={18} />
              </span>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm
              focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/30
              outline-none transition"
            />
          </div>
        </>
      )}

      {/* Options */}
      {type === "login" && (
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            Remember me
          </label>

          <a href="#" className="font-medium text-primary hover:underline">
            Forgot password?
          </a>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-xl py-3 text-sm font-semibold text-white
        bg-gradient-to-r from-primary to-indigo-600
        shadow-lg shadow-primary/30
        transition hover:opacity-95 active:scale-[0.97]"
      >
        {type === "login" ? "Sign in" : "Sign up"}
      </button>

      {/* Link to Login if Register */}
      {type === "register" && (
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
