import { useEffect, useState } from "react";
import PropifyLoader from "./components/ui/loaders/PropifyLoader";
import AppRouter from "./app/router/AppRouter";


export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PropifyLoader />;
  }

  return <AppRouter />;
}