// lib/queries/get-post-by-slug.ts
import { graphqlClient } from "../graphql-client";
import { WordPressPost } from "./get-posts";

const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
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
          avatar {
            url
          }
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
      tags {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

export interface SinglePost extends WordPressPost {
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
  author: {
    node: {
      name: string;
      slug: string;
      avatar?: {
        url: string;
      } | null;
    };
  };
}

export async function getPostBySlug(slug: string): Promise<SinglePost | null> {
  try {
    const data = await graphqlClient.request<{ postBy: SinglePost | null }>(GET_POST_BY_SLUG, { slug });
    return data.postBy;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

