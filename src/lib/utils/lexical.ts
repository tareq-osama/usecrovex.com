// lib/utils/lexical.ts
// Utilities for working with Lexical editor content

/**
 * Extracts plain text from Lexical editor content for reading time calculation
 */
export function lexicalToText(lexicalContent: any): string {
  if (!lexicalContent) return "";
  
  try {
    // If content is a string (JSON), parse it
    const parsed = typeof lexicalContent === "string" 
      ? JSON.parse(lexicalContent) 
      : lexicalContent;
    
    if (!parsed.root || !parsed.root.children) return "";
    
    const extractText = (node: any): string => {
      if (typeof node === "string") return node;
      if (!node || typeof node !== "object") return "";
      
      let text = "";
      
      if (node.text) {
        text += node.text;
      }
      
      if (node.children && Array.isArray(node.children)) {
        text += node.children.map(extractText).join(" ");
      }
      
      return text;
    };
    
    return parsed.root.children.map(extractText).join(" ").trim();
  } catch (error) {
    console.error("Error extracting text from Lexical content:", error);
    return "";
  }
}

/**
 * Estimates reading time from Lexical content
 */
export function estimateReadingTimeFromLexical(lexicalContent: any): string {
  const wordsPerMinute = 200;
  const text = lexicalToText(lexicalContent);
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min read`;
}

