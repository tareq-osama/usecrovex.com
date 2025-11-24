"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "@/components/marketing/mode-toggle";
import { CorvexAILogoWithSkeleton } from "@/components/CorvexAILogoWithSkeleton";
import { features, solutions, resources } from "@/lib/navigation-data";
import { SearchDialog } from "@/components/marketing/search-dialog";

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll-based navigation visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navigation when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else {
        // Hide navigation when scrolling down (but not at the very top)
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/20"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.3
            }}
          >
        <div className="mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center h-8 w-32">
              <CorvexAILogoWithSkeleton className="w-full h-full" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              <NavigationMenu>
                <NavigationMenuList className="space-x-6">
                  {/* Features */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent text-muted-foreground hover:text-foreground transition-colors">
                      Features
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-80 p-4">
                        <div className="space-y-3">
                          {features.map((feature) => (
                            <Link
                              key={feature.href}
                              href={feature.href}
                              className="group block rounded-lg p-3 hover:bg-muted/50 transition-colors">
                              <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                                {feature.title}
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                {feature.description}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Solutions */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent text-muted-foreground hover:text-foreground transition-colors">
                      Solutions
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-80 p-4">
                        <div className="space-y-3">
                          {solutions.map((solution) => (
                            <Link
                              key={solution.href}
                              href={solution.href}
                              className="group block rounded-lg p-3 hover:bg-muted/50 transition-colors">
                              <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                                {solution.title}
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                {solution.description}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Resources */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent text-muted-foreground hover:text-foreground transition-colors">
                      Resources
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-80 p-4">
                        <div className="space-y-3">
                          {resources.map((resource) => (
                            <Link
                              key={resource.href}
                              href={resource.href}
                              className="group block rounded-lg p-3 hover:bg-muted/50 transition-colors">
                              <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                                {resource.title}
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                {resource.description}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Pricing */}
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/pricing"
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-transparent focus:bg-transparent focus:text-foreground disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-transparent data-[state=open]:bg-transparent transition-colors"
                        )}
                      >
                        Pricing
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <SearchDialog />
              <ModeToggle />
              <Button variant="ghost" size="sm" asChild>
                <Link href="https://app.usecorvex.com">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/waitlist"> Join the waitlist</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          
          {/* Mobile Menu Container */}
          <div className="fixed top-20 left-0 right-0 bottom-0 bg-background border-b border-border/20 shadow-lg overflow-hidden transform transition-transform duration-300 ease-in-out">
            {/* Scrollable Content */}
            <div className="h-full overflow-y-auto">
              <div className="max-w-7xl mx-auto px-6 py-6 space-y-6 pb-8">
                
                {/* Mobile Features */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Features</h3>
                  <div className="space-y-2 pl-4">
                    {features.map((feature) => (
                      <Link
                        key={feature.href}
                        href={feature.href}
                        className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}>
                        {feature.title}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile Solutions */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Solutions</h3>
                  <div className="space-y-2 pl-4">
                    {solutions.map((solution) => (
                      <Link
                        key={solution.href}
                        href={solution.href}
                        className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}>
                        {solution.title}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile Resources */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Resources</h3>
                  <div className="space-y-2 pl-4">
                    {resources.map((resource) => (
                      <Link
                        key={resource.href}
                        href={resource.href}
                        className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}>
                        {resource.title}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile Direct Links */}
                <div className="space-y-2">
                  <Link
                    href="/pricing"
                    className="block py-2 font-semibold text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/blog"
                    className="block py-2 font-semibold text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Blog
                  </Link>
                </div>

                {/* Mobile CTA */}
                <div className="flex flex-col space-y-3 pt-4 border-t border-border/20">
                  <div className="flex justify-center">
                    <SearchDialog />
                  </div>
                  <div className="flex justify-center">
                    <ModeToggle />
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="https://app.usecorvex.com" onClick={() => setIsMobileMenuOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="https://app.usecorvex.com/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      Get started
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}