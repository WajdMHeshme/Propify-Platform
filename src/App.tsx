import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PropifyLoader from "./components/ui/loaders/PropifyLoader";
import AppRouter from "./app/router/AppRouter";

export default function App() {
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const lang = i18n.language;

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  if (loading) {
    return <PropifyLoader />;
  }

  return <AppRouter />;
}