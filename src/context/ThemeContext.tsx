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
    const initial = saved && siteConfig.stylesDisponibles.some((s) => s.id === saved)
      ? saved
      : siteConfig.defaultTheme;

    setThemeState(initial);
    document.documentElement.setAttribute("data-theme", initial);
    if (initial === "sombre") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    if (newTheme === "sombre") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
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
