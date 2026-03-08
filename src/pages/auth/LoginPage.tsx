import React, { useState } from "react";
import AuthForm from "../../components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import type { LoginRequest } from "../../types/auth";
import Modal from "../../components/modal/Modal";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useLogin();

  const [modal, setModal] = useState({
    isOpen: false,
    type: "success" as "success" | "error",
    title: "",
    desc: "",
  });

  const handleLogin = (data: LoginRequest) => {
    mutate(data, {
      onSuccess: (res) => {
        localStorage.setItem("token", res.token);
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        setModal({
          isOpen: true,
          type: "success",
          title: "Login Successful",
          desc: "Welcome back! You have successfully signed in to your Propify account.",
        });
      },
      onError: (err: any) => {
        setModal({
          isOpen: true,
          type: "error",
          title: "Login Failed",
          desc: err?.message || "Login failed. Please check your credentials and try again.",
        });
      },
    });
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side */}
      <div className="relative bg-linear-to-br from-primary via-indigo-600 to-violet-700 text-white p-12 flex flex-col justify-between overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-black/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-white/5 rounded-full blur-2xl" />

        <div className="relative z-10">
          <img
            src="/assets/icons/image.png"
            alt="Propify Logo"
            className="w-full max-w-sm mx-auto drop-shadow-2xl"
          />

          <h1 className="mt-6 text-center text-4xl md:text-5xl font-extrabold tracking-widest">
            Propify
          </h1>

          <div className="mt-10 grid gap-4 max-w-md mx-auto text-sm">
            <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-white" />
              Manage properties in one place
            </div>

            <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-white" />
              Track tenants & payments easily
            </div>

            <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-white" />
              Secure & cloud-based platform
            </div>
          </div>
        </div>

        <p className="relative z-10 text-center text-sm text-white/50">
          © {new Date().getFullYear()} Propify. All rights reserved.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center p-8 md:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Sign in to your Propify account
              </p>
            </div>

            <AuthForm
              type="login"
              onSubmit={handleLogin}
              isLoading={isPending}
              error={error instanceof Error ? error.message : error?.toString()}
            />
          </div>

          <p className="mt-6 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Propify
          </p>
        </div>
      </div>

      {/* BookingModal - نفس الهيكل، نمرّر title + desc */}
      <Modal
        isOpen={modal.isOpen}
        type={modal.type}
        title={modal.title}
        desc={modal.desc}
        onClose={() =>
          setModal((prev) => {
            // لو النجاح => نعمل navigate بعد الإغلاق
            if (prev.type === "success") {
              navigate("/");
            }
            return { ...prev, isOpen: false };
          })
        }
      />
    </div>
  );
};

export default LoginPage;