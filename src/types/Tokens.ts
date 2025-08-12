export interface TokenizerResult {
  input: string;
  tokens: Token[];
  totalTokens: number;
  encoding: string;
}

export interface Token {
  id: number;
  text: string;
  start: number;
  end: number;
  value: number;
  type: 'word' | 'number' | 'punctuation' | 'whitespace' | 'unknown';
  frequency: number;
}

export interface Theme {
  name: string;
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  accent: string;
}

export interface TokenizerConfig {
  model: string;
  maxTokens: number;
  temperature: number;
}

export type ThemeMode = "light" | "dark";
