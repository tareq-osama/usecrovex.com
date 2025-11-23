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
          id
          databaseId
          name
          nickname
          slug
          jobDescription
          avatar {
            url
          }
          r2ProfilePicture
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
      id: string;
      databaseId: number;
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
}

export async function getPostBySlug(slug: string): Promise<SinglePost | null> {
  try {
    const data = await graphqlClient.request<{ postBy: SinglePost | null }>(GET_POST_BY_SLUG, { slug });
    
    // Debug: Log the raw author data from GraphQL
    if (process.env.NODE_ENV === 'development' && data.postBy) {
      console.log('=== POST QUERY AUTHOR DATA ===');
      console.log('Full author node:', JSON.stringify(data.postBy.author.node, null, 2));
      console.log('r2ProfilePicture from post query:', data.postBy.author.node.r2ProfilePicture);
      console.log('avatar.url from post query:', data.postBy.author.node.avatar?.url);
      console.log('author ID:', data.postBy.author.node.id);
      console.log('author databaseId:', data.postBy.author.node.databaseId);
    }
    
    return data.postBy;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

