// components/blog/MediaBlock.tsx
// MediaBlock component for rendering image blocks in Lexical rich text

"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface MediaResource {
  id: string;
  alt?: string;
  url?: string;
  width?: number;
  height?: number;
  filename?: string;
  mimeType?: string;
  updatedAt?: string;
}

interface MediaBlockProps {
  media: MediaResource | string | number;
  className?: string;
  imgClassName?: string;
  captionClassName?: string;
  enableGutter?: boolean;
  disableInnerContainer?: boolean;
}

// Get PayloadCMS base URL from environment variable
const PAYLOAD_API_URL = process.env.NEXT_PUBLIC_PAYLOAD_API_URL || "https://payload.usecorvex.com";

// Convert relative URLs to absolute URLs using the Payload API URL
function getAbsoluteUrl(url: string): string {
  // If URL is already absolute, return as is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  // Remove trailing slash from base URL if present
  const baseUrl = PAYLOAD_API_URL.replace(/\/$/, "");
  return `${baseUrl}${url.startsWith("/") ? url : `/${url}`}`;
}

export const MediaBlock: React.FC<MediaBlockProps> = ({
  media,
  className,
  imgClassName,
  captionClassName,
  enableGutter = true,
  disableInnerContainer = false,
}) => {
  // Only render if media is an object with required properties
  if (!media || typeof media !== "object") {
    return null;
  }

  const { alt, url, width, height, filename } = media;

  // Don't render if there's no URL
  if (!url) {
    return null;
  }

  // Convert relative URL to absolute URL
  const absoluteUrl = getAbsoluteUrl(url);

  return (
    <div
      className={cn(
        "",
        {
          container: enableGutter,
        },
        className
      )}
    >
      <div className="relative w-full">
        <Image
          src={absoluteUrl}
          alt={alt || filename || ""}
          width={width || 1200}
          height={height || 800}
          className={cn("w-full h-auto border border-border rounded-lg", imgClassName)}
          loading="lazy"
          quality={90}
        />
      </div>
    </div>
  );
};
