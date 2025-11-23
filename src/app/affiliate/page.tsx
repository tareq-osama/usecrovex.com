import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, DollarSign, Users, TrendingUp, Check } from "lucide-react";
import Link from "next/link";

export default function AffiliatePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        <div className="relative items-center justify-center flex-col mx-auto px-6 py-24 text-center">
          <p className="text-sm text-muted-foreground mb-8 font-medium tracking-wide">
            Affiliate Program
          </p>
          
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-start text-6xl md:text-6xl font-bold text-foreground leading-[1.1] mb-8 tracking-tight">
              Earn by sharing
              <br />
              <span className="relative">
                Corvex with others.
                <div className="absolute bottom-2 left-0 w-full h-1 bg-primary/20 rounded-full"></div>
              </span>
            </h1>
          </div>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Join our affiliate program and earn recurring commissions for every customer you refer.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" className="px-8 py-3 text-base font-semibold" asChild>
              <Link href="/waitlist">Join Affiliate Program</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Why become an affiliate?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Earn passive income by sharing a product you love
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Recurring Commissions</h3>
                <p className="text-sm text-muted-foreground">
                  Earn 20% recurring commission on every subscription you refer
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">No Limits</h3>
                <p className="text-sm text-muted-foreground">
                  Refer as many customers as you want. Your earning potential is unlimited
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Marketing Resources</h3>
                <p className="text-sm text-muted-foreground">
                  Get access to banners, links, and marketing materials to help you succeed
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              How it works
            </h2>
          </div>
          
          <div className="space-y-6">
            {[
              { step: "1", title: "Sign up", description: "Join our affiliate program and get your unique referral link" },
              { step: "2", title: "Share", description: "Share your link with your audience through your website, social media, or email" },
              { step: "3", title: "Earn", description: "Get paid monthly for every active customer you refer" }
            ].map((item) => (
              <Card key={item.step} className="border-border/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Card className="border-primary/20 border-2">
            <CardContent className="p-12 text-center space-y-8">
              <h3 className="text-4xl font-bold text-foreground leading-tight">
                Ready to start earning?
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join our affiliate program today and start earning recurring commissions.
              </p>
              <Button size="lg" className="px-8 py-3 text-base font-semibold" asChild>
                <Link href="/waitlist">
                  Join Affiliate Program
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

