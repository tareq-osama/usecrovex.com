// components/blog/LexicalContent.tsx
// Simple component to render Lexical editor content as HTML

"use client";

import React from "react";

interface LexicalContentProps {
  content: string;
  className?: string;
}

/**
 * Converts Lexical JSON to HTML
 */
function lexicalToHtml(lexicalContent: any): string {
  if (!lexicalContent) return "";
  
  try {
    // If content is a string (JSON), parse it
    const parsed = typeof lexicalContent === "string" 
      ? JSON.parse(lexicalContent) 
      : lexicalContent;
    
    if (!parsed.root || !parsed.root.children) return "";
    
    const convertNode = (node: any): string => {
      if (!node || typeof node !== "object") return "";
      
      const { type, children, text, format, ...otherProps } = node;
      
      // Text node
      if (text !== undefined) {
        let html = text;
        
        // Apply formatting
        if (format) {
          if (format & 1) html = `<strong>${html}</strong>`; // Bold
          if (format & 2) html = `<em>${html}</em>`; // Italic
          if (format & 4) html = `<u>${html}</u>`; // Underline
        }
        
        return html;
      }
      
      // Element nodes
      if (children && Array.isArray(children)) {
        const childHtml = children.map(convertNode).join("");
        
        switch (type) {
          case "paragraph":
            return `<p>${childHtml}</p>`;
          case "heading":
            const level = otherProps.tag || "h2";
            return `<${level}>${childHtml}</${level}>`;
          case "list":
            const listTag = otherProps.listType === "number" ? "ol" : "ul";
            return `<${listTag}>${childHtml}</${listTag}>`;
          case "listitem":
            return `<li>${childHtml}</li>`;
          case "quote":
            return `<blockquote>${childHtml}</blockquote>`;
          case "code":
            return `<code>${childHtml}</code>`;
          case "link":
            const url = otherProps.url || otherProps.fields?.url || "#";
            return `<a href="${url}">${childHtml}</a>`;
          case "linebreak":
            return "<br />";
          case "horizontalrule":
            return "<hr />";
          default:
            return childHtml;
        }
      }
      
      return "";
    };
    
    return parsed.root.children.map(convertNode).join("");
  } catch (error) {
    console.error("Error converting Lexical to HTML:", error);
    return "";
  }
}

export function LexicalContent({ content, className = "" }: LexicalContentProps) {
  const html = lexicalToHtml(content);
  
  if (!html) {
    return <div className={className}>No content available</div>;
  }
  
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

