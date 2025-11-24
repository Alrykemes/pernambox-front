import App from "@/App.tsx";
import { AccessibilityProvider } from "@/components/AccessibilityProvider";
import { AuthInitializer } from "@/components/AuthInitializer.tsx";
import { Toaster } from "@/components/ui/sonner";
import "@/index.css";
import { queryClient } from "@/lib/react-query.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { ThemeProvider } from "@/components/ThemeProvider"
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AccessibilityProvider>
        <AuthInitializer>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </AuthInitializer>
        <Toaster position="top-center" />
      </AccessibilityProvider>
    </ThemeProvider>
  </StrictMode>,
);
