import { Toaster } from "@/components/ui/sonner";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ResetPasswordProvider } from "./context/ResetPasswordContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ResetPasswordProvider>
      <App />
    </ResetPasswordProvider>
    <Toaster position="top-center" />
  </StrictMode>,
);
