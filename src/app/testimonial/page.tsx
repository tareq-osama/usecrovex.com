import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function TestimonialPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        <div className="relative items-center justify-center flex-col mx-auto px-6 py-24 text-center">
          <p className="text-sm text-muted-foreground mb-8 font-medium tracking-wide">
            Share Your Story
          </p>
          
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-start text-6xl md:text-6xl font-bold text-foreground leading-[1.1] mb-8 tracking-tight">
              Leave us a
              <br />
              <span className="relative">
                testimonial.
                <div className="absolute bottom-2 left-0 w-full h-1 bg-primary/20 rounded-full"></div>
              </span>
            </h1>
          </div>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            We'd love to hear about your experience with Corvex. Share your story and help others discover how we can help their business.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="w-full py-24">
        <div className="max-w-2xl mx-auto px-6">
          <Card className="border-border/20">
            <CardContent className="p-8 md:p-12">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-foreground mb-2">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-8 w-8 text-muted-foreground hover:text-primary cursor-pointer"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="testimonial" className="block text-sm font-medium text-foreground mb-2">
                    Your Testimonial
                  </label>
                  <textarea
                    id="testimonial"
                    name="testimonial"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Tell us about your experience with Corvex..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Submit Testimonial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Info Section */}
      <section className="w-full py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-4">
            <MessageSquare className="h-12 w-12 text-primary mx-auto" />
            <h3 className="text-2xl font-bold text-foreground">
              Thank you for sharing!
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We review all testimonials before publishing. If your testimonial is selected, we'll notify you via email.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

