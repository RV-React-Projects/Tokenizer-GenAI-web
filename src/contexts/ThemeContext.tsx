"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Theme, ThemeMode } from "types/Tokens";

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

  // Get system theme preference
  const getSystemTheme = () => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light"; // Default fallback
  };

  // Apply theme to DOM
  const applyTheme = (mode: ThemeMode) => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(mode);
      setCurrentTheme(mode === "dark" ? darkTheme : defaultTheme);
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      // Check for saved theme preference or use system preference
      const savedTheme = localStorage.getItem("theme-mode") as ThemeMode;
      const systemTheme = getSystemTheme();
      const initialTheme = savedTheme || systemTheme;

      setThemeMode(initialTheme);
      applyTheme(initialTheme);
    }
  }, []);

  // Apply theme when themeMode changes
  useEffect(() => {
    if (mounted) {
      applyTheme(themeMode);
      localStorage.setItem("theme-mode", themeMode);
    }
  }, [themeMode, mounted]);

  const toggleTheme = () => {
    setThemeMode(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{ themeMode, setThemeMode, currentTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
