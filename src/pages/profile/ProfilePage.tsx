// pages/profile/ProfilePage.tsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "../../hooks/useCurrentUser";

const ProfilePage: React.FC = () => {
  const { data: user, isLoading, isError, error } = useCurrentUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const initials = useMemo(() => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((p: string) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }, [user]);

  const handleLogout = () => {
    // احذف التوكن محليًا
    localStorage.removeItem("token");

    // نظّف queries المتعلقة بالمستخدم (اختياري)
    queryClient.removeQueries({ queryKey: ["currentUser"] });
    queryClient.clear(); // إن أردت تنظيف كل الكاش

    // أعد التوجيه لصفحة الدخول
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="animate-pulse w-full max-w-md">
          <div className="h-6 bg-gray-200 rounded mb-4" />
          <div className="h-36 bg-gray-200 rounded mb-4" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-6 rounded-2xl shadow max-w-md w-full text-center">
          <p className="text-red-500 mb-4">An error occurred while fetching profile data.</p>
          <p className="text-sm text-gray-500">{(error as Error)?.message}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow max-w-md w-full text-center">
          <p className="text-gray-700 mb-4">You are not logged in.</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-xl bg-primary text-white"
            >
                Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 rounded-xl border border-primary text-primary"
            >
             Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center gap-6 md:gap-8">
            {/* Avatar */}
            <div className="shrink-0">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-purple-100 flex items-center justify-center text-2xl md:text-3xl font-bold text-purple-700">
                {initials}
              </div>
            </div>

            {/* Name + role */}
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-sm md:text-base text-gray-500 mt-1">{user.email}</p>
              {("id" in user || "created_at" in user) && (
                <div className="mt-3 text-xs text-gray-400">
                  {("id" in user) && <span className="mr-3">ID: { (user as any).id }</span>}
                  {("created_at" in user) && <span>Joined: { new Date((user as any).created_at).toLocaleDateString() }</span>}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col items-end gap-3">
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 mt-6 pt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Account details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500">Full Name</p>
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500">Email Address</p>
                <p className="text-sm font-medium text-gray-900">{user.email}</p>
              </div>
              {("phone" in user) && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500">الهاتف</p>
                  <p className="text-sm font-medium text-gray-900">{(user as any).phone}</p>
                </div>
              )}

              {("address" in user) && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-sm font-medium text-gray-900">{(user as any).address}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;