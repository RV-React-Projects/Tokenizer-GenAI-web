"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

export const Header: React.FC = () => {
  const { currentTheme } = useTheme();

  return (
    <header className="border-b border-slate-200/50 dark:border-slate-700/50 bg-white/20 dark:bg-slate-900/20 backdrop-blur-xl sticky top-0 z-50 shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="font-semibold text-slate-900 dark:text-white">
            Tokenizer Web
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#features"
            className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#about"
            className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            About
          </a>
          <a
            href="https://github.com/RV-React-Projects/Tokenizer-GenAI-web"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
