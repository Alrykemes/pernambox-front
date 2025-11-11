import App from "@/App.tsx";
import { AuthInitializer } from "@/components/AuthInitializer.tsx";
import { Toaster } from "@/components/ui/sonner";
import "@/index.css";
import { queryClient } from "@/lib/react-query.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthInitializer>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthInitializer>
    <Toaster position="top-center" />
  </StrictMode>,
);
