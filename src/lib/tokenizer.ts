export interface TokenInfo {
  text: string;
  id: number;
  start: number;
  end: number;
  type: 'word' | 'number' | 'punctuation' | 'whitespace' | 'unknown';
  frequency: number;
}

export interface TokenizationResult {
  tokens: TokenInfo[];
  tokenIds: number[];
  vocabulary: Map<string, number>;
  reverseVocab: Map<number, string>;
  stats: {
    totalTokens: number;
    uniqueTokens: number;
    wordTokens: number;
    numberTokens: number;
    punctuationTokens: number;
    whitespaceTokens: number;
    unknownTokens: number;
  };
}

// Common vocabulary tokens for better tokenization
const COMMON_TOKENS = [
  // Common words
  "Hello", "world", "the", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by",
  "Let", "tokenize", "this", "text", "a", "an", "is", "are", "was", "were", "be", "been",
  "have", "has", "had", "do", "does", "did", "will", "would", "could", "should", "can", "may",
  "might", "must", "shall", "ought", "Chai", "Coffee", "Price", "INR",
  
  // Punctuation
  ":", ".", "!", "?", ",", ";", "(", ")", "[", "]", "{", "}", '"', "'", "-", "_", "+", "=",
  
  // Numbers
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  
  // Whitespace
  " ", "\n", "\t",
  
  // Common patterns
  "'s", "199", "99"
];

export class SmartTokenizer {
  private vocabulary: Map<string, number>;
  private reverseVocab: Map<number, string>;
  private tokenFrequency: Map<string, number>;

  constructor() {
    this.vocabulary = new Map();
    this.reverseVocab = new Map();
    this.tokenFrequency = new Map();
    
    // Initialize with common tokens
    COMMON_TOKENS.forEach((token, index) => {
      this.vocabulary.set(token, index);
      this.reverseVocab.set(index, token);
      this.tokenFrequency.set(token, 0);
    });
  }

  private getTokenType(token: string): TokenInfo['type'] {
    if (token.match(/^\d+$/)) return 'number';
    if (token.match(/^[.,:;!?()[\]{}'"]/)) return 'punctuation';
    if (token === ' ' || token === '\n' || token === '\t') return 'whitespace';
    if (token.match(/^[a-zA-Z]+$/)) return 'word';
    return 'unknown';
  }

  private findLongestMatch(text: string, startIndex: number): { token: string; length: number } | null {
    const maxLength = Math.min(20, text.length - startIndex);
    
    for (let len = maxLength; len > 0; len--) {
      const substr = text.substring(startIndex, startIndex + len);
      if (this.vocabulary.has(substr)) {
        return { token: substr, length: len };
      }
    }
    
    return null;
  }

  tokenize(text: string): TokenizationResult {
    const tokens: TokenInfo[] = [];
    const tokenIds: number[] = [];
    let currentIndex = 0;

    while (currentIndex < text.length) {
      const match = this.findLongestMatch(text, currentIndex);
      
      if (match) {
        // Found a known token
        const tokenId = this.vocabulary.get(match.token)!;
        const tokenType = this.getTokenType(match.token);
        
        tokens.push({
          text: match.token,
          id: tokenId,
          start: currentIndex,
          end: currentIndex + match.length,
          type: tokenType,
          frequency: (this.tokenFrequency.get(match.token) || 0) + 1
        });
        
        tokenIds.push(tokenId);
        this.tokenFrequency.set(match.token, (this.tokenFrequency.get(match.token) || 0) + 1);
        currentIndex += match.length;
      } else {
        // Unknown character - treat as individual token
        const char = text[currentIndex];
        const tokenId = this.vocabulary.size + char.charCodeAt(0);
        const tokenType = this.getTokenType(char);
        
        tokens.push({
          text: char,
          id: tokenId,
          start: currentIndex,
          end: currentIndex + 1,
          type: tokenType,
          frequency: 1
        });
        
        tokenIds.push(tokenId);
        currentIndex++;
      }
    }

    // Calculate statistics
    const stats = this.calculateStats(tokens);

    return {
      tokens,
      tokenIds,
      vocabulary: this.vocabulary,
      reverseVocab: this.reverseVocab,
      stats
    };
  }

  private calculateStats(tokens: TokenInfo[]) {
    const typeCounts = {
      word: 0,
      number: 0,
      punctuation: 0,
      whitespace: 0,
      unknown: 0
    };

    tokens.forEach(token => {
      typeCounts[token.type]++;
    });

    return {
      totalTokens: tokens.length,
      uniqueTokens: new Set(tokens.map(t => t.text)).size,
      ...typeCounts
    };
  }

  decode(tokenIds: number[]): string {
    return tokenIds
      .map(id => {
        if (this.reverseVocab.has(id)) {
          return this.reverseVocab.get(id)!;
        }
        // Handle unknown tokens
        return String.fromCharCode(id - this.vocabulary.size);
      })
      .join('');
  }

  getVocabularySize(): number {
    return this.vocabulary.size;
  }

  getTokenFrequency(token: string): number {
    return this.tokenFrequency.get(token) || 0;
  }

  addCustomToken(token: string): void {
    if (!this.vocabulary.has(token)) {
      const newId = this.vocabulary.size;
      this.vocabulary.set(token, newId);
      this.reverseVocab.set(newId, token);
      this.tokenFrequency.set(token, 0);
    }
  }
}

// Export singleton instance
export const smartTokenizer = new SmartTokenizer();
