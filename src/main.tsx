import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import "./i18n";
import App from "./App";
import AppProviders from "./app/providers/AppProviders";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProviders>
        <App />
      </AppProviders>
    </QueryClientProvider>
  </StrictMode>
);
