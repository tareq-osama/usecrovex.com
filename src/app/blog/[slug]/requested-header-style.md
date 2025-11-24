import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import { getPostBySlug } from "@/lib/queries/get-post-by-slug-payload";
import { getPosts } from "@/lib/queries/get-posts-payload";
// Removed getUserProfile - using Payload CMS author data directly
import { formatDate } from "@/lib/utils/date-formatter";
import { stripHtml } from "@/lib/utils";
import { estimateReadingTimeFromLexical } from "@/lib/utils/lexical";
import { LexicalContent } from "@/components/blog/LexicalContent";
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

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const title = post.seo?.opengraphTitle || post.title;
  const description = post.seo?.opengraphDescription || post.seo?.metaDesc || stripHtml(post.excerpt).substring(0, 160);
  const image = post.seo?.opengraphImage?.sourceUrl || post.featuredImage?.node?.sourceUrl;

  return {
    title: `${title} | Corvex Blog`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.node.nickname || post.author.node.name],
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get author avatar from Payload CMS data
  const authorAvatar = post.author.node.avatar?.url || post.author.node.r2ProfilePicture || null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Featured Image */}
      <section className="w-full pt-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className={`relative overflow-hidden rounded-2xl ${
            post.featuredImage?.node ? "bg-muted/50" : "bg-muted/30"
          }`}>
            {post.featuredImage?.node && (
              <div className="absolute inset-0 w-full h-[500px]">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  fill
                  className="object-cover rounded-2xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 rounded-2xl" />
              </div>
            )}
            <div className={`relative ${post.featuredImage?.node ? "pt-16 pb-16" : "pt-12 pb-12"} px-8 md:px-12`}>
              <div className="max-w-4xl mx-auto">
                <Link href="/blog">
                  <Button variant="ghost" size="sm" className="mb-8">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                  </Button>
                </Link>

                {/* Categories */}
                {post.categories.nodes.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories.nodes.map((category) => (
                      <span
                        key={category.slug}
                        className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h1 className={`text-4xl md:text-5xl font-bold mb-6 [line-height:1.2] ${
                  post.featuredImage?.node ? "text-white" : "text-foreground"
                }`}>
                  {post.title}
                </h1>

                {/* Meta Information */}
                <div className={`flex flex-wrap items-center gap-6 text-sm mb-8 ${
                  post.featuredImage?.node ? "text-white/90" : "text-muted-foreground"
                }`}>
                  <div className="flex items-center gap-2">
                    <Image
                      src={authorAvatar || ""}
                      alt={post.author.node.nickname || post.author.node.name}
                      width={20}
                      height={20}
                      className="rounded-full object-cover"
                    />
                    <span>{post.author.node.nickname || post.author.node.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{estimateReadingTimeFromLexical(post.content)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="w-full py-16">
        <div className="max-w-4xl mx-auto px-6">
          <LexicalContent
            content={post.content}
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-foreground prose-headings:mt-8 prose-headings:mb-4 prose-headings:[line-height:1.2]
              prose-h1:text-4xl prose-h1:font-bold prose-h1:[line-height:1.2] prose-h1:mt-12 prose-h1:mb-6
              prose-h2:text-3xl prose-h2:font-bold prose-h2:[line-height:1.2] prose-h2:mt-10 prose-h2:mb-5
              prose-h3:text-2xl prose-h3:font-semibold prose-h3:[line-height:1.2] prose-h3:mt-8 prose-h3:mb-4
              prose-h4:text-xl prose-h4:font-semibold prose-h4:[line-height:1.2] prose-h4:mt-6 prose-h4:mb-3
              prose-h5:text-lg prose-h5:font-semibold prose-h5:[line-height:1.2] prose-h5:mt-4 prose-h5:mb-2
              prose-h6:text-base prose-h6:font-semibold prose-h6:[line-height:1.2] prose-h6:mt-4 prose-h6:mb-2
              prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-muted prose-pre:text-foreground
              prose-img:rounded-lg prose-img:shadow-lg
              prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-2 prose-blockquote:px-4
              prose-ul:list-disc prose-ol:list-decimal
              prose-li:text-foreground/90
              prose-hr:border-border"
          />

          {/* Tags */}
          {post.tags && post.tags.nodes.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.nodes.map((tag) => (
                  <span
                    key={tag.slug}
                    className="text-xs font-medium bg-muted text-foreground px-3 py-1 rounded-full"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Card */}
          <Card className="mt-12 border-border/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {authorAvatar ? (
                  <Image
                    src={authorAvatar}
                    alt={post.author.node.nickname || post.author.node.name}
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-semibold text-lg">
                      {(post.author.node.nickname || post.author.node.name).charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-foreground [line-height:1.2] mb-1">
                    {post.author.node.nickname || post.author.node.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {post.author.node.jobDescription || ""}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="mt-12 pt-8">
            <Link href="/blog">
              <Button variant="outline" className="w-full sm:w-auto">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}