import { TokenInfo } from './tokenizer';

export const getTokenColor = (token: TokenInfo, index: number) => {
  const baseColors = [
    "bg-blue-100/80 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-200/50 dark:border-blue-700/50",
    "bg-green-100/80 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200/50 dark:border-green-700/50",
    "bg-yellow-100/80 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border-yellow-200/50 dark:border-yellow-700/50",
    "bg-purple-100/80 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 border-purple-200/50 dark:border-purple-700/50",
    "bg-pink-100/80 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200 border-pink-200/50 dark:border-pink-700/50",
    "bg-indigo-100/80 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 border-indigo-200/50 dark:border-indigo-700/50",
    "bg-red-100/80 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-200/50 dark:border-red-700/50",
    "bg-orange-100/80 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 border-orange-200/50 dark:border-orange-700/50",
  ];

  // Type-based colors
  switch (token.type) {
    case 'number':
      return "bg-cyan-100/80 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 border-cyan-200/50 dark:border-cyan-700/50";
    case 'punctuation':
      return "bg-gray-100/80 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200 border-gray-200/50 dark:border-gray-700/50";
    case 'whitespace':
      return "bg-slate-100/80 dark:bg-slate-900/30 text-slate-800 dark:text-slate-200 border-slate-200/50 dark:border-slate-700/50";
    case 'word':
      return baseColors[index % baseColors.length];
    case 'unknown':
      return "bg-red-100/80 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-200/50 dark:border-red-700/50";
    default:
      return baseColors[index % baseColors.length];
  }
};

export const getTokenDisplayText = (token: TokenInfo): string => {
  switch (token.text) {
    case ' ':
      return '␣';
    case '\n':
      return '↵';
    case '\t':
      return '⇥';
    default:
      return token.text;
  }
};

export const getTypeColor = (type: TokenInfo['type']) => {
  switch (type) {
    case 'word':
      return 'bg-blue-100/80 dark:bg-blue-900/30';
    case 'number':
      return 'bg-cyan-100/80 dark:bg-cyan-900/30';
    case 'punctuation':
      return 'bg-gray-100/80 dark:bg-gray-900/30';
    case 'whitespace':
      return 'bg-slate-100/80 dark:bg-slate-900/30';
    case 'unknown':
      return 'bg-red-100/80 dark:bg-red-900/30';
    default:
      return 'bg-slate-100/80 dark:bg-slate-900/30';
  }
};
