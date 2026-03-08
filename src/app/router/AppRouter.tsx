// src/app/router/AppRouter.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
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
import ErrorBoundary from "../../components/ui/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorBoundary />, // هنا
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorBoundary />, // هنا
  },
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />, // هنا
    children: [
      { index: true, element: <HomePage />, errorElement: <ErrorBoundary /> },
      { path: "properties", element: <PropertiesPage />, errorElement: <ErrorBoundary /> },
      { path: "properties/:id", element: <PropertyDetailsPage />, errorElement: <ErrorBoundary /> },
      { path: "contact-us", element: <ContactPage />, errorElement: <ErrorBoundary /> },
      { path: "profile", element: <ProfilePage />, errorElement: <ErrorBoundary /> },
      { path: "bookings", element: <BookingsPage />, errorElement: <ErrorBoundary /> },
      { path: "bookings/:id/messages", element: <BookingMessagesPage />, errorElement: <ErrorBoundary /> },
        {path: "favorites", element: <FavoritesPage />, errorElement: <ErrorBoundary /> },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;