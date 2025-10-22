"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check, X, Play, Globe, Zap, Users, BarChart3, Clock, Star } from "lucide-react";
import FeaturesSlider from "@/components/marketing/features";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  
  // Scroll-triggered section refs
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states for hero section
      gsap.set([labelRef.current, titleRef.current, subtitleRef.current, buttonsRef.current], {
        opacity: 0,
        y: 30,
      });

      // Create timeline for hero section
      const tl = gsap.timeline();

      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }, "-=0.4")
        .to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }, "-=0.6")
        .to(buttonsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        }, "-=0.4");

      // Add subtle floating animation to the underline
      const underlineRef = titleRef.current?.querySelector('.absolute');
      if (underlineRef) {
        gsap.to(underlineRef, {
          scaleX: 1.1,
          duration: 2,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // Scroll-triggered animations
      if (scrollSectionRef.current) {
        // Animate stats section
        gsap.fromTo(statsRef.current, 
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Animate cards with stagger
        cardsRef.current.forEach((card, index) => {
          if (card) {
            gsap.fromTo(card,
              { opacity: 0, y: 50, scale: 0.9 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                delay: index * 0.2,
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  end: "bottom 15%",
                  toggleActions: "play none none reverse"
                }
              }
            );
          }
        });
      }
    }, [heroRef, scrollSectionRef]);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        <div className="relative items-center justify-center flex-col mx-auto px-6 h-svh flex text-center">
          {/* Small label above headline */}
          <p ref={labelRef} className="text-sm text-muted-foreground mb-8 font-medium tracking-wide">
            From solo to scale
          </p>
          
          {/* Main headline */}
          <div className="flex flex-col items-center justify-center">
          <h1 ref={titleRef} className=" text-start text-6xl md:text-6xl font-bold text-foreground leading-[1.1] mb-8 tracking-tight">
            Start growing your business today
            <br />
            <span className="relative">
              —without complicated setup.
              <div className="absolute bottom-2 left-0 w-full h-1 bg-primary/20 rounded-full"></div>
            </span>
          </h1>
          </div>

          {/* Subtitle */}
          <p ref={subtitleRef} className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
Create invoices, manage tasks, and communicate with your clients with your
            very own white-labeled client portal. <span className="font-semibold text-foreground">5-min setup, <span> <br></br> ready to go this afternoon.</span></span>
          </p>
          
          {/* CTA buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" className="px-8 py-3 text-base font-semibold">
              Set up your portal
            </Button>
            <Button variant="ghost" size="lg" className="px-8 py-3 text-base font-semibold group">
              Book a demo
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      <FeaturesSlider/>

      {/* Scroll-Triggered Stats Section */}
      <section ref={scrollSectionRef} className="w-full py-24 bg-gradient-to-br from-muted/30 to-background">
        <div className="max-w-6xl mx-auto px-6">
          {/* Stats Section */}
          <div ref={statsRef} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Trusted by businesses worldwide
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of businesses that have transformed their operations with Corvex
            </p>
          </div>

          {/* Animated Stats Cards */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <Card 
              ref={(el) => { if (el) cardsRef.current[0] = el; }}
              className="text-center p-6 bg-background/50 backdrop-blur-sm border-border/20 hover:border-primary/30 transition-colors"
            >
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Active Businesses</div>
              </CardContent>
            </Card>

            <Card 
              ref={(el) => { if (el) cardsRef.current[1] = el; }}
              className="text-center p-6 bg-background/50 backdrop-blur-sm border-border/20 hover:border-primary/30 transition-colors"
            >
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                <div className="text-sm text-muted-foreground">Tasks Completed</div>
              </CardContent>
            </Card>

            <Card 
              ref={(el) => { if (el) cardsRef.current[2] = el; }}
              className="text-center p-6 bg-background/50 backdrop-blur-sm border-border/20 hover:border-primary/30 transition-colors"
            >
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </CardContent>
            </Card>

            <Card 
              ref={(el) => { if (el) cardsRef.current[3] = el; }}
              className="text-center p-6 bg-background/50 backdrop-blur-sm border-border/20 hover:border-primary/30 transition-colors"
            >
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </CardContent>
            </Card>
          </div>

          {/* Feature Cards with Scroll Animation */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card 
              ref={(el) => { if (el) cardsRef.current[4] = el; }}
              className="p-6 bg-background/50 backdrop-blur-sm border-border/20 hover:border-primary/30 transition-colors group"
            >
              <CardContent className="p-0">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Lightning Fast</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Experience blazing fast performance with our optimized infrastructure and smart caching.
                </p>
              </CardContent>
            </Card>

            <Card 
              ref={(el) => { if (el) cardsRef.current[5] = el; }}
              className="p-6 bg-background/50 backdrop-blur-sm border-border/20 hover:border-primary/30 transition-colors group"
            >
              <CardContent className="p-0">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Team Collaboration</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Seamlessly collaborate with your team and clients in one unified workspace.
                </p>
              </CardContent>
            </Card>

            <Card 
              ref={(el) => { if (el) cardsRef.current[6] = el; }}
              className="p-6 bg-background/50 backdrop-blur-sm border-border/20 hover:border-primary/30 transition-colors group"
            >
              <CardContent className="p-0">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Analytics & Insights</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get detailed insights and analytics to make data-driven business decisions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trusted By Section with Dashboard Preview */}
      <section className="w-full py-16 border-t border-border/20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm text-muted-foreground mb-8">
              Trusted by businesses like <span className="font-semibold text-foreground">OUTFIEND</span>, Styled design and 100+ others.
            </p>
          </div>
          
          {/* Dashboard preview with testimonial overlay */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/20 bg-muted/20">
              {/* Simulated dashboard interface */}
              <div className="bg-zinc-900 p-4 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-muted-foreground">Business X</span>
                </div>
              </div>
              
              <div className="bg-zinc-950 p-6">
                <div className="grid grid-cols-12 gap-4">
                  {/* Sidebar */}
                  <div className="col-span-3 space-y-3">
                    <div className="text-xs text-muted-foreground font-medium">Business</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <BarChart3 className="h-4 w-4" />
                        Tasks
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        Analytics
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Payments
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground font-medium mt-6">Customers</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Active
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Onboard
                      </div>
                    </div>
                  </div>
                  
                  {/* Main content */}
                  <div className="col-span-9">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <Card className="bg-zinc-800/50 border-zinc-700">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-muted-foreground">Not started</p>
                              <p className="text-lg font-semibold text-foreground">8</p>
                            </div>
                            <div className="text-orange-500">
                              <Clock className="h-4 w-4" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-zinc-800/50 border-zinc-700">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-muted-foreground">To do</p>
                              <p className="text-lg font-semibold text-foreground">4</p>
                            </div>
                            <div className="text-blue-500">
                              <Play className="h-4 w-4" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-zinc-800/50 border-zinc-700">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-muted-foreground">Awaiting feedback</p>
                              <p className="text-lg font-semibold text-foreground">3</p>
                            </div>
                            <div className="text-yellow-500">
                              <Star className="h-4 w-4" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>


                    {/* Task list */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-foreground">Branding guideline 2.0</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">4 days</span>
                          <div className="w-6 h-6 bg-zinc-700 rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm text-foreground">Keyword research</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">1 day</span>
                          <div className="w-6 h-6 bg-zinc-700 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial overlay */}
            <div className="absolute bottom-8 left-8 bg-background/95 backdrop-blur-sm p-6 rounded-lg border border-border/20 max-w-md shadow-lg">
              <p className="text-sm text-muted-foreground mb-4 italic">
                "Corvex is purpose built for productized services and has a team that really understands what makes it all work. Working with us and for me to manage my business, it has all of the flexibility and automation and managing the business even easier."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-foreground">GC</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">George Collier</p>
                  <p className="text-xs text-muted-foreground">Founder of NxtOpportunity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="w-full py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            No doubt, growing a business is hard.
            <br />
            Without a system, it's even harder.
          </h2>
          
          <p className="text-lg text-muted-foreground mb-16">
            (We know it, we've been there)
          </p>
          
          {/* Before/After comparison */}
          <div className="grid md:grid-cols-2 gap-16 items-start mt-16">
            {/* Left side - Problems */}
            <div className="space-y-6">
              <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full mx-auto md:mx-0">
                <X className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Your business without Corvex</h3>
              <ul className="space-y-4 text-left">
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Struggling to onboard clients</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Bad customer experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Use tools made for other industries</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Hard to communicate value to your clients</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Hard to work with your team and customers</span>
                </li>
              </ul>
            </div>
            
            {/* Right side - Solutions */}
            <div className="space-y-6">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto md:mx-0">
                <Play className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Your business <span className="underline decoration-primary decoration-2">with</span> Corvex</h3>
              <ul className="space-y-4 text-left">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Automated and clear client onboarding</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Stand out from competitors (with your branding)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Use a tool crafted for business needs</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Value communicated automatically and clearly to clients</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Work with your team and customers in one place</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

     

      {/* How It Works Process Section */}
      <section className="w-full py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm text-muted-foreground mb-4 font-medium">How Corvex works</p>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Your business from chaos to simplicity.
            </h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-muted-foreground mb-6">
                "Before Corvex, I spend so much time on my business billing, tasks, 
                and communication. Now everything's in <span className="font-semibold text-foreground underline decoration-primary decoration-2">one seamless platform</span> 
                letting me focus on growth and clients instead of managing systems."
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-foreground">D</span>
                </div>
                <span className="text-sm text-muted-foreground">— Derek, Founder of Meridian Design</span>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-lg font-bold text-lg mx-auto">
                1
              </div>
              <h3 className="font-semibold text-foreground">Quick setup</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Connect your Stripe account, add your logo, domain name and colors and pricing 
                strategy. <span className="font-semibold text-foreground">No further setup required.</span>
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-lg font-bold text-lg mx-auto">
                2
              </div>
              <h3 className="font-semibold text-foreground">Onboard customers</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Migrate onboard customers to your portal 
                by texting them or automatically <span className="font-semibold text-foreground">onboard</span> them when they pay for your services.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-lg font-bold text-lg mx-auto">
                3
              </div>
              <h3 className="font-semibold text-foreground">Get to work</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Work with your customers and team 
                members <span className="font-semibold text-foreground">in one place</span> with a simple, 
                fast and private user experience.
              </p>
            </div>
            
            {/* Step 4 */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-lg font-bold text-lg mx-auto">
                4
              </div>
              <h3 className="font-semibold text-foreground">Grow</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Simplify and systemize your workflow to make 
                your team's daily <span className="font-semibold text-foreground">life easier</span>, handle more 
                <span className="font-semibold text-foreground">customers</span>, and grow your business's revenue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Portal Feature Section */}
      <section className="w-full py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Meet your next<br />client portal.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Simple. Powerful. Beautiful. Offer a better experience 
              with a client portal with your domain name and branding. 
              A place your customers deserve.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="default" size="lg">Try client portal live</Button>
              <Button variant="outline" size="lg">Explore client portal</Button>
            </div>
          </div>
          
          {/* Feature grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-2xl mx-auto">
                <Globe className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">White Labelled</h3>
              <p className="text-sm text-muted-foreground">
                Add your own domain name and branding.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-2xl mx-auto">
                <Zap className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">Easy onboarding</h3>
              <p className="text-sm text-muted-foreground">
                Onboard customers onboarding in five clicks.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-2xl mx-auto">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">Collaborative</h3>
              <p className="text-sm text-muted-foreground">
                Help your clients to help their teams to collaborate with yours.
              </p>
            </div>
          </div>
          
          {/* Portal preview placeholder */}
          <div className="relative">
            <div className="w-full h-96 bg-muted/50 rounded-2xl border border-border/20 flex items-center justify-center">
              <p className="text-muted-foreground">Client Portal Preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="w-full py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-2xl md:text-3xl font-bold text-foreground mb-8 leading-relaxed italic">
            "It's quickly becoming insane to even consider using any 
            other software if you're a productized business. No one else is 
            doing it like Corvex."
          </p>
          <p className="text-muted-foreground">— Lucas</p>
        </div>
      </section>





      {/* Final CTA Section */}
      <section className="w-full py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            We succeed if you do.
          </h2>
          
          <div className="space-y-6 mb-12">
            <div className="flex items-center justify-center gap-3">
              <Check className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">Direct access to fast support, every step of the way</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Check className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">Personalized help onboarding by our founder</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Check className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">No hidden fees, no upsells, no startup costs required</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Check className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">Dedicated support when you need it</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="px-8 py-3 text-base font-semibold">
              Get started now
            </Button>
            <Button variant="ghost" size="lg" className="px-8 py-3 text-base font-semibold group">
              Book a demo
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}