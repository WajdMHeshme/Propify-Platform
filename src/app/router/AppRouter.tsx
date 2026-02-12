import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import PropertyDetailsPage from "../../pages/propertyDetails/PropertyDetailsPage";
import HomePage from "../../pages/home/HomePage";
import PropertiesPage from "../../pages/properties/PropertiesPage";
import ContactPage from "../../pages/contact/ContactPage";
import LoginPage from "../../pages/auth/LoginPage";
import RegisterPage from "../../pages/auth/RegisterPage";

const router = createBrowserRouter([
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
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "properties",
        element: <PropertiesPage />
      },
      {
        path: "properties/:id",
        element: <PropertyDetailsPage />,
      },
      {
        path: "contact-us",
        element: <ContactPage />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
