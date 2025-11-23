// lib/queries/get-posts.ts
import { graphqlClient } from "../graphql-client";

const GET_POSTS = `
  query GetPosts($first: Int = 20) {
    posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        databaseId
        title
        slug
        date
        excerpt
        content
        author {
          node {
            name
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

export interface WordPressPost {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  author: {
    node: {
      name: string;
      slug: string;
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
}

export async function getPosts(first: number = 20): Promise<WordPressPost[]> {
  try {
    const data = await graphqlClient.request<{ posts: { nodes: WordPressPost[] } }>(GET_POSTS, { first });
    return data.posts.nodes;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}
