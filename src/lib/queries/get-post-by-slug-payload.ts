// lib/queries/get-post-by-slug-payload.ts
// Function to fetch a single post by slug from Payload CMS

import { fetchPostBySlug, type PayloadPost } from "../payload-client";
import type { BlogPost } from "./get-posts-payload";

/**
 * Converts Lexical editor content to plain text for excerpt
 */
function lexicalToText(lexicalContent: any): string {
  if (!lexicalContent) return "";
  
  try {
    const extractText = (node: any): string => {
      if (typeof node === "string") return node;
      if (!node || typeof node !== "object") return "";
      
      let text = "";
      if (node.text) text += node.text;
      if (node.children && Array.isArray(node.children)) {
        text += node.children.map(extractText).join("");
      }
      return text;
    };
    
    if (lexicalContent.root && lexicalContent.root.children) {
      return lexicalContent.root.children.map(extractText).join(" ").trim();
    }
    return "";
  } catch (error) {
    console.error("Error extracting text from Lexical content:", error);
    return "";
  }
}

/**
 * Converts Payload post to BlogPost format
 */
function mapPayloadPostToBlogPost(payloadPost: PayloadPost): BlogPost {
  // Get first author or use default
  const firstAuthor = payloadPost.populatedAuthors?.[0] || payloadPost.authors?.[0];
  const authorName = firstAuthor?.name || "Unknown Author";
  
  // Extract excerpt from content (first 200 chars)
  const lexicalToText = (lexicalContent: any): string => {
    if (!lexicalContent) return "";
    
    try {
      const extractText = (node: any): string => {
        if (typeof node === "string") return node;
        if (!node || typeof node !== "object") return "";
        
        let text = "";
        if (node.text) text += node.text;
        if (node.children && Array.isArray(node.children)) {
          text += node.children.map(extractText).join("");
        }
        return text;
      };
      
      if (lexicalContent.root && lexicalContent.root.children) {
        return lexicalContent.root.children.map(extractText).join(" ").trim();
      }
      return "";
    } catch (error) {
      console.error("Error extracting text from Lexical content:", error);
      return "";
    }
  };
  
  const contentText = lexicalToText(payloadPost.content);
  const excerpt = contentText.substring(0, 200) + (contentText.length > 200 ? "..." : "");
  
  // Get featured image URL - handle both relative and absolute URLs
  const heroImageUrl = payloadPost.heroImage?.url || "";
  const heroImageAlt = payloadPost.heroImage?.alt || payloadPost.title;
  
  // Helper to convert relative URLs to absolute
  const getAbsoluteUrl = (url: string): string => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    // Remove trailing slash from base URL if present
    const baseUrl = (process.env.NEXT_PUBLIC_PAYLOAD_API_URL || "").replace(/\/$/, "");
    return `${baseUrl}${url.startsWith("/") ? url : `/${url}`}`;
  };
  
  // Map categories
  const categories = payloadPost.categories || [];
  
  return {
    id: payloadPost.id.toString(),
    databaseId: payloadPost.id.toString(),
    title: payloadPost.title,
    slug: payloadPost.slug,
    date: payloadPost.publishedAt || payloadPost.createdAt,
    excerpt,
    content: JSON.stringify(payloadPost.content || {}),
    author: {
      node: {
        id: firstAuthor?.id?.toString() || "",
        databaseId: firstAuthor?.id?.toString() || "",
        name: authorName,
        nickname: authorName,
        slug: firstAuthor?.id?.toString() || "",
        jobDescription: null,
        avatar: null,
        r2ProfilePicture: null,
      },
    },
    featuredImage: {
      node: heroImageUrl
        ? {
            sourceUrl: getAbsoluteUrl(heroImageUrl),
            altText: heroImageAlt,
            mediaDetails: {
              width: payloadPost.heroImage?.width || 1200,
              height: payloadPost.heroImage?.height || 630,
            },
          }
        : null,
    },
    categories: {
      nodes: categories.map((cat) => ({
        name: typeof cat === "object" ? cat.title || cat.slug : cat,
        slug: typeof cat === "object" ? cat.slug : cat,
      })),
    },
    seo: payloadPost.meta
      ? {
          title: payloadPost.meta.title || payloadPost.title,
          metaDesc: payloadPost.meta.description || excerpt,
          opengraphTitle: payloadPost.meta.title || payloadPost.title,
          opengraphDescription: payloadPost.meta.description || excerpt,
          opengraphImage: payloadPost.meta.image
            ? {
                sourceUrl: getAbsoluteUrl(payloadPost.meta.image.url),
              }
            : null,
        }
      : undefined,
    meta: payloadPost.meta
      ? {
          title: payloadPost.meta.title || null,
          description: payloadPost.meta.description || null,
          image: payloadPost.meta.image
            ? {
                sourceUrl: getAbsoluteUrl(payloadPost.meta.image.url),
              }
            : null,
        }
      : undefined,
    // Note: relatedPosts might be IDs or full objects depending on depth
    // For now, we'll handle it when rendering
    relatedPosts: undefined, // Will be populated separately if needed
  };
}

/**
 * Fetches a single post by slug from Payload CMS
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const payloadPost = await fetchPostBySlug(slug);
    if (!payloadPost) return null;
    return mapPayloadPostToBlogPost(payloadPost);
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

// Export SinglePost type for compatibility
export interface SinglePost extends BlogPost {
  tags?: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
}

