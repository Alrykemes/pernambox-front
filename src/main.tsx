import App from "@/App.tsx";
import "@/index.css";
import { queryClient } from "@/lib/react-query.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthInitializer } from "./components/AuthInitializer";
import { Toaster } from "./components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthInitializer>
        <Toaster/>
        <App />
      </AuthInitializer>
    </QueryClientProvider>
    <Toaster position="top-center" />
  </StrictMode>,
);
