// lib/payload-client.ts
// Client for fetching data from Payload CMS REST API

function getPayloadApiUrl(): string {
  const url = process.env.NEXT_PUBLIC_PAYLOAD_API_URL;
  if (!url) {
    console.error("NEXT_PUBLIC_PAYLOAD_API_URL is not defined in environment variables");
    throw new Error("NEXT_PUBLIC_PAYLOAD_API_URL is not defined in .env.local");
  }
  // Remove trailing slash if present
  const cleanUrl = url.replace(/\/$/, '');
  console.log('Using Payload API URL:', cleanUrl);
  return cleanUrl;
}

export interface PayloadPost {
  id: number | string;
  title: string;
  slug: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  heroImage?: {
    id: number | string;
    url: string;
    alt?: string | null;
    filename?: string;
    width?: number;
    height?: number;
  } | null;
  content?: any; // Lexical editor content
  categories?: Array<{
    id: number | string;
    title?: string;
    slug: string;
  }>;
  authors?: Array<{
    id: number | string;
    name: string;
    email?: string;
  }>;
  populatedAuthors?: Array<{
    id: number | string;
    name: string;
  }>;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: {
      id: number | string;
      url: string;
      alt?: string | null;
    } | null;
  };
  relatedPosts?: Array<{
    id: number | string;
    title: string;
    slug: string;
  }>;
  _status?: 'draft' | 'published';
}

export interface PayloadResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

/**
 * Fetches posts from Payload CMS API
 */
export async function fetchPosts(limit: number = 20): Promise<PayloadPost[]> {
  try {
    const baseUrl = getPayloadApiUrl();
    const apiUrl = `${baseUrl}/api/posts`;
    
    // Build query parameters - Payload uses nested object notation in query strings
    const params = new URLSearchParams();
    params.append('limit', limit.toString());
    params.append('depth', '2'); // Populate relationships
    params.append('where[_status][equals]', 'published'); // Only published posts
    params.append('sort', '-publishedAt'); // Sort by published date descending
    
    const fullUrl = `${apiUrl}?${params.toString()}`;
    console.log('Fetching posts from:', fullUrl);

    const response = await fetch(fullUrl, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
      headers: {
        'Content-Type': 'application/json',
      },
      // Add cache control - use 'no-store' for development to see errors immediately
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Payload API error response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        url: fullUrl,
      });
      throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data: PayloadResponse<PayloadPost> = await response.json();
    console.log(`Successfully fetched ${data.docs.length} posts`);
    return data.docs;
  } catch (error) {
    console.error("Error fetching posts from Payload CMS");
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      if (error.stack) console.error("Error stack:", error.stack);
      if (error.cause) console.error("Error cause:", error.cause);
    } else {
      console.error("Unknown error type:", typeof error, error);
    }
    return [];
  }
}

/**
 * Fetches a single post by slug from Payload CMS API
 */
export async function fetchPostBySlug(slug: string): Promise<PayloadPost | null> {
  try {
    const baseUrl = getPayloadApiUrl();
    const apiUrl = `${baseUrl}/api/posts`;
    
    // Build query parameters
    const params = new URLSearchParams();
    params.append('where[slug][equals]', slug);
    params.append('where[_status][equals]', 'published');
    params.append('depth', '2'); // Populate relationships
    params.append('limit', '1');
    
    const fullUrl = `${apiUrl}?${params.toString()}`;
    console.log('Fetching post by slug from:', fullUrl);

    const response = await fetch(fullUrl, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // For development, use 'force-cache' in production
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Payload API error response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        url: fullUrl,
      });
      throw new Error(`Failed to fetch post: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data: PayloadResponse<PayloadPost> = await response.json();
    console.log(`Successfully fetched post: ${data.docs[0]?.title || 'not found'}`);
    return data.docs[0] || null;
  } catch (error) {
    console.error("Error fetching post by slug from Payload CMS");
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      if (error.stack) console.error("Error stack:", error.stack);
      if (error.cause) console.error("Error cause:", error.cause);
    } else {
      console.error("Unknown error type:", typeof error, error);
    }
    return null;
  }
}

