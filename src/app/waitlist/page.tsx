"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // You would replace this with your real API call
    try {
      // Example: await fetch("/api/waitlist", { ... })
      await new Promise((resolve) => setTimeout(resolve, 1200)); // mock network
      setStatus("success");
      setEmail("");
    } catch (err) {
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
              You've been added to the waitlist!
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




