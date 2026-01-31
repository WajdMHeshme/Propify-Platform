import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "./i18n";
import AppRouter from "./app/router/AppRouter";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
