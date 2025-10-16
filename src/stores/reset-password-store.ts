import { create } from "zustand";

type ResetPasswordState = {
  setUserId: (userId: string | null) => void;
  userId: string | null;
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
};

export const useResetPasswordStore = create<ResetPasswordState>((set) => ({
  token: null,
  userId: null,

  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),
  setUserId: (userId) => set({ userId }),
}));
