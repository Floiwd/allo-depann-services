"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { siteConfig, ThemeId, SHOW_STYLE_SWITCHER } from "@/config/site";

interface ThemeContextType {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  showSwitcher: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: siteConfig.defaultTheme,
  setTheme: () => {},
  showSwitcher: SHOW_STYLE_SWITCHER,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("allo_depann_theme") as ThemeId | null;
        if (saved && siteConfig.stylesDisponibles.some((s) => s.id === saved)) {
          return saved;
        }
      } catch {
        // Fallback si localStorage est inaccessible
      }
    }
    return siteConfig.defaultTheme;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "sombre") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("allo_depann_theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      if (newTheme === "sombre") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch {
      // Ignorer si localStorage est bloqué
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, showSwitcher: SHOW_STYLE_SWITCHER }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
