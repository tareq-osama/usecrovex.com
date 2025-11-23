'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CorvexAILogoWithSkeletonProps {
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  
  /**
   * Logo source path for dark theme
   * @default "/corvex-logo.svg"
   */
  srcDark?: string;
  
  /**
   * Logo source path for light theme
   * @default "/corvex-logo-light.svg"
   */
  srcLight?: string;
  
  /**
   * Alt text for the image
   * @default "Corvex"
   */
  alt?: string;
}

export const CorvexAILogoWithSkeleton = ({
  className,
  imageClassName,
  srcDark = '/corvex-logo.svg',
  srcLight = '/corvex-logo-light.svg',
  alt = 'Corvex',
}: CorvexAILogoWithSkeletonProps) => {
  const [lightLoaded, setLightLoaded] = useState(false);
  const [darkLoaded, setDarkLoaded] = useState(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          .shimmer-animation {
            animation: shimmer 3s linear infinite;
          }
        `
      }} />
      
      <motion.div
        className={cn('flex items-center justify-center relative overflow-hidden', className)}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative inline-block w-full h-full">
          {/* Light theme logo */}
          <img
            src={srcLight}
            alt={alt}
            className={cn(
              'w-full h-full object-contain relative z-10 dark:hidden midnight-dark:hidden black:hidden',
              !lightLoaded && 'opacity-0',
              lightLoaded && 'opacity-100 transition-opacity duration-300',
              imageClassName
            )}
            onLoad={() => setLightLoaded(true)}
          />

          {/* Dark theme logo - for dark, midnight-dark, and black themes */}
          <img
            src={srcDark}
            alt={alt}
            className={cn(
              'w-full h-full object-contain relative z-10 hidden dark:block midnight-dark:block black:block',
              !darkLoaded && 'opacity-0',
              darkLoaded && 'opacity-100 transition-opacity duration-300',
              imageClassName
            )}
            onLoad={() => setDarkLoaded(true)}
          />
          
          {/* Light theme shimmer */}
          <div
            className={cn(
              "absolute inset-0 z-20 pointer-events-none dark:hidden midnight-dark:hidden black:hidden shimmer-animation",
              !lightLoaded && "opacity-0",
              lightLoaded && "opacity-100"
            )}
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              mixBlendMode: 'overlay',
              maskImage: `url(${srcLight})`,
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskImage: `url(${srcLight})`,
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
            }}
          />
          
          {/* Dark theme shimmer - for dark theme */}
          <div
            className={cn(
              "absolute inset-0 z-20 pointer-events-none hidden dark:block midnight-dark:hidden black:hidden shimmer-animation",
              !darkLoaded && "opacity-0",
              darkLoaded && "opacity-100"
            )}
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 80%, transparent 100%)',
              backgroundSize: '200% 100%',
              mixBlendMode: 'overlay',
              maskImage: `url(${srcDark})`,
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskImage: `url(${srcDark})`,
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
            }}
          />
          
          {/* Midnight-dark theme shimmer */}
          <div
            className={cn(
              "absolute inset-0 z-20 pointer-events-none hidden midnight-dark:block dark:hidden black:hidden shimmer-animation",
              !darkLoaded && "opacity-0",
              darkLoaded && "opacity-100"
            )}
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.9) 80%, transparent 100%)',
              backgroundSize: '200% 100%',
              mixBlendMode: 'overlay',
              maskImage: `url(${srcDark})`,
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskImage: `url(${srcDark})`,
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
            }}
          />
          
          {/* Black theme shimmer */}
          <div
            className={cn(
              "absolute inset-0 z-20 pointer-events-none hidden black:block dark:hidden midnight-dark:hidden shimmer-animation",
              !darkLoaded && "opacity-0",
              darkLoaded && "opacity-100"
            )}
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 1) 80%, transparent 100%)',
              backgroundSize: '200% 100%',
              mixBlendMode: 'overlay',
              maskImage: `url(${srcDark})`,
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskImage: `url(${srcDark})`,
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
            }}
          />
        </div>
      </motion.div>
    </>
  );
};

