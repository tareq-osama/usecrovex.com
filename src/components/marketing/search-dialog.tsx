"use client";

import * as React from "react";
import { Search, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { WordPressPost } from "@/lib/queries/get-posts";
import { stripHtml } from "@/lib/utils";
import { formatDate } from "@/lib/utils/date-formatter";

export function SearchDialog() {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [posts, setPosts] = React.useState<WordPressPost[]>([]);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  // Fetch posts when dialog opens
  React.useEffect(() => {
    if (open && posts.length === 0) {
      setLoading(true);
      fetch("/api/posts")
        .then((res) => res.json())
        .then((data) => {
          setPosts(data.posts || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          setLoading(false);
        });
    }
  }, [open, posts.length]);

  // Filter posts based on search query
  const filteredPosts = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase();
    return posts.filter((post) => {
      const title = post.title.toLowerCase();
      const excerpt = stripHtml(post.excerpt).toLowerCase();
      const content = stripHtml(post.content).toLowerCase();
      const author = post.author.node.name.toLowerCase();
      const categories = post.categories.nodes
        .map((cat) => cat.name.toLowerCase())
        .join(" ");

      return (
        title.includes(query) ||
        excerpt.includes(query) ||
        content.includes(query) ||
        author.includes(query) ||
        categories.includes(query)
      );
    });
  }, [searchQuery, posts]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  const handlePostClick = (slug: string) => {
    router.push(`/blog/${slug}`);
    setOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground hover:text-foreground"
        onClick={() => setOpen(true)}
        aria-label="Search"
      >
        <Search className="h-4 w-4" />
        <span className="hidden lg:inline ml-2">Search</span>
        <kbd className="hidden lg:pointer-events-none lg:inline-flex lg:h-5 lg:select-none lg:items-center lg:gap-1 lg:rounded lg:border lg:bg-muted lg:px-1.5 lg:font-mono lg:text-[10px] lg:font-medium lg:text-muted-foreground ml-2">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
            <DialogDescription>
              Search blog posts
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                autoFocus
              />
            </div>

            <div 
              className={`overflow-hidden transition-[height] duration-300 ease-in-out ${
                searchQuery.trim() && !loading ? 'h-[400px]' : 'h-[60px]'
              }`}
            >
              {searchQuery.trim() && !loading ? (
                <ScrollArea className="h-[400px]">
                  <div className="space-y-2 pr-4">
                    {filteredPosts.length > 0 ? (
                      filteredPosts.map((post) => (
                        <button
                          key={post.id}
                          onClick={() => handlePostClick(post.slug)}
                          className="w-full text-left p-3 rounded-lg border border-border/20 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            {post.featuredImage?.node && (
                              <div className="flex-shrink-0 w-12 h-12 rounded overflow-hidden bg-muted">
                                <img
                                  src={post.featuredImage.node.sourceUrl}
                                  alt={post.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-foreground mb-1 line-clamp-1">
                                {post.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                {stripHtml(post.excerpt)}
                              </p>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  <span>{post.author.node.name}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{formatDate(post.date)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground text-sm">
                        No results found
                      </div>
                    )}
                  </div>
                </ScrollArea>
              ) : (
                <div className="flex items-center justify-center h-full">
                  {loading ? (
                    <div className="text-center text-muted-foreground text-sm">
                      Loading...
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground text-sm">
                      Start typing to search...
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

