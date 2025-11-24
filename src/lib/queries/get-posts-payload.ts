// lib/queries/get-posts-payload.ts
// Functions to fetch posts from Payload CMS and map to expected format

import { fetchPosts, type PayloadPost } from "../payload-client";

// Map Payload post to WordPress-like format for compatibility
export interface BlogPost {
  id: string;
  databaseId: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  author: {
    node: {
      id: string;
      databaseId: string;
      name: string;
      nickname?: string | null;
      slug: string;
      jobDescription?: string | null;
      avatar?: {
        url: string;
      } | null;
      r2ProfilePicture?: string | null;
    };
  };
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails: {
        width: number;
        height: number;
      };
    } | null;
  };
  categories: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
  tags?: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
  seo?: {
    title: string;
    metaDesc: string;
    opengraphTitle: string;
    opengraphDescription: string;
    opengraphImage: {
      sourceUrl: string;
    } | null;
  };
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: {
      sourceUrl: string;
    } | null;
  };
  relatedPosts?: BlogPost[];
}

/**
 * Converts Lexical editor content to plain text for excerpt
 */
function lexicalToText(lexicalContent: any): string {
  if (!lexicalContent) return "";
  
  try {
    // Extract text from Lexical root children
    const extractText = (node: any): string => {
      if (typeof node === "string") return node;
      if (!node || typeof node !== "object") return "";
      
      let text = "";
      
      if (node.text) {
        text += node.text;
      }
      
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
    content: JSON.stringify(payloadPost.content || {}), // Store Lexical JSON for now
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
  };
}

/**
 * Fetches posts from Payload CMS
 */
export async function getPosts(limit: number = 20): Promise<BlogPost[]> {
  try {
    const payloadPosts = await fetchPosts(limit);
    return payloadPosts.map(mapPayloadPostToBlogPost);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

// Export WordPressPost type alias for compatibility
export type WordPressPost = BlogPost;

