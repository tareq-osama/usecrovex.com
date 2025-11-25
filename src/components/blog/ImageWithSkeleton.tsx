"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  sizes,
  objectFit = "cover",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const imageClasses = cn(
    "transition-opacity duration-300",
    isLoading ? "opacity-0" : "opacity-100",
    className
  );

  if (hasError) {
    return (
      <div
        className={cn(
          "bg-muted flex items-center justify-center",
          fill ? "absolute inset-0" : "",
          className
        )}
        style={!fill ? { width, height } : undefined}
      >
        <span className="text-muted-foreground text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div 
      className={cn("relative", !fill && "inline-block")} 
      style={!fill && width && height ? { width, height } : undefined}
    >
      {isLoading && (
        <Skeleton
          className="absolute inset-0 z-10"
        />
      )}
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          className={imageClasses}
          priority={priority}
          sizes={sizes}
          style={{ objectFit }}
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={imageClasses}
          priority={priority}
          sizes={sizes}
          style={{ objectFit }}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
};

