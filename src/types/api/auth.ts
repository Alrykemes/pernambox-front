import type { User } from "@/types/common";

export type LoginResponse = {
  user: User;
  token: string;
};

export type InitiatePasswordResetResponse = {
  success: boolean;
  userId: string;
  expiresIn: string;
};

export type ValidateOTPCodeResponse = {
  success: boolean;
  token: string;
};

export type NewPasswordResponse = {};
