import { z } from "zod";

export const UnitEditSchema = z.object({
  username: z.string().min(2, {
    error: "Username must be at least 2 characters.",
  }),
});
