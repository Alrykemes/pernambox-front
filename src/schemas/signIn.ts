import { z } from "zod/v4";

export const SignInSchema = z.object({
  email: z
    .email("Email must be a valid email address")
    .nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});
