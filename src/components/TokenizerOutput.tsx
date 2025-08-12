"use client";

import { cn } from "@lib/utils";
import toast from "react-hot-toast";
import { Token } from "types/Tokens";

interface TokenizerOutputProps {
  tokens: Token[];
  inputText: string;
  isProcessing: boolean;
}

export const TokenizerOutput: React.FC<TokenizerOutputProps> = ({
  tokens,
  inputText,
  isProcessing,
}) => {
  if (isProcessing) {
    return (
      <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
          Tokenization Results
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
          Tokenization Results
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
              Enter some text on the left to see the tokenization results here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const totalTokens = tokens.length;
  const uniqueTokens = new Set(tokens.map(t => t.text)).size;

  const handleCopyTokens = () => {
    const tokenArray = tokens.map(t => t.value);
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

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Tokenization Results
        </h2>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          {totalTokens} tokens
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-50/50 dark:bg-slate-700/50 rounded-lg p-4 text-center relative">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {totalTokens}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Total Tokens
          </div>
          <button
            onClick={handleCopyTokens}
            className="absolute top-2 right-2 p-1.5 rounded bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200/50 dark:hover:bg-blue-800/40 transition-colors"
            title="Copy token array"
          >
            <svg
              className="w-3.5 h-3.5"
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
        <div className="bg-slate-50/50 dark:bg-slate-700/50 rounded-lg p-4 text-center relative">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {uniqueTokens}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Unique Tokens
          </div>
          <button
            onClick={handleCopyText}
            className="absolute top-2 right-2 p-1.5 rounded bg-purple-100/50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200/50 dark:hover:bg-purple-800/40 transition-colors"
            title="Copy input text"
          >
            <svg
              className="w-3.5 h-3.5"
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

      {/* Token Visualization */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-3">
          Token Breakdown
        </h3>
        <div className="bg-slate-50/50 dark:bg-slate-700/50 rounded-lg p-4">
          <div className="flex flex-wrap gap-1">
            {tokens.map((token, index) => (
              <div
                key={`${token.id}-${index}`}
                className={cn(
                  "px-2 py-1 rounded text-xs font-mono border transition-all duration-200",
                  "hover:scale-105 cursor-pointer",
                  index % 2 === 0
                    ? "bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200"
                    : "bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700 text-purple-800 dark:text-purple-200"
                )}
                title={`Token ${index + 1}: "${token.text}" (Value: ${token.value})`}
              >
                {token.text === " " ? "␣" : token.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Token List */}
      <div>
        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-3">
          Detailed Analysis
        </h3>
        <div className="bg-slate-50/50 dark:bg-slate-700/50 rounded-lg overflow-hidden">
          <div className="max-h-64 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-slate-200/50 dark:bg-slate-600/50 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300">
                    #
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300">
                    Token
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300">
                    Position
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((token, index) => (
                  <tr
                    key={`${token.id}-${index}`}
                    className="border-b border-slate-200/50 dark:border-slate-600/50 hover:bg-slate-100/50 dark:hover:bg-slate-600/30"
                  >
                    <td className="px-4 py-2 text-xs text-slate-600 dark:text-slate-400 font-mono">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 text-sm font-mono">
                      <span className="bg-white/50 dark:bg-slate-800/50 px-2 py-1 rounded border border-slate-200/50 dark:border-slate-600/50">
                        {token.text === " " ? "␣" : token.text}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-xs text-slate-600 dark:text-slate-400 font-mono">
                      {token.start}-{token.end}
                    </td>
                    <td className="px-4 py-2 text-xs text-slate-600 dark:text-slate-400 font-mono">
                      {token.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
