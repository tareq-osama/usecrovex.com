"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | "success" | "error" | "already-subscribed" | "rate-limited">(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

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
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            Join our Waitlist
          </CardTitle>
          <CardDescription>
            Be the first to know when we launch. Enter your email below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Honeypot field - hidden from users, catches bots */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              style={{ position: 'absolute', left: '-9999px' }}
              aria-hidden="true"
            />
            <Input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              placeholder="you@example.com"
              disabled={loading}
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Joining..." : "Join Waitlist"}
            </Button>
          </form>
          {status === "success" && (
            <div className="mt-4 p-3 rounded-md text-center bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800">
              You've been added to the waitlist! We'll notify you when we launch.
            </div>
          )}
          {status === "already-subscribed" && (
            <div className="mt-4 p-3 rounded-md text-center bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800">
              This email is already on the waitlist. Thank you!
            </div>
          )}
          {status === "rate-limited" && (
            <div className="mt-4 p-3 rounded-md text-center bg-yellow-50 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800">
              Too many requests. Please wait a moment and try again.
            </div>
          )}
          {status === "error" && (
            <div className="mt-4 p-3 rounded-md text-center bg-red-50 dark:bg-red-950 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800">
              Something went wrong. Please try again.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}




