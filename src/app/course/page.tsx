import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Play, Check, Clock, Users } from "lucide-react";
import Link from "next/link";

export default function CoursePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        <div className="relative items-center justify-center flex-col mx-auto px-6 py-24 text-center">
          <p className="text-sm text-muted-foreground mb-8 font-medium tracking-wide">
            Free Course
          </p>
          
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-start text-6xl md:text-6xl font-bold text-foreground leading-[1.1] mb-8 tracking-tight">
              Productized Service
              <br />
              <span className="relative">
                Masterclass.
                <div className="absolute bottom-2 left-0 w-full h-1 bg-primary/20 rounded-full"></div>
              </span>
            </h1>
          </div>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Learn how to transform your expertise into scalable, productized services. A comprehensive course designed for consultants, agencies, and service providers.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" className="px-8 py-3 text-base font-semibold" asChild>
              <Link href="/waitlist">
                <Play className="mr-2 h-5 w-5" />
                Enroll for Free
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="w-full py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              What you'll learn
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A step-by-step guide to building and scaling productized services
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Introduction to Productized Services", description: "Understanding the fundamentals and benefits" },
              { title: "Identifying Your Service Package", description: "How to package your expertise into sellable services" },
              { title: "Pricing Strategies", description: "Setting the right price for maximum profitability" },
              { title: "Marketing & Sales", description: "How to market and sell your productized services" },
              { title: "Client Onboarding", description: "Creating seamless onboarding experiences" },
              { title: "Scaling Your Business", description: "Growing from one service to a full productized business" }
            ].map((module, index) => (
              <Card key={index} className="border-border/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{module.title}</h3>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="w-full py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="border-border/20">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Course Details
              </h3>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Duration</p>
                    <p className="text-sm text-muted-foreground">6 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Modules</p>
                    <p className="text-sm text-muted-foreground">12 lessons</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Format</p>
                    <p className="text-sm text-muted-foreground">Self-paced</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">What's included:</h4>
                {[
                  "Video lessons with real-world examples",
                  "Downloadable templates and worksheets",
                  "Case studies from successful productized services",
                  "Access to exclusive community",
                  "Certificate of completion"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
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
                Start learning today
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join the waitlist to get notified when the course launches. It's completely free.
              </p>
              <Button size="lg" className="px-8 py-3 text-base font-semibold" asChild>
                <Link href="/waitlist">
                  Join Waitlist
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

