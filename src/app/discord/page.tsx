import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MessageCircle, Users, Zap, Heart } from "lucide-react";
import Link from "next/link";

export default function DiscordPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        <div className="relative items-center justify-center flex-col mx-auto px-6 py-24 text-center">
          <p className="text-sm text-muted-foreground mb-8 font-medium tracking-wide">
            Community
          </p>
          
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-start text-6xl md:text-6xl font-bold text-foreground leading-[1.1] mb-8 tracking-tight">
              Join our
              <br />
              <span className="relative">
                Discord community.
                <div className="absolute bottom-2 left-0 w-full h-1 bg-primary/20 rounded-full"></div>
              </span>
            </h1>
          </div>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Connect with other Corvex users, share tips, get support, and be part of our growing community.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" className="px-8 py-3 text-base font-semibold" asChild>
              <a href="https://discord.gg/corvex" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Join Discord Server
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="w-full py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Why join our community?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect, learn, and grow with fellow Corvex users
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Connect with Peers</h3>
                <p className="text-sm text-muted-foreground">
                  Network with other business owners and share experiences
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Get Support</h3>
                <p className="text-sm text-muted-foreground">
                  Quick answers to your questions from the community and team
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Share Ideas</h3>
                <p className="text-sm text-muted-foreground">
                  Contribute feedback and help shape the future of Corvex
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="w-full py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="border-border/20">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                What you'll find
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "General discussion and introductions",
                  "Feature requests and feedback",
                  "Tips and best practices",
                  "Announcements and updates",
                  "Support and troubleshooting",
                  "Showcase your work"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Card className="border-primary/20 border-2">
            <CardContent className="p-12 text-center space-y-8">
              <h3 className="text-4xl font-bold text-foreground leading-tight">
                Ready to join?
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Click the button below to join our Discord community. We can't wait to meet you!
              </p>
              <Button size="lg" className="px-8 py-3 text-base font-semibold" asChild>
                <a href="https://discord.gg/corvex" target="_blank" rel="noopener noreferrer">
                  Join Discord Server
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

