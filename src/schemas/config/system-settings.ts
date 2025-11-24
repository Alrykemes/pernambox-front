import { z } from "zod";

export const settingsSchema = z.object({
  darkMode: z.boolean(),
  backup: z.boolean(),

  blueLight: z.boolean(),
  highContrast: z.boolean(),
  bigFont: z.boolean(),
  bigCursor: z.boolean(),
  focusMode: z.boolean(),

  stockAlert: z.boolean(),
  stockEmail: z.boolean(),
  stockNotify: z.boolean(),
});

export type SettingsSchema = z.infer<typeof settingsSchema>;