// src/pages/profile/ProfilePage.tsx
import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useBookings } from "../../hooks/useBookings";
import { useFavorites } from "../../hooks/useFavorites";

import AccountCard from "../../components/profile/AccountCard";
import FavoritesCard from "../../components/profile/FavoritesCard";
import RecentBookingsCard from "../../components/profile/RecentBookingsCard";

const ProfilePage: React.FC = () => {
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
    error,
  } = useCurrentUser() as any;

  const { bookings = [], loading: bookingsLoading } = useBookings() as any;
  const {
    favorites = [],
    loading: favoritesLoading,
    refetch: refetchFavorites,
  } = useFavorites() as any;

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
    localStorage.removeItem("token");
    queryClient.removeQueries({ queryKey: ["currentUser"] });
    navigate("/login");
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="animate-pulse w-full max-w-3xl">
          <div className="h-8 bg-gray-200 rounded mb-6" />
          <div className="h-36 bg-gray-200 rounded mb-4" />
          <div className="h-40 bg-gray-200 rounded mb-4" />
        </div>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white p-6 rounded-2xl shadow max-w-md w-full text-center">
          <p className="text-red-500 mb-4">حدث خطأ أثناء جلب بيانات الحساب.</p>
          <p className="text-sm text-gray-500">
            {(error as Error)?.message ?? "Unknown error"}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white p-8 rounded-2xl shadow max-w-md w-full text-center">
          <p className="text-gray-700 mb-4">You are not logged in.</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-xl bg-gray-900 text-white"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 rounded-xl border border-gray-900 text-gray-900"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Page title */}
        <header className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            My Profile
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Update your info and manage your bookings & favorites.
          </p>
        </header>

        {/* Account card (component) */}
        <AccountCard user={user} initials={initials} onLogout={handleLogout} />

        {/* Note */}
        <div className="bg-white rounded-2xl shadow p-4">
          <p className="text-sm text-gray-700">
            Please ensure your information is correct here — it will be used to
            issue signatures and send booking notifications.{" "}
          </p>
        </div>

        {/* Favorites (component) */}
        <FavoritesCard
          favorites={favorites}
          loading={favoritesLoading}
          onRefresh={refetchFavorites}
        />

        {/* Recent bookings (component) */}
        <RecentBookingsCard bookings={bookings} loading={bookingsLoading} />

        {/* Final CTA */}
        <div className="bg-white flex-col sm:flex-row rounded-2xl shadow p-6 flex items-center justify-between">
          <div className="py-4">
            <h3 className="text-lg font-semibold text-primary">
              Ready to browse more properties?
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Explore available listings and find your next stay.
            </p>
          </div>

<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
  <Link
    to="/properties"
    className="px-4 py-2 bg-primary text-white shadow text-center w-full sm:w-auto"
  >
    Browse Properties
  </Link>

  <Link
    to="/contact-us"
    className="px-3 py-2 border border-primary text-primary text-sm text-center w-full sm:w-auto"
  >
    Contact Support
  </Link>
</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
