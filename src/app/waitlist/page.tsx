"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Threads from './Threads';
import { CorvexAILogoWithSkeleton } from "@/components/CorvexAILogoWithSkeleton";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | "success" | "error" | "already-subscribed" | "rate-limited">(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle success state - show success component, then revert after 3 seconds
  useEffect(() => {
    if (status === "success") {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setStatus(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setShowSuccess(false);

    try {
      // Get honeypot field value (should be empty)
      const form = e.currentTarget as HTMLFormElement;
      const honeypot = (form.querySelector('input[name="website"]') as HTMLInputElement)?.value || '';

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, honeypot }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 409) {
          setStatus("already-subscribed");
        } else if (response.status === 429) {
          setStatus("rate-limited");
        } else {
          setStatus("error");
        }
        return;
      }

      // Success
      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error("Error submitting waitlist:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Threads Background */}
      <div className="absolute inset-0 w-full h-full">
        <Threads
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
        />
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-md space-y-8 bg-background/80 backdrop-blur-sm border  border-border/50 rounded-lg p-8">
          {/* Logo */}
          <div className="flex flex-col items-center relative">
            <CorvexAILogoWithSkeleton className="h-16 w-full max-w-60" />
            <span className="absolute -top-2 -right-2 text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-md border border-border/50">
              Beta
            </span>
          </div>

          {/* Tagline */}
          <div className="text-center space-y-4">
            <h2 className="text-xl font-medium text-foreground">
              The Operating System For Your Agency
              and One-Person Businesses
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
              Streamline everything with AI.<br />Automate Operations.<br /> 
              
              Put your client management to work with one seamless platform and Fully white-labeled client portal.
            </p>
          </div>

          {/* Form or Success State */}
          {showSuccess ? (
            <div className="flex flex-col items-center justify-center space-y-4 p-8 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  You're on the list!
                </h3>
                <p className="text-sm text-muted-foreground">
                  We'll notify you when we launch.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field - hidden from users, catches bots */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                style={{ position: 'absolute', left: '-9999px' }}
                aria-hidden="true"
              />
              
              {/* Email Input */}
              <div className="relative">
                <Mail className="absolute z-10 left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground/50 " />
                <Input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address"
                  placeholder="you@workemail.com"
                  disabled={loading}
                  className="pl-10 h-12 bg-background/80 backdrop-blur-sm border-border/50 text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
              >
                {loading ? (
                  "Joining..."
                ) : (
                  <>
                    <Send className="mr-2 w-4 h-4" />
                    Join the waitlist
                  </>
                )}
              </Button>

              {/* Error Messages */}
              {status === "already-subscribed" && (
                <div className="p-3 rounded-md text-center text-sm bg-muted/50 text-muted-foreground border border-border/50">
                  This email is already on the waitlist. Thank you!
                </div>
              )}
              {status === "rate-limited" && (
                <div className="p-3 rounded-md text-center text-sm bg-muted/50 text-muted-foreground border border-border/50">
                  Too many requests. Please wait a moment and try again.
                </div>
              )}
              {status === "error" && (
                <div className="p-3 rounded-md text-center text-sm bg-destructive/10 text-destructive border border-destructive/20">
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          )}

          {/* Footer Links */}
          <div className="text-center text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <span className="text-border">|</span>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




