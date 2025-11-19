import type { SettingsSchema } from "@/schemas/config/system-settings";
import { useState } from "react";
import { SystemSettingsCard } from "./components/SystemSettingsCard";
import { SystemInfoCard } from "./components/SystemInfoCard";
import { AccessibilityCard } from "./components/AcessibilitySettingsCard";
import { StockSettingsCard } from "./components/StockSettingsCard";


export default function SystemConfig() {
  const [values, setValues] = useState<SettingsSchema>({
    darkMode: false,
    backup: false,
    blueLight: false,
    highContrast: false,
    bigFont: false,
    bigCursor: false,
    focusMode: false,
    stockAlert: false,
    stockEmail: false,
    stockNotify: false
  });

  return (
    <div className="p-6 space-y-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

      <SystemSettingsCard values={values} setValues={setValues} />

      <SystemInfoCard />

      <AccessibilityCard values={values} setValues={setValues} />

      <StockSettingsCard values={values} setValues={setValues} />

    </div>
  );
}
