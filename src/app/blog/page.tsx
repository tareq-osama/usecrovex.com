import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { getPosts, WordPressPost } from "@/lib/queries/get-posts";
import { formatDate } from "@/lib/utils/date-formatter";
import { stripHtml, estimateReadingTime } from "@/lib/utils";

// Enable dynamic rendering - revalidate every 60 seconds (ISR)
export const revalidate = 60;
// Force dynamic rendering on each request (alternative to revalidate)
// export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await getPosts(20);
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        <div className="relative items-center justify-center flex-col mx-auto px-6 py-24 text-center">
          {/* Small label above headline */}
          <p className="text-sm text-muted-foreground mb-8 font-medium tracking-wide">
            Blog
          </p>
          
          {/* Main headline */}
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-start text-6xl md:text-6xl font-bold text-foreground leading-[1.1] mb-8 tracking-tight">
              Latest insights on
              <br />
              <span className="relative">
                business growth.
                <div className="absolute bottom-2 left-0 w-full h-1 bg-primary/20 rounded-full"></div>
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Expert advice, tips, and strategies to help you grow your business and deliver exceptional client experiences.
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" className="px-8 py-3 text-base font-semibold">
              Subscribe to newsletter
            </Button>
            <Button variant="ghost" size="lg" className="px-8 py-3 text-base font-semibold group">
              View all posts
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="w-full py-16">
          <div className="max-w-4xl mx-auto px-6">
            <Card className="border-border/20 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 bg-muted/30 p-8 flex items-center justify-center">
                  <div className="w-full">
                    <p className="text-sm text-muted-foreground mb-2">Featured Post</p>
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mb-6 line-clamp-4">
                      {stripHtml(featuredPost.excerpt)}
                    </p>
                    <div className="flex items-center flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{featuredPost.author.node.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(featuredPost.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{estimateReadingTime(featuredPost.content)}</span>
                      </div>
                    </div>
                    {featuredPost.categories.nodes.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {featuredPost.categories.nodes.map((category) => (
                          <span
                            key={category.slug}
                            className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full"
                          >
                            {category.name}
                          </span>
                        ))}
                      </div>
                    )}
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <Button>Read full article</Button>
                    </Link>
                  </div>
                </div>
                <div className="md:w-1/2 bg-muted/50 p-8 flex items-center justify-center min-h-[300px]">
                  {featuredPost.featuredImage?.node ? (
                    <Image
                      src={featuredPost.featuredImage.node.sourceUrl}
                      alt={featuredPost.featuredImage.node.altText || featuredPost.title}
                      width={featuredPost.featuredImage.node.mediaDetails.width || 600}
                      height={featuredPost.featuredImage.node.mediaDetails.height || 400}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <p className="text-muted-foreground">Featured Image</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="w-full py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
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
                  <Card className="border-border/20 hover:border-primary/20 transition-colors h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      {post.featuredImage?.node && (
                        <div className="mb-4 -mx-6 -mt-6">
                          <Image
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.featuredImage.node.altText || post.title}
                            width={600}
                            height={300}
                            className="w-full h-48 object-cover"
                          />
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
                      <h3 className="font-semibold text-foreground mb-3 line-clamp-2">
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
                          {estimateReadingTime(post.content)}
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
          <h2 className="text-4xl font-bold text-foreground mb-6">
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

      {/* Categories Section */}
      <section className="w-full py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Browse by category
            </h2>
            <p className="text-lg text-muted-foreground">
              Find content that's most relevant to your needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              "Business Growth",
              "Client Experience", 
              "Automation",
              "Branding",
              "Communication",
              "Productivity",
              "Marketing",
              "Technology"
            ].map((category) => (
              <Card key={category} className="border-border/20 hover:border-primary/20 transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-foreground">{category}</h3>
                  <p className="text-sm text-muted-foreground mt-2">View articles</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 