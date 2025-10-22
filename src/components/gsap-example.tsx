"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function GSAPExample() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current, buttonRef.current], {
        opacity: 0,
        y: 50,
      });

      // Create timeline
      const tl = gsap.timeline();

      // Animate elements in sequence
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      })
        .to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }, "-=0.5")
        .to(buttonRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        }, "-=0.3");

      // Add hover animation to button
      if (buttonRef.current) {
        buttonRef.current.addEventListener("mouseenter", () => {
          gsap.to(buttonRef.current, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        buttonRef.current.addEventListener("mouseleave", () => {
          gsap.to(buttonRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      }
    }, containerRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center max-w-2xl mx-auto px-6">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
        >
          GSAP Animation
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
        >
          This is a simple example of GSAP animations in Next.js. 
          Notice how the elements animate in smoothly with staggered timing.
        </p>
        
        <button 
          ref={buttonRef}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          onClick={() => {
            // Trigger a bounce animation on click
            gsap.to(buttonRef.current, {
              scale: 1.2,
              duration: 0.1,
              yoyo: true,
              repeat: 1,
              ease: "power2.inOut",
            });
          }}
        >
          Click me for bounce!
        </button>
      </div>
    </div>
  );
}
