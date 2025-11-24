// lib/utils/generateMeta.ts
// Generate metadata for blog posts matching Payload CMS template

import type { Metadata } from "next";
import type { BlogPost } from "@/lib/queries/get-posts-payload";

function getImageURL(imageUrl?: string | null): string {
  if (!imageUrl) {
    // Default OG image - you can replace this with your default image
    return process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`
      : "/og-image.png";
  }

  // If it's already a full URL, return it
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // Otherwise, prepend the site URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_PAYLOAD_API_URL || "";
  return `${baseUrl}${imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`}`;
}

export function generateMeta(args: { post: BlogPost | null }): Metadata {
  const { post } = args;

  if (!post) {
    return {
      title: "Post Not Found | Corvex Blog",
      description: "The requested post could not be found.",
    };
  }

  const ogImage = getImageURL(post.seo?.opengraphImage?.sourceUrl || post.featuredImage?.node?.sourceUrl);

  const title = post.seo?.title
    ? `${post.seo.title} | Corvex Blog`
    : post.meta?.title
    ? `${post.meta.title} | Corvex Blog`
    : `${post.title} | Corvex Blog`;

  const description = post.seo?.metaDesc || post.seo?.opengraphDescription || post.meta?.description || post.excerpt?.replace(/<[^>]*>/g, "").substring(0, 160) || "";

  return {
    title,
    description,
    openGraph: {
      title: post.seo?.opengraphTitle || post.title,
      description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.node.name],
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      url: `/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo?.opengraphTitle || post.title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

