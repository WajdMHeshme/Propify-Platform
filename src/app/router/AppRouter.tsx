import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import PropertyDetailsPage from "../../pages/propertyDetails/PropertyDetailsPage";
import HomePage from "../../pages/home/HomePage";
import ContactPage from "../../pages/contact/ContactPage";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "properties/:id",
        element: <PropertyDetailsPage />,
      },
      {
        path: "booking",
        element: <ContactPage />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
