import { createContext, useContext, useEffect, useState } from "react";

type AccessibilitySettings = {
  highContrast: boolean;
  enlargedFont: boolean;
  enlargedCursor: boolean;
  enlargedFocus: boolean;
};

type AccessibilityProviderState = {
  settings: AccessibilitySettings;
  setHighContrast: (enabled: boolean) => void;
  setEnlargedFont: (enabled: boolean) => void;
  setEnlargedCursor: (enabled: boolean) => void;
  setEnlargedFocus: (enabled: boolean) => void;
};

const initialState: AccessibilityProviderState = {
  settings: {
    highContrast: false,
    enlargedFont: false,
    enlargedCursor: false,
    enlargedFocus: false,
  },
  setHighContrast: () => null,
  setEnlargedFont: () => null,
  setEnlargedCursor: () => null,
  setEnlargedFocus: () => null,
};

const AccessibilityProviderContext =
  createContext<AccessibilityProviderState>(initialState);

const STORAGE_KEY = "vite-accessibility-settings";

export function AccessibilityProvider({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return initialState.settings;
      }
    }
    return initialState.settings;
  });

  // Aplicar alto contraste
  useEffect(() => {
    const root = document.documentElement;
    if (settings.highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }
  }, [settings.highContrast]);

  // Aplicar fonte ampliada
  useEffect(() => {
    const root = document.documentElement;
    if (settings.enlargedFont) {
      root.classList.add("enlarged-font");
    } else {
      root.classList.remove("enlarged-font");
    }
  }, [settings.enlargedFont]);

  // Aplicar cursor ampliado
  useEffect(() => {
    const root = document.documentElement;
    if (settings.enlargedCursor) {
      root.classList.add("enlarged-cursor");
    } else {
      root.classList.remove("enlarged-cursor");
    }
  }, [settings.enlargedCursor]);

  // Aplicar foco ampliado
  useEffect(() => {
    const root = document.documentElement;
    if (settings.enlargedFocus) {
      root.classList.add("enlarged-focus");
    } else {
      root.classList.remove("enlarged-focus");
    }
  }, [settings.enlargedFocus]);

  // Salvar no localStorage sempre que settings mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (updates: Partial<AccessibilitySettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const value: AccessibilityProviderState = {
    settings,
    setHighContrast: (enabled) => updateSettings({ highContrast: enabled }),
    setEnlargedFont: (enabled) => updateSettings({ enlargedFont: enabled }),
    setEnlargedCursor: (enabled) => updateSettings({ enlargedCursor: enabled }),
    setEnlargedFocus: (enabled) => updateSettings({ enlargedFocus: enabled }),
  };

  return (
    <AccessibilityProviderContext.Provider {...props} value={value}>
      {children}
    </AccessibilityProviderContext.Provider>
  );
}

export const useAccessibility = () => {
  const context = useContext(AccessibilityProviderContext);

  if (context === undefined)
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider"
    );

  return context;
};

