import { SignInSchema } from "@/schemas/signIn";
import { z } from "zod/v4";

export type SignInType = z.infer<typeof SignInSchema>;
