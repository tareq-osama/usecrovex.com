import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const footerLinks = {
  Links: [
    { title: "Blog", href: "/blog" },
    { title: "Help Center", href: "/help" },
    { title: "Become an affiliate", href: "/affiliate" },
    { title: "Leave us a testimonial", href: "/testimonial" },
    { title: "Join our discord", href: "/discord" },
    { title: "Test client portal live", href: "/demo" },
  ],
  Features: [
    { title: "White label client portal for businesses", href: "/features/client-portal" },
    { title: "Task management for businesses", href: "/features/tasks" },
    { title: "Integrations & webhooks", href: "/features/integrations" },
  ],
  "Free resources": [
    { title: "Productized service AI idea generator", href: "/tools/idea-generator" },
    { title: "Productized service course", href: "/course" },
  ],
  Legal: [
    { title: "Terms", href: "/terms" },
    { title: "Privacy", href: "/privacy" },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/20 bg-background/50">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-foreground mb-4">{category}</h3>
              <ul className="space-y-3">
                                 {links.map((link) => (
                   <li key={link.href}>
                     <Link 
                       href={link.href} 
                       className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                       {link.title}
                     </Link>
                   </li>
                 ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/20">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
          
                      {/* Logo */}
                      <Link href="/" className="flex items-center gap-2">
                        <Image src="/corvexlogo.svg" alt="Corvex Logo" width={200} height={100} />
                      </Link>

          </div>
          
          <p className="text-sm text-muted-foreground">
            © 2025 Corvex. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}