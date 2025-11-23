import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles, Lightbulb, Zap } from "lucide-react";
import Link from "next/link";

export default function IdeaGeneratorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        <div className="relative items-center justify-center flex-col mx-auto px-6 py-24 text-center">
          <p className="text-sm text-muted-foreground mb-8 font-medium tracking-wide">
            Free Tool
          </p>
          
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-start text-6xl md:text-6xl font-bold text-foreground leading-[1.1] mb-8 tracking-tight">
              Productized Service
              <br />
              <span className="relative">
                AI Idea Generator.
                <div className="absolute bottom-2 left-0 w-full h-1 bg-primary/20 rounded-full"></div>
              </span>
            </h1>
          </div>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Generate unlimited productized service ideas powered by AI. Transform your expertise into scalable, repeatable service packages.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" className="px-8 py-3 text-base font-semibold" asChild>
              <Link href="/waitlist">
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Ideas Now
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              How it works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI analyzes your skills and market trends to generate unique productized service ideas
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Enter Your Expertise</h3>
                <p className="text-sm text-muted-foreground">
                  Tell us about your skills, industry, and target market
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">AI Generates Ideas</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI creates multiple productized service concepts tailored to you
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Refine & Launch</h3>
                <p className="text-sm text-muted-foreground">
                  Review, customize, and start building your productized service
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="w-full py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Why productize your services?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Predictable revenue streams",
              "Scalable business model",
              "Reduced client management overhead",
              "Faster sales cycles",
              "Clear value proposition",
              "Easier to market and sell"
            ].map((benefit, index) => (
              <Card key={index} className="border-border/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <p className="text-foreground">{benefit}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Card className="border-primary/20 border-2">
            <CardContent className="p-12 text-center space-y-8">
              <h3 className="text-4xl font-bold text-foreground leading-tight">
                Ready to generate your next big idea?
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join the waitlist to get early access to our AI Idea Generator tool.
              </p>
              <Button size="lg" className="px-8 py-3 text-base font-semibold" asChild>
                <Link href="/waitlist">
                  Get Early Access
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

