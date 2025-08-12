"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { TokenInfo } from "@/lib/tokenizer";
import {
  getTokenColor,
  getTokenDisplayText,
  getTypeColor,
} from "@/lib/tokenColors";
import toast from "react-hot-toast";
import { Copy, BarChart3, Hash, FileText, List, Code } from "lucide-react";
import { Button } from "./ui/button";

interface EnhancedTokenizerOutputProps {
  tokens: TokenInfo[];
  tokenIds: number[];
  inputText: string;
  isProcessing: boolean;
  vocabularySize: number;
}

export const EnhancedTokenizerOutput: React.FC<
  EnhancedTokenizerOutputProps
> = ({ tokens, tokenIds, inputText, isProcessing, vocabularySize }) => {
  const { currentTheme } = useTheme();

  if (isProcessing) {
    return (
      <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
          Enhanced Tokenization Results
        </h2>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400">
              Processing your text...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!inputText) {
    return (
      <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
          Enhanced Tokenization Results
        </h2>
        <div className="flex items-center justify-center h-64">
          <div className="text-center text-slate-500 dark:text-slate-400">
            <svg
              className="w-16 h-16 mx-auto mb-4 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-lg font-medium mb-2">No text to tokenize</p>
            <p className="text-sm">
              Enter some text on the left to see the enhanced tokenization
              results here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (tokens.length === 0) {
    return (
      <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
          Enhanced Tokenization Results
        </h2>
        <div className="flex items-center justify-center h-64">
          <div className="text-center text-slate-500 dark:text-slate-400">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">Processing...</p>
            <p className="text-sm">Tokenizing your text...</p>
          </div>
        </div>
      </div>
    );
  }

  const totalTokens = tokens.length;
  const uniqueTokens = new Set(tokens.map(t => t.text)).size;

  const handleCopyTokens = () => {
    const tokenArray = tokenIds;
    navigator.clipboard
      .writeText(JSON.stringify(tokenArray))
      .then(() => {
        toast.success("Token array copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy to clipboard");
      });
  };

  const handleCopyText = () => {
    navigator.clipboard
      .writeText(inputText)
      .then(() => {
        toast.success("Input text copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy to clipboard");
      });
  };

  const handleCopyMapping = () => {
    const mapping = tokens.map(t => `"${t.text}" → ${t.id}`).join("\n");
    navigator.clipboard
      .writeText(mapping)
      .then(() => {
        toast.success("Token mapping copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy to clipboard");
      });
  };

  return (
    <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Enhanced Tokenization Results
        </h2>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          {totalTokens} tokens • Vocab: {vocabularySize}
        </div>
      </div>

      {/* Enhanced Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-50/50 dark:bg-slate-700/50 rounded-lg p-4 text-center relative">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {totalTokens}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Total Tokens
          </div>
          <Button
            onClick={handleCopyTokens}
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200/50 dark:hover:bg-blue-800/40"
            title="Copy token array"
          >
            <Copy className="w-3.5 h-3.5" />
          </Button>
        </div>

        <div className="bg-slate-50/50 dark:bg-slate-700/50 rounded-lg p-4 text-center relative">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {uniqueTokens}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Unique Tokens
          </div>
          <Button
            onClick={handleCopyText}
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 bg-purple-100/50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200/50 dark:hover:bg-purple-800/40"
            title="Copy input text"
          >

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            <Copy className="w-3.5 h-3.5" />
          </Button>
        </div>

        <div className="bg-slate-50/50 dark:bg-slate-700/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {tokens.filter(t => t.type === "word").length}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Words
          </div>
        </div>

        <div className="bg-slate-50/50 dark:bg-slate-700/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
            {tokens.filter(t => t.type === "number").length}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Numbers
          </div>
        </div>
      </div>

      {/* Token Visualization */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">
            Token Visualization ({tokens.length} tokens)
          </h3>
          <button
            onClick={handleCopyMapping}
            className="px-3 py-1.5 text-xs bg-slate-200/50 dark:bg-slate-600/50 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-300/50 dark:hover:bg-slate-500/50 transition-colors"
          >
            Copy Mapping
          </button>
        </div>
        <div className="bg-slate-50/50 dark:bg-slate-700/50 rounded-lg p-4">
          <div className="flex flex-wrap gap-1">
            {tokens.map((token, index) => (
              <div
                key={`${token.id}-${index}`}
                className={cn(
                  "px-2 py-1 rounded text-xs font-mono border transition-all duration-200 cursor-pointer hover:scale-105",
                  getTokenColor(token, index)
                )}
                title={`Token: "${token.text}" | ID: ${token.id} | Type: ${token.type} | Freq: ${token.frequency}`}
              >
                {getTokenDisplayText(token)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Token Type Legend */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-3">
          Token Type Legend
        </h3>
        <div className="flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <div className={cn("w-3 h-3 rounded", getTypeColor("word"))}></div>
            Words
          </div>
          <div className="flex items-center gap-2">
            <div
              className={cn("w-3 h-3 rounded", getTypeColor("number"))}
            ></div>
            Numbers
          </div>
          <div className="flex items-center gap-2">
            <div
              className={cn("w-3 h-3 rounded", getTypeColor("punctuation"))}
            ></div>
            Punctuation
          </div>
          <div className="flex items-center gap-2">
            <div
              className={cn("w-3 h-3 rounded", getTypeColor("whitespace"))}
            ></div>
            Whitespace
          </div>
          <div className="flex items-center gap-2">
            <div
              className={cn("w-3 h-3 rounded", getTypeColor("unknown"))}
            ></div>
            Unknown
          </div>
        </div>
      </div>

      {/* Token → ID Mapping */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">
            Token → ID Mapping
          </h3>
          <button
            onClick={() => {
              const mapping = tokens
                .map(t => `"${t.text}" → ${t.id}`)
                .join("\n");
              navigator.clipboard
                .writeText(mapping)
                .then(() => {
                  toast.success("Token mapping copied to clipboard!");
                })
                .catch(() => {
                  toast.error("Failed to copy to clipboard");
                });
            }}
            className="px-3 py-1.5 text-xs bg-slate-200/50 dark:bg-slate-600/50 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-300/50 dark:hover:bg-slate-500/50 transition-colors"
          >
            Copy Mapping
          </button>
        </div>
        <div className="bg-slate-50/50 dark:bg-slate-700/50 rounded-lg p-4 max-h-48 overflow-y-auto">
          <div className="flex flex-wrap gap-1">
            {tokens.map((token, index) => (
              <div
                key={`${token.id}-${index}`}
                className="px-2 py-1 bg-white/50 dark:bg-slate-800/50 rounded text-xs font-mono border border-slate-200/50 dark:border-slate-600/50"
              >
                "{token.text}" → {token.id}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Encoded Sequence */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">
            Encoded Sequence
          </h3>
          <button
            onClick={() => {
              navigator.clipboard
                .writeText(`[${tokenIds.join(", ")}]`)
                .then(() => {
                  toast.success("Encoded sequence copied to clipboard!");
                })
                .catch(() => {
                  toast.error("Failed to copy to clipboard");
                });
            }}
            className="px-3 py-1.5 text-xs bg-slate-200/50 dark:bg-slate-600/50 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-300/50 dark:hover:bg-slate-500/50 transition-colors"
          >
            Copy Sequence
          </button>
        </div>
        <div className="bg-slate-50/50 dark:bg-slate-700/50 rounded-lg p-4">
          <div className="font-mono text-sm text-slate-800 dark:text-slate-200">
            [{tokenIds.join(", ")}]
          </div>
        </div>
      </div>
    </div>
  );
};
