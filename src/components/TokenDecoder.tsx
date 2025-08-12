"use client";

import { useState } from "react";
import { cn } from "@lib/utils";
import toast from "react-hot-toast";
import { smartTokenizer } from "@lib/tokenizer";

export const TokenDecoder: React.FC = () => {
  const [tokenInput, setTokenInput] = useState("");
  const [decodedText, setDecodedText] = useState("");
  const [isDecoding, setIsDecoding] = useState(false);

  const handleDecode = () => {
    if (!tokenInput.trim()) {
      toast.error("Please enter tokens to decode");
      return;
    }

    setIsDecoding(true);

    try {
      // Try to parse as JSON array first
      let tokenIds;
      try {
        tokenIds = JSON.parse(tokenInput);
      } catch {
        // If not JSON, try to parse as comma-separated values
        tokenIds = tokenInput
          .split(",")
          .map(t => Number(t.trim()))
          .filter(t => !isNaN(t));
      }

      if (!Array.isArray(tokenIds)) {
        toast.error(
          "Invalid token format. Please provide an array of token IDs."
        );
        setIsDecoding(false);
        return;
      }

      // Use smart tokenizer to decode
      const text = smartTokenizer.decode(tokenIds);
      setDecodedText(text);
      toast.success("Tokens decoded successfully!");
    } catch (error) {
      toast.error("Failed to decode tokens. Please check the format.");
    } finally {
      setIsDecoding(false);
    }
  };

  const handleClear = () => {
    setTokenInput("");
    setDecodedText("");
  };

  const handleCopy = (text: string, type: "tokens" | "decoded") => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(
          `${type === "tokens" ? "Tokens" : "Decoded text"} copied to clipboard!`
        );
      })
      .catch(() => {
        toast.error("Failed to copy to clipboard");
      });
  };

  const handleSampleTokens = () => {
    const sampleTokens = [
      72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 33,
    ];
    setTokenInput(JSON.stringify(sampleTokens));
  };

  return (
    <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Token Decoder
        </h2>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Decode tokens back to text
        </div>
      </div>

      <div className="space-y-4">
        {/* Token Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Input Tokens (JSON array or comma-separated)
          </label>
          <div className="relative">
            <textarea
              value={tokenInput}
              onChange={e => setTokenInput(e.target.value)}
              placeholder="Enter tokens as [72, 101, 108, 108, 111] or 72,101,108,108,111"
              className={cn(
                "w-full h-32 p-4 border rounded-lg resize-none transition-all duration-200",
                "bg-slate-50/50 dark:bg-slate-700/50 border-slate-200/50 dark:border-slate-600/50",
                "text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400",
                "focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                "font-mono text-sm leading-relaxed"
              )}
              disabled={isDecoding}
            />
            <button
              onClick={() => handleCopy(tokenInput, "tokens")}
              disabled={!tokenInput.trim()}
              className="absolute top-2 right-2 p-2 rounded-lg bg-slate-200/50 dark:bg-slate-600/50 text-slate-600 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-slate-500/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Copy tokens"
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
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleDecode}
            disabled={isDecoding || !tokenInput.trim()}
            className={cn(
              "px-6 py-3 rounded-lg font-medium transition-all duration-200",
              "bg-gradient-to-r from-green-600 to-emerald-600 text-white",
              "hover:from-green-700 hover:to-emerald-700 hover:scale-105",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
              "flex items-center gap-2"
            )}
          >
            {isDecoding ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Decoding...
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
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Decode Tokens
              </>
            )}
          </button>

          <button
            onClick={handleSampleTokens}
            disabled={isDecoding}
            className="px-4 py-3 rounded-lg font-medium transition-all duration-200 bg-slate-200/50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Load Sample
          </button>

          <button
            onClick={handleClear}
            disabled={isDecoding || (!tokenInput && !decodedText)}
            className="px-4 py-3 rounded-lg font-medium transition-all duration-200 bg-red-100/50 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-200/50 dark:hover:bg-red-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear
          </button>
        </div>

        {/* Decoded Output */}
        {decodedText && (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Decoded Text
            </label>
            <div className="relative">
              <textarea
                value={decodedText}
                readOnly
                className={cn(
                  "w-full h-32 p-4 border rounded-lg resize-none transition-all duration-200",
                  "bg-slate-50/50 dark:bg-slate-700/50 border-slate-200/50 dark:border-slate-600/50",
                  "text-slate-900 dark:text-white",
                  "font-mono text-sm leading-relaxed"
                )}
              />
              <button
                onClick={() => handleCopy(decodedText, "decoded")}
                className="absolute top-2 right-2 p-2 rounded-lg bg-slate-200/50 dark:bg-slate-600/50 text-slate-600 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-slate-500/50 transition-colors"
                title="Copy decoded text"
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
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-green-50/50 dark:bg-green-900/20 rounded-lg border border-green-200/50 dark:border-green-800/50">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div className="text-sm text-green-800 dark:text-green-200">
            <p className="font-medium mb-1">How decoding works:</p>
            <p>
              Provide tokens as a JSON array (e.g., [72, 101, 108, 108, 111]) or
              comma-separated values. The decoder will convert them back to
              readable text.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
