"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeMode, Theme } from "@/types";

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  currentTheme: Theme;
  toggleTheme: () => void;
}

const defaultTheme: Theme = {
  name: "default",
  primary: "#3b82f6",
  secondary: "#64748b",
  background: "#ffffff",
  surface: "#f8fafc",
  text: "#0f172a",
  accent: "#f59e0b",
};

const darkTheme: Theme = {
  name: "dark",
  primary: "#60a5fa",
  secondary: "#94a3b8",
  background: "#0f172a",
  surface: "#1e293b",
  text: "#f8fafc",
  accent: "#fbbf24",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Only run on client side
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme-mode") as ThemeMode;
      if (savedTheme) {
        setThemeMode(savedTheme);
      }
    }
  }, []);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;

      // Remove all theme classes first
      root.classList.remove("light", "dark");

      if (themeMode === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        root.classList.add(systemTheme);
        setCurrentTheme(systemTheme === "dark" ? darkTheme : defaultTheme);
      } else {
        root.classList.add(themeMode);
        setCurrentTheme(themeMode === "dark" ? darkTheme : defaultTheme);
      }
      localStorage.setItem("theme-mode", themeMode);
    }
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode(prev => {
      const newMode = prev === "light" ? "dark" : "light";
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider
      value={{ themeMode, setThemeMode, currentTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
