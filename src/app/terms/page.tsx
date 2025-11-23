import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Corvex",
  description: "Corvex Terms of Service - Read our terms and conditions for using our platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        <div className="relative items-center justify-center flex-col mx-auto px-6 py-24 text-center">
          <p className="text-sm text-muted-foreground mb-8 font-medium tracking-wide">
            Legal
          </p>
          
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-start text-6xl md:text-6xl font-bold text-foreground leading-[1.1] mb-8 tracking-tight">
              Terms of Service
              <div className="absolute bottom-2 left-0 w-full h-1 bg-primary/20 rounded-full mt-2"></div>
            </h1>
          </div>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Last updated: January 2025
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full py-24">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="border-border/20">
            <CardContent className="p-8 md:p-12 space-y-8">
              <div className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-foreground
                prose-p:text-foreground/90 prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-semibold
                prose-ul:text-foreground/90 prose-ol:text-foreground/90
                prose-li:text-foreground/90">
                
                <h2>1. Agreement to Terms</h2>
                <p>
                  By accessing or using Corvex ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
                </p>

                <h2>2. Use License</h2>
                <p>Permission is granted to temporarily use Corvex for personal or commercial business purposes. This license does not include:</p>
                <ul>
                  <li>Modifying or copying the materials</li>
                  <li>Using the materials for any commercial purpose without authorization</li>
                  <li>Attempting to reverse engineer any software contained in Corvex</li>
                  <li>Removing any copyright or other proprietary notations</li>
                </ul>

                <h2>3. Account Registration</h2>
                <p>To access certain features, you must register for an account. You agree to:</p>
                <ul>
                  <li>Provide accurate and complete information</li>
                  <li>Maintain and update your information</li>
                  <li>Maintain the security of your password</li>
                  <li>Accept responsibility for all activities under your account</li>
                </ul>

                <h2>4. Acceptable Use</h2>
                <p>You agree not to:</p>
                <ul>
                  <li>Use the Service for any illegal purpose</li>
                  <li>Violate any laws in your jurisdiction</li>
                  <li>Transmit any viruses or malicious code</li>
                  <li>Attempt to gain unauthorized access to the Service</li>
                  <li>Interfere with or disrupt the Service</li>
                </ul>

                <h2>5. Payment Terms</h2>
                <p>
                  Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law. You may cancel your subscription at any time, and cancellation will take effect at the end of the current billing period.
                </p>

                <h2>6. Intellectual Property</h2>
                <p>
                  The Service and its original content, features, and functionality are owned by Corvex and are protected by international copyright, trademark, and other intellectual property laws.
                </p>

                <h2>7. User Content</h2>
                <p>
                  You retain ownership of any content you submit, post, or display on or through the Service. By submitting content, you grant Corvex a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute such content solely for the purpose of providing the Service.
                </p>

                <h2>8. Termination</h2>
                <p>
                  We may terminate or suspend your account and access to the Service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
                </p>

                <h2>9. Disclaimer</h2>
                <p>
                  The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the Service will be uninterrupted, secure, or error-free.
                </p>

                <h2>10. Limitation of Liability</h2>
                <p>
                  In no event shall Corvex be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or use, incurred by you or any third party.
                </p>

                <h2>11. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the "Last updated" date.
                </p>

                <h2>12. Contact Information</h2>
                <p>
                  If you have any questions about these Terms, please contact us at:
                </p>
                <p>
                  Email: legal@corvex.com<br />
                  Address: Corvex Inc., [Your Address]
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

