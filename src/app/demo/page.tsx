import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Play, Check, Globe, Zap, Users } from "lucide-react";
import Link from "next/link";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        <div className="relative items-center justify-center flex-col mx-auto px-6 py-24 text-center">
          <p className="text-sm text-muted-foreground mb-8 font-medium tracking-wide">
            Live Demo
          </p>
          
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-start text-6xl md:text-6xl font-bold text-foreground leading-[1.1] mb-8 tracking-tight">
              Test our client portal
              <br />
              <span className="relative">
                live demo.
                <div className="absolute bottom-2 left-0 w-full h-1 bg-primary/20 rounded-full"></div>
              </span>
            </h1>
          </div>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Experience Corvex firsthand. Explore our fully functional client portal demo and see how it can transform your business.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" className="px-8 py-3 text-base font-semibold" asChild>
              <Link href="https://demo.usecorvex.com" target="_blank" rel="noopener noreferrer">
                <Play className="mr-2 h-5 w-5" />
                Launch Live Demo
              </Link>
            </Button>
            <Button size="lg" variant="ghost" className="px-8 py-3 text-base font-semibold" asChild>
              <Link href="/waitlist">
                Request Full Access
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="w-full py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              What you'll experience
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore all the features that make Corvex the perfect client portal solution
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">White-Label Portal</h3>
                <p className="text-sm text-muted-foreground">
                  See how your clients will experience your fully branded portal
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Task Management</h3>
                <p className="text-sm text-muted-foreground">
                  Explore our intuitive task and project management features
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/20">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Client Collaboration</h3>
                <p className="text-sm text-muted-foreground">
                  Experience seamless communication and file sharing
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Instructions */}
      <section className="w-full py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="border-border/20">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Demo Instructions
              </h3>
              <div className="space-y-4">
                {[
                  "Click 'Launch Live Demo' to open the demo portal in a new window",
                  "Explore the client portal interface and features",
                  "Try creating tasks, viewing projects, and navigating the portal",
                  "See how clients interact with your branded portal",
                  "Note: This is a read-only demo. Some features may be limited"
                ].map((instruction, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">{instruction}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Card className="border-primary/20 border-2">
            <CardContent className="p-12 text-center space-y-8">
              <h3 className="text-4xl font-bold text-foreground leading-tight">
                Ready to get started?
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join the waitlist to get early access to Corvex and start transforming your client management.
              </p>
              <Button size="lg" className="px-8 py-3 text-base font-semibold" asChild>
                <Link href="/waitlist">
                  Join the Waitlist
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

