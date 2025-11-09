import { recoveryApi } from "@/lib/recoveryApi";
import type {
  InitiatePasswordResetResponse,
  NewPasswordResponse,
  ValidateOTPCodeResponse,
} from "@/types/api/auth";
import { create } from "zustand";

type ResetPasswordState = {
  userId: string | null;
  setUserId: (userId: string | null) => void;
  email: string | null;
  setEmail: (email: string | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
  lastSentAt: number | null;

  requestPasswordReset: (
    email: string,
  ) => Promise<{ success: boolean; userId: string | null }>;
  resendPasswordReset: () => Promise<{ success: boolean }>;
  validateOTPCode: (
    otpCode: string,
    userId: string,
  ) => Promise<{ success: boolean; token?: string }>;
  newPassword: (password: string) => Promise<{ success: boolean }>;
};

export const useResetPasswordStore = create<ResetPasswordState>((set, get) => ({
  userId: null,
  email: null,
  token: null,
  lastSentAt: null,

  setUserId: (userId) => set({ userId }),
  setEmail: (email) => set({ email }),
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),

  requestPasswordReset: async (email) => {
    try {
      const response = await recoveryApi.post<InitiatePasswordResetResponse>(
        "/auth/password-reset",
        { email },
      );
      const { success, userId } = response.data;
      set({ email, userId, lastSentAt: Date.now() });
      return { success, userId };
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 404) {
        set({ email, lastSentAt: Date.now() });
        return { success: true, userId: null };
      }
      return { success: false, userId: null };
    }
  },

  resendPasswordReset: async () => {
    const { email, lastSentAt } = get();
    if (!email) return { success: false };

    if (lastSentAt && Date.now() - lastSentAt < 60_000) {
      return { success: false };
    }

    const response = await get().requestPasswordReset(email);
    return { success: response.success };
  },

  validateOTPCode: async (otpCode: string, userId: string) => {
    try {
      const response = await recoveryApi.post<ValidateOTPCodeResponse>(
        "/auth/password-reset/validate-otp",
        { otpCode, userId },
      );
      const success = !!response.data.success;
      const token = response.data.token ?? undefined;

      if (success && token) set({ token });
      return { success, token };
    } catch (err) {
      return { success: false };
    }
  },

  newPassword: async (password: string) => {
    try {
      const response = await recoveryApi.patch<NewPasswordResponse>(
        "/auth/password-reset",
        {
          password,
        },
      );

      if (response.status === 200) {
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      return { success: false };
    }
  },
}));
