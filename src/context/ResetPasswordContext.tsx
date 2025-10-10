import type { ReactNode } from "react";
import { createContext, useState } from "react";

export type ResetPasswordContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
  userId: string | null;
  setUserId: (userId: string | null) => void;
};

export const ResetPasswordContext = createContext<
  ResetPasswordContextType | undefined
>(undefined);

export function ResetPasswordProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [userId, setUserIdState] = useState<string | null>(null);

  const setToken = (token: string | null) => setTokenState(token);
  const clearToken = () => setTokenState(null);
  const setUserId = (userId: string | null) => setUserIdState(userId);

  return (
    <ResetPasswordContext.Provider
      value={{ token, setToken, clearToken, userId, setUserId }}
    >
      {children}
    </ResetPasswordContext.Provider>
  );
}
