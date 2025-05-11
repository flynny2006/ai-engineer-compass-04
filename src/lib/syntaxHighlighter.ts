
// A simple syntax highlighting service for the code editor

// Define token types
export type TokenType = 
  | 'keyword'
  | 'string'
  | 'comment'
  | 'number'
  | 'function'
  | 'tag'
  | 'attribute'
  | 'bracket'
  | 'operator'
  | 'variable'
  | 'property'
  | 'punctuation'
  | 'class'
  | 'text';

export interface Token {
  type: TokenType;
  content: string;
}

// HTML keywords and patterns
const HTML_PATTERNS = {
  tag: /<\/?[a-zA-Z][a-zA-Z0-9]*|>/g,
  attribute: /\s[a-zA-Z][a-zA-Z0-9-]*=/g,
  string: /"[^"]*"|'[^']*'/g,
  comment: /<!--[\s\S]*?-->/g,
};

// CSS keywords and patterns
const CSS_PATTERNS = {
  property: /[a-zA-Z-]+\s*:/g,
  value: /:\s*[^;}]+/g,
  selector: /[a-zA-Z0-9_.\-#:]+\s*{/g,  // Fixed: Changed order of characters in the range
  string: /"[^"]*"|'[^']*'/g,
  comment: /\/\*[\s\S]*?\*\//g,
  unit: /\b\d+(%|px|em|rem|vh|vw|pt|ex|cm|mm|in)\b/g,
};

// JavaScript keywords and patterns
const JS_KEYWORDS = [
  'async', 'await', 'break', 'case', 'catch', 'class', 'const', 'continue', 
  'debugger', 'default', 'delete', 'do', 'else', 'export', 'extends', 'false',
  'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'new', 'null',
  'return', 'super', 'switch', 'this', 'throw', 'true', 'try', 'typeof', 'var',
  'void', 'while', 'with', 'yield', 'let'
];

const JS_PATTERNS = {
  keyword: new RegExp(`\\b(${JS_KEYWORDS.join('|')})\\b`, 'g'),
  string: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/g,
  comment: /\/\/.*|\/\*[\s\S]*?\*\//g,
  number: /\b\d+(\.\d+)?\b/g,
  function: /\b[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*\()/g,
  operator: /[+\-*/%=<>!&|^~?:]+/g,
  punctuation: /[{}[\]();,.]/g,
};

// JSON patterns
const JSON_PATTERNS = {
  key: /"([^"]+)"(?=\s*:)/g,
  string: /"(?:[^"\\]|\\.)*"/g,
  number: /-?\b\d+(\.\d+)?\b/g,
  keyword: /\b(true|false|null)\b/g,
  punctuation: /[{}[\]:,]/g,
};

// TypeScript patterns (extends JavaScript)
const TS_PATTERNS = {
  ...JS_PATTERNS,
  keyword: new RegExp(`\\b(${[...JS_KEYWORDS, 'interface', 'type', 'namespace', 'enum', 'as', 'implements', 'readonly', 'private', 'protected', 'public', 'static'].join('|')})\\b`, 'g'),
  type: /\b[A-Z][a-zA-Z0-9_$]*\b/g,
};

// Color mapping for token types - ensure vibrant colors for all code types
const TOKEN_COLORS = {
  keyword: "#8B5CF6",    // Vivid Purple
  string: "#ea384c",     // Red
  comment: "#6B7280",    // Gray
  number: "#F97316",     // Bright Orange
  function: "#1EAEDB",   // Bright Blue
  tag: "#D946EF",        // Magenta Pink
  attribute: "#FEC6A1",  // Soft Orange
  selector: "#D946EF",   // Magenta Pink
  property: "#D946EF",   // Magenta Pink
  value: "#1EAEDB",      // Bright Blue
  unit: "#F97316",       // Bright Orange
  punctuation: "#D1D5DB", // Light Gray
  operator: "#FEF7CD",   // Soft Yellow
  type: "#F2FCE2",       // Soft Green
  class: "#F2FCE2",      // Soft Green
  variable: "#FDE1D3",   // Soft Peach
  bracket: "#D1D5DB",    // Light Gray
  text: "#ffffff",       // White
};

/**
 * A simple highlighting function for demo purposes
 * In a real implementation, you would want to use a proper tokenizer
 */
export function highlightCode(code: string, language: string): string {
  let highlightedCode = code;
  
  switch (language) {
    case 'html':
      // Apply HTML highlighting patterns
      highlightedCode = highlightedCode
        .replace(HTML_PATTERNS.comment, match => `<span class="comment" style="color:${TOKEN_COLORS.comment}">${match}</span>`)
        .replace(HTML_PATTERNS.tag, match => `<span class="tag" style="color:${TOKEN_COLORS.tag}">${match}</span>`)
        .replace(HTML_PATTERNS.attribute, match => `<span class="attribute" style="color:${TOKEN_COLORS.attribute}">${match}</span>`)
        .replace(HTML_PATTERNS.string, match => `<span class="string" style="color:${TOKEN_COLORS.string}">${match}</span>`);
      break;
      
    case 'css':
      // Apply CSS highlighting patterns
      highlightedCode = highlightedCode
        .replace(CSS_PATTERNS.comment, match => `<span class="comment" style="color:${TOKEN_COLORS.comment}">${match}</span>`)
        .replace(CSS_PATTERNS.selector, match => `<span class="selector" style="color:${TOKEN_COLORS.selector}">${match}</span>`)
        .replace(CSS_PATTERNS.property, match => `<span class="property" style="color:${TOKEN_COLORS.property}">${match}</span>`)
        .replace(CSS_PATTERNS.value, match => `<span class="value" style="color:${TOKEN_COLORS.value}">${match}</span>`)
        .replace(CSS_PATTERNS.unit, match => `<span class="number" style="color:${TOKEN_COLORS.number}">${match}</span>`)
        .replace(CSS_PATTERNS.string, match => `<span class="string" style="color:${TOKEN_COLORS.string}">${match}</span>`);
      break;
      
    case 'js':
      // Apply JavaScript highlighting patterns
      highlightedCode = highlightedCode
        .replace(JS_PATTERNS.comment, match => `<span class="comment" style="color:${TOKEN_COLORS.comment}">${match}</span>`)
        .replace(JS_PATTERNS.string, match => `<span class="string" style="color:${TOKEN_COLORS.string}">${match}</span>`)
        .replace(JS_PATTERNS.keyword, match => `<span class="keyword" style="color:${TOKEN_COLORS.keyword}">${match}</span>`)
        .replace(JS_PATTERNS.function, match => `<span class="function" style="color:${TOKEN_COLORS.function}">${match}</span>`)
        .replace(JS_PATTERNS.number, match => `<span class="number" style="color:${TOKEN_COLORS.number}">${match}</span>`)
        .replace(JS_PATTERNS.operator, match => `<span class="operator" style="color:${TOKEN_COLORS.operator}">${match}</span>`)
        .replace(JS_PATTERNS.punctuation, match => `<span class="punctuation" style="color:${TOKEN_COLORS.punctuation}">${match}</span>`);
      break;
      
    case 'json':
      // Apply JSON highlighting patterns
      highlightedCode = highlightedCode
        .replace(JSON_PATTERNS.key, match => `<span class="property" style="color:${TOKEN_COLORS.property}">${match}</span>`)
        .replace(JSON_PATTERNS.string, match => `<span class="string" style="color:${TOKEN_COLORS.string}">${match}</span>`)
        .replace(JSON_PATTERNS.number, match => `<span class="number" style="color:${TOKEN_COLORS.number}">${match}</span>`)
        .replace(JSON_PATTERNS.keyword, match => `<span class="keyword" style="color:${TOKEN_COLORS.keyword}">${match}</span>`)
        .replace(JSON_PATTERNS.punctuation, match => `<span class="punctuation" style="color:${TOKEN_COLORS.punctuation}">${match}</span>`);
      break;
      
    case 'ts':
      // Apply TypeScript highlighting patterns
      highlightedCode = highlightedCode
        .replace(TS_PATTERNS.comment, match => `<span class="comment" style="color:${TOKEN_COLORS.comment}">${match}</span>`)
        .replace(TS_PATTERNS.string, match => `<span class="string" style="color:${TOKEN_COLORS.string}">${match}</span>`)
        .replace(TS_PATTERNS.keyword, match => `<span class="keyword" style="color:${TOKEN_COLORS.keyword}">${match}</span>`)
        .replace(TS_PATTERNS.type, match => `<span class="class" style="color:${TOKEN_COLORS.class}">${match}</span>`)
        .replace(TS_PATTERNS.function, match => `<span class="function" style="color:${TOKEN_COLORS.function}">${match}</span>`)
        .replace(TS_PATTERNS.number, match => `<span class="number" style="color:${TOKEN_COLORS.number}">${match}</span>`)
        .replace(TS_PATTERNS.operator, match => `<span class="operator" style="color:${TOKEN_COLORS.operator}">${match}</span>`)
        .replace(TS_PATTERNS.punctuation, match => `<span class="punctuation" style="color:${TOKEN_COLORS.punctuation}">${match}</span>`);
      break;
  }
  
  return highlightedCode;
}
