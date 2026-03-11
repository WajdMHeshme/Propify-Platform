import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-out-cubic",
    });
  }, []);

  return <>{children}</>;
}