import React from "react";
import { Button } from "@/components/ui/button";

/**
 * Founder Memo Component
 * 
 * This component displays founder social proof and memo message.
 * Currently hidden - will be enhanced later.
 */
export default function FounderMemo() {
  // Currently hidden - component is ready for future enhancements
  return null;

  // Future implementation will include:
  // - Social proof section with avatars (AR, JS, MK) and ratings
  // - "over 100+ agencies" testimonial
  // - "Book a free demo call" CTA button
  // - Founder memo message about digital agencies
  // - Tareq's signature

  return (
    <>
      {/* Top Section with CTA */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="flex -space-x-2">
            <div className="w-10 h-10 bg-zinc-700 rounded-full border-2 border-background flex items-center justify-center">
              <span className="text-xs font-medium text-foreground">AR</span>
            </div>
            <div className="w-10 h-10 bg-zinc-600 rounded-full border-2 border-background flex items-center justify-center">
              <span className="text-xs font-medium text-foreground">JS</span>
            </div>
            <div className="w-10 h-10 bg-zinc-500 rounded-full border-2 border-background flex items-center justify-center">
              <span className="text-xs font-medium text-foreground">MK</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-muted-foreground font-medium">
            over 100+ agencies
          </span>
          <Button size="sm" className="ml-2">
            Book a free demo call →
          </Button>
        </div>
      </div>

      {/* Founder Message */}
      <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
        <p className="text-sm text-muted-foreground font-medium">Founder memo</p>
        
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Digital agencies DESERVE better tools. For too long, agency owners have 
            struggled to stitch together clunky software, managing their teams and 
            clients through scattered solutions that create more confusion than clarity.
          </p>
          
          <p>
            It's been a balancing act—juggling operations, customer communication, 
            and growth—all with tools that weren't designed for their unique needs.
          </p>
          
          <p>
            That's why we built Corvex. Corvex is made specifically for digital agencies. 
            Every feature is designed with intention, detail, and care, helping agencies:
          </p>
        </div>
        
        <ul className="space-y-2 text-left max-w-2xl mx-auto">
          <li className="flex items-start gap-3">
            <span className="text-primary">•</span>
            <span className="text-muted-foreground">Simplify operations so they can focus on delivering amazing work</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary">•</span>
            <span className="text-muted-foreground">Offer incredible experiences to their customers</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary">•</span>
            <span className="text-muted-foreground">Grow with confidence by providing the tools needed to scale agencies</span>
          </li>
        </ul>
        
        <p className="text-muted-foreground">
          No fluff. No generic solutions. Just a tool designed 
          to help agencies not just survive, but thrive.
        </p>
        
        <div className="flex items-center justify-center gap-2 pt-4">
          <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-foreground">AR</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Tareq</p>
            <p className="text-xs text-muted-foreground">Founder of Corvex</p>
          </div>
        </div>
      </div>
    </>
  );
}

