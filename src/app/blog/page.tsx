import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { ImageWithSkeleton } from "@/components/blog/ImageWithSkeleton";
import { getPosts, WordPressPost } from "@/lib/queries/get-posts-payload";
import { formatDate } from "@/lib/utils/date-formatter";
import { stripHtml } from "@/lib/utils";
import { estimateReadingTimeFromLexical } from "@/lib/utils/lexical";

// Force dynamic rendering on each request for instant updates
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogPage() {
  const posts = await getPosts(20);
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Featured Post */}
      <section className="relative w-full overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Headline */}
            <div>
              {/* Small label above headline */}
              <p className="text-sm text-muted-foreground mb-8 font-medium tracking-wide">
                Blog
              </p>
              
              {/* Main headline */}
              <h1 className="text-5xl md:text-6xl font-bold text-foreground [line-height:1.2] mb-6 tracking-tight">
                Latest insights on
                <br />
                <span className="relative">
                  business growth.
                  <div className="absolute bottom-2 left-0 w-full h-1 bg-primary/20 rounded-full"></div>
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-muted-foreground leading-relaxed">
                Expert advice, tips, and strategies to help you grow your business and deliver exceptional client experiences.
              </p>
            </div>

            {/* Right Column - Featured Post */}
            {featuredPost && (
              <Link href={`/blog/${featuredPost.slug}`}>
                <Card className="border-border/20 overflow-hidden hover:border-primary/20 transition-colors cursor-pointer group relative h-full">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                  <div className="flex flex-col">
                    <div className="bg-muted/30 p-6 flex-1">
                      <p className="text-sm text-muted-foreground mb-2">Featured Post</p>
                      <h2 className="text-xl font-bold text-foreground [line-height:1.2] mb-3 line-clamp-2">
                        {featuredPost.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
                        {stripHtml(featuredPost.excerpt)}
                      </p>
                      <div className="flex items-center flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{featuredPost.author.node.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(featuredPost.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{estimateReadingTimeFromLexical(featuredPost.content)}</span>
                        </div>
                      </div>
                      {featuredPost.categories.nodes.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {featuredPost.categories.nodes.slice(0, 2).map((category) => (
                            <span
                              key={category.slug}
                              className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full"
                            >
                              {category.name}
                            </span>
                          ))}
                        </div>
                      )}
                      <Button size="sm">Read full article</Button>
                    </div>
                    {featuredPost.featuredImage?.node && (
                      <div className="bg-muted/50 h-48 overflow-hidden relative">
                        <ImageWithSkeleton
                          src={featuredPost.featuredImage.node.sourceUrl}
                          alt={featuredPost.featuredImage.node.altText || featuredPost.title}
                          width={600}
                          height={300}
                          className="w-full h-full"
                          objectFit="cover"
                        />
                      </div>
                    )}
                  </div>
                </Card>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="w-full py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground [line-height:1.2] mb-6">
              Latest articles
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Insights, tips, and strategies to help you grow your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.length > 0 ? (
              otherPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="border-border/20 hover:border-primary/20 transition-colors h-full group relative overflow-hidden">
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                    <CardContent className="p-6 flex flex-col h-full">
                      {post.featuredImage?.node && (
                        <div className="mb-4 -mx-6 -mt-6 relative overflow-hidden h-48">
                          <ImageWithSkeleton
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.featuredImage.node.altText || post.title}
                            width={600}
                            height={300}
                            className="w-full h-full"
                            objectFit="cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                        </div>
                      )}
                      <div className="mb-4 flex flex-wrap gap-2">
                        {post.categories.nodes.length > 0 ? (
                          post.categories.nodes.slice(0, 2).map((category) => (
                            <span
                              key={category.slug}
                              className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full"
                            >
                              {category.name}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                            Article
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-foreground [line-height:1.2] mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
                        {stripHtml(post.excerpt)}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{post.author.node.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {estimateReadingTimeFromLexical(post.content)}
                        </span>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                          Read more
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No posts found. Check back soon for new articles!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-foreground [line-height:1.2] mb-6">
            Stay updated with our newsletter
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get the latest insights on business growth, client management, and industry trends delivered to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button size="lg" className="px-8 py-3">
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </section>

    </div>
  );
} 