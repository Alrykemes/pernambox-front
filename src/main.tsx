import App from "@/App.tsx";
import { Toaster } from "@/components/ui/sonner";
import "@/index.css";
import { queryClient } from "@/lib/react-query.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthInitializer } from "./components/AuthInitializer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthInitializer>
        <App />
      </AuthInitializer>
    </QueryClientProvider>
    <Toaster position="top-center" />
  </StrictMode>,
);
