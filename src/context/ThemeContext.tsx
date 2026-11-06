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
  const [theme, setThemeState] = useState<ThemeId>(siteConfig.defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("allo_depann_theme") as ThemeId | null;
    if (saved && siteConfig.stylesDisponibles.some((s) => s.id === saved)) {
      setThemeState(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      document.documentElement.setAttribute("data-theme", siteConfig.defaultTheme);
    }
  }, []);

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("allo_depann_theme", newTheme);
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
