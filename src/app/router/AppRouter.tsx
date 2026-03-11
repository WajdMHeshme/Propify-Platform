// src/app/router/AppRouter.tsx

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import ScrollToTop from "../../components/common/ScrollToTop";

import PropertyDetailsPage from "../../pages/propertyDetails/PropertyDetailsPage";
import HomePage from "../../pages/home/HomePage";
import PropertiesPage from "../../pages/properties/PropertiesPage";
import ContactPage from "../../pages/contact/ContactPage";
import LoginPage from "../../pages/auth/LoginPage";
import RegisterPage from "../../pages/auth/RegisterPage";
import ProfilePage from "../../pages/profile/ProfilePage";
import BookingsPage from "../../pages/bookings/BookingsPage";
import FavoritesPage from "../../pages/favorite/FavoritesPage";
import BookingMessagesPage from "../../pages/messages/BookingMessagesPage";

const router = createBrowserRouter([
  {
    element: <ScrollToTop />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "properties", element: <PropertiesPage /> },
          { path: "properties/:id", element: <PropertyDetailsPage /> },
          { path: "contact-us", element: <ContactPage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "bookings", element: <BookingsPage /> },
          { path: "bookings/:id/messages", element: <BookingMessagesPage /> },
          { path: "favorites", element: <FavoritesPage /> },
        ],
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
