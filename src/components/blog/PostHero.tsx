// components/blog/PostHero.tsx
// PostHero component with card-based design

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils/date-formatter";
import { estimateReadingTimeFromLexical } from "@/lib/utils/lexical";
import { ImageWithSkeleton } from "@/components/blog/ImageWithSkeleton";
import type { BlogPost } from "@/lib/queries/get-posts-payload";

interface PostHeroProps {
  post: BlogPost;
}

export const PostHero: React.FC<PostHeroProps> = ({ post }) => {
  const { categories, featuredImage, author, date, title, content } = post;

  // Get author data
  const authorAvatar = author?.node?.avatar?.url || author?.node?.r2ProfilePicture || null;
  const authorName = author?.node?.nickname || author?.node?.name || "";

  // Get hero image URL
  const heroImageUrl = featuredImage?.node?.sourceUrl;
  const heroImageAlt = featuredImage?.node?.altText || title;

  return (
    <section className="w-full pt-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className={`relative overflow-hidden rounded-2xl ${
          heroImageUrl ? "bg-muted/50" : "bg-muted/30"
        }`}>
          {/* Hero Image with Gradient Overlay */}
          {heroImageUrl && (
            <div className="absolute inset-0 w-full ">
              <div className="relative w-full h-full">
                <ImageWithSkeleton
                  src={heroImageUrl}
                  alt={heroImageAlt}
                  fill
                  className="rounded-2xl"
                  priority
                  objectFit="cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 rounded-2xl z-10" />
            </div>
          )}

          {/* Content */}
          <div className={`relative ${heroImageUrl ? "pt-16 pb-16" : "pt-12 pb-12"} px-8 md:px-12 z-10`}>
            <div className="max-w-4xl mx-auto">
              {/* Back to Blog Button */}
              <Link href="/blog">
                <Button variant="ghost" size="sm" className={`mb-8 ${
                  heroImageUrl ? "text-white hover:text-white hover:bg-white/10" : ""
                }`}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Button>
              </Link>

              {/* Categories */}
              {categories.nodes.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {categories.nodes.map((category) => (
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
                heroImageUrl ? "text-white" : "text-foreground"
              }`}>
                {title}
              </h1>

              {/* Meta Information */}
              <div className={`flex flex-wrap items-center gap-6 text-sm mb-8 ${
                heroImageUrl ? "text-white/90" : "text-muted-foreground"
              }`}>
                {/* Author with Avatar */}
                <div className="flex items-center gap-2">
                  {authorAvatar ? (
                    <ImageWithSkeleton
                      src={authorAvatar}
                      alt={authorName}
                      width={20}
                      height={20}
                      className="rounded-full flex-shrink-0"
                      objectFit="cover"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-semibold text-xs">
                        {authorName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span>{authorName}</span>
                </div>

                {/* Date */}
                {date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(date)}</span>
                  </div>
                )}

                {/* Reading Time */}
                {content && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{estimateReadingTimeFromLexical(content)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

