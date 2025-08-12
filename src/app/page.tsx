"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import {
  TokenizerInput,
  TokenizerOutput,
  EnhancedTokenizerOutput,
  ThemeToggle,
  Header,
  TokenDecoder,
  Footer,
  Button,
} from "@/components";
import { smartTokenizer, TokenInfo } from "@/lib/tokenizer";
import toast from "react-hot-toast";
import { Copy, Sparkles, Code } from "lucide-react";

export default function Home() {
  const { currentTheme } = useTheme();
  const [inputText, setInputText] = useState(
    "Hello, there! how are u doing? are you ready Understand how AI models process and encode your content and give it a try!"
  );
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [tokenIds, setTokenIds] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [vocabularySize, setVocabularySize] = useState(0);

  const handleTokenize = async (text: string) => {
    if (!text.trim()) return;

    setIsProcessing(true);
    setInputText(text);

    try {
      // Use smart tokenizer
      const result = smartTokenizer.tokenize(text);
      setTokens(result.tokens);
      setTokenIds(result.tokenIds);
      setVocabularySize(result.vocabulary.size);
    } catch (error) {
      console.error("Tokenization error:", error);
      toast.error("Failed to tokenize text. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Auto-tokenize on input change
  useEffect(() => {
    if (inputText.trim()) {
      try {
        const result = smartTokenizer.tokenize(inputText);
        setTokens(result.tokens);
        setTokenIds(result.tokenIds);
        setVocabularySize(result.vocabulary.size);
      } catch (error) {
        console.error("Auto-tokenization error:", error);
        // Don't show toast for auto-tokenization errors
      }
    }
  }, [inputText]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/50 dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 transition-all duration-500 backdrop-blur-sm">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-pulse flex items-center justify-center gap-4">
            <Sparkles className="w-12 h-12 text-purple-500 animate-pulse" />
            AI Tokenizer
            <Sparkles className="w-12 h-12 text-pink-500 animate-pulse" />
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6">
            Transform your text into AI-understandable tokens with advanced
            tokenization
          </p>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => {
                navigator.clipboard
                  .writeText(
                    "Hello, there! how are u doing? are you ready Understand how AI models process and encode your content and give it a try!"
                  )
                  .then(() => {
                    toast.success("Sample text copied to clipboard!");
                  })
                  .catch(() => {
                    toast.error("Failed to copy to clipboard");
                  });
              }}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-blue-100/50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-200/50 dark:hover:bg-blue-800/40 flex items-center gap-2 hover:scale-105"
            >
              <Copy className="w-4 h-4" />
              Copy Sample Text
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-12">
          <div className="space-y-6">
            <TokenizerInput
              onTokenize={handleTokenize}
              isProcessing={isProcessing}
            />

            {/* Encoded Section moved to left */}
            <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-500" />
                  Encoded Sequence
                </h3>
                <Button
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
                  variant="glass"
                  size="sm"
                  disabled={tokenIds.length === 0}
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
              </div>
              <div className="bg-slate-50/50 dark:bg-slate-700/50 rounded-lg p-4">
                <div className="font-mono text-sm text-slate-800 dark:text-slate-200 break-all">
                  {tokenIds.length > 0
                    ? `[${tokenIds.join(", ")}]`
                    : "No tokens to encode yet..."}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <EnhancedTokenizerOutput
              tokens={tokens}
              tokenIds={tokenIds}
              inputText={inputText}
              isProcessing={isProcessing}
              vocabularySize={vocabularySize}
            />
          </div>
        </div>

        {/* Token Decoder Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-center gap-3">
              <Code className="w-8 h-8 text-blue-500" />
              Token Decoder
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Convert your token arrays back to readable text. Perfect for
              testing and verification.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <TokenDecoder />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
