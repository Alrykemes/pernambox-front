import type { Role, User } from "@/types/common";

export type LoginResponse = {
  userId: string;
  email: string;
  role: Role;
  token: string;
};

export type AuthMeResponse = User;

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
