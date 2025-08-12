"use client";

import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface TokenizerInputProps {
  onTokenize: (text: string) => void;
  isProcessing: boolean;
}

export const TokenizerInput: React.FC<TokenizerInputProps> = ({
  onTokenize,
  isProcessing,
}) => {
  const { currentTheme } = useTheme();
  const [inputText, setInputText] = useState("");
  const [charCount, setCharCount] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
    setCharCount(text.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputText.trim()) {
      toast.error("Please enter some text to tokenize");
      return;
    }

    if (inputText.length > 10000) {
      toast.error("Text is too long. Please keep it under 10,000 characters.");
      return;
    }

    onTokenize(inputText);
    toast.success("Processing your text...");
  };

  const handleClear = () => {
    setInputText("");
    setCharCount(0);
  };

  const handleSampleText = () => {
    const sampleText =
      "Hello, there! how are u doing? are you ready Understand how AI models process and encode your content and give it a try!";
    setInputText(sampleText);
    setCharCount(sampleText.length);
  };

  return (
    <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Input Text
        </h2>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          {charCount} characters
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter your text here to see how it gets tokenized..."
            className={cn(
              "w-full h-48 p-4 border rounded-lg resize-none transition-all duration-200",
              "bg-slate-50/50 dark:bg-slate-700/50 border-slate-200/50 dark:border-slate-600/50",
              "text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400",
              "focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              "font-mono text-sm leading-relaxed"
            )}
            disabled={isProcessing}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isProcessing || !inputText.trim()}
            className={cn(
              "px-6 py-3 rounded-lg font-medium transition-all duration-200",
              "bg-gradient-to-r from-blue-600 to-purple-600 text-white",
              "hover:from-blue-700 hover:to-purple-700 hover:scale-105",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
              "flex items-center gap-2"
            )}
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Tokenize Text
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleSampleText}
            disabled={isProcessing}
            className="px-4 py-3 rounded-lg font-medium transition-all duration-200 bg-slate-200/50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Load Sample
          </button>

          <button
            type="button"
            onClick={handleClear}
            disabled={isProcessing || !inputText}
            className="px-4 py-3 rounded-lg font-medium transition-all duration-200 bg-red-100/50 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-200/50 dark:hover:bg-red-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={() => {
              navigator.clipboard
                .writeText(inputText)
                .then(() => {
                  toast.success("Input text copied to clipboard!");
                })
                .catch(() => {
                  toast.error("Failed to copy to clipboard");
                });
            }}
            disabled={isProcessing || !inputText.trim()}
            className="px-4 py-3 rounded-lg font-medium transition-all duration-200 bg-green-100/50 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-200/50 dark:hover:bg-green-800/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copy Text
          </button>
        </div>
      </form>

      <div className="mt-4 p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <p className="font-medium mb-1">How it works:</p>
            <p>
              Enter any text and our AI tokenizer will break it down into
              individual tokens, showing you exactly how AI models process and
              encode your content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
