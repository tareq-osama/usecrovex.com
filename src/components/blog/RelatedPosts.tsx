// components/blog/RelatedPosts.tsx
// RelatedPosts component matching Payload CMS template

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ImageWithSkeleton } from "@/components/blog/ImageWithSkeleton";
import type { BlogPost } from "@/lib/queries/get-posts-payload";

interface RelatedPostsProps {
  className?: string;
  posts?: BlogPost[];
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ className, posts }) => {
  if (!posts || posts.length === 0) return null;

  return (
    <div className={cn("lg:container", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
        {posts.map((post) => (
          <article
            key={post.id}
            className="border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer hover:border-primary/50 transition-colors"
          >
            <div className="relative w-full aspect-video">
              {post.featuredImage?.node ? (
                <ImageWithSkeleton
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  fill
                  className=""
                  sizes="(max-width: 768px) 100vw, 50vw"
                  objectFit="cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">No image</span>
                </div>
              )}
            </div>
            <div className="p-4">
              {/* Categories */}
              {post.categories.nodes.length > 0 && (
                <div className="uppercase text-sm mb-4 text-muted-foreground">
                  {post.categories.nodes.map((category, index) => {
                    const isLast = index === post.categories.nodes.length - 1;
                    return (
                      <React.Fragment key={category.slug}>
                        {category.name}
                        {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                      </React.Fragment>
                    );
                  })}
                </div>
              )}
              
              {/* Title */}
              {post.title && (
                <div className="prose">
                  <h3>
                    <Link
                      className="not-prose text-foreground hover:text-primary transition-colors"
                      href={`/blog/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </h3>
                </div>
              )}
              
              {/* Description */}
              {post.excerpt && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt.replace(/<[^>]*>/g, "").substring(0, 150)}...
                  </p>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

