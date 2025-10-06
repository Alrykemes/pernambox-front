import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

type ResetPasswordContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
};

const ResetPasswordContext = createContext<
  ResetPasswordContextType | undefined
>(undefined);

export function ResetPasswordProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);

  const setToken = (token: string | null) => setTokenState(token);
  const clearToken = () => setTokenState(null);

  return (
    <ResetPasswordContext.Provider value={{ token, setToken, clearToken }}>
      {children}
    </ResetPasswordContext.Provider>
  );
}

export function useResetPassword() {
  const context = useContext(ResetPasswordContext);
  if (!context) {
    throw new Error(
      "useResetPassword must be used within a ResetPasswordProvider",
    );
  }
  return context;
}
