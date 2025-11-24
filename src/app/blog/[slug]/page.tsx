import React from "react";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/queries/get-post-by-slug-payload";
import { getPosts } from "@/lib/queries/get-posts-payload";
import { generateMeta } from "@/lib/utils/generateMeta";
import { PostHero } from "@/components/blog/PostHero";
import RichText from "@/components/blog/RichText";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import PageClient from "@/components/blog/PageClient";
import type { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Force dynamic rendering on each request for instant updates
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const dynamicParams = true; // Allow dynamic routes that weren't pre-generated

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return generateMeta({ post });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug);
  const post = await getPostBySlug(decodedSlug);

  if (!post) {
    notFound();
  }

  // Fetch related posts if available
  let relatedPosts: typeof post[] = [];
  if (post.relatedPosts && post.relatedPosts.length > 0) {
    // If relatedPosts are already populated, use them
    relatedPosts = post.relatedPosts;
  }

  return (
    <div className="min-h-screen bg-background">
      <PageClient />

      <PostHero post={post} />

      <div className="flex flex-col items-center gap-4 pt-8 pb-16">
        <div className="container">
          <RichText className="max-w-[48rem] mx-auto" data={post.content} enableGutter={false} />
          {relatedPosts && relatedPosts.length > 0 && (
            <RelatedPosts
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              posts={relatedPosts}
            />
          )}
        </div>
      </div>
    </div>
  );
}