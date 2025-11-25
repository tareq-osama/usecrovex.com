// components/blog/RichText.tsx
// RichText component for rendering Lexical content using Payload CMS Lexical renderer

import React from "react";
import {
  type DefaultTypedEditorState,
  type SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'
import { cn } from "@/lib/utils";
import { MediaBlock } from "./MediaBlock";
import "./RichText.css";

// Handle internal document links - convert to blog post URLs
const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/blog/${slug}` : `/${slug}`
}

// Converters with custom blocks support
const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
  },
})

interface RichTextProps extends React.HTMLAttributes<HTMLDivElement> {
  data: DefaultTypedEditorState | string; // Lexical editor state
  enableGutter?: boolean;
  enableProse?: boolean;
}

export default function RichText({
  className,
  enableProse = true,
  enableGutter = true,
  data,
  ...rest
}: RichTextProps) {
  // Parse data if it's a string
  let parsedData: DefaultTypedEditorState;
  try {
    parsedData = typeof data === "string" ? JSON.parse(data) : data;
  } catch (error) {
    console.error("Error parsing Lexical content:", error);
    return <div className={className}>Error rendering content</div>;
  }

  return (
    <ConvertRichText
      converters={jsxConverters}
      data={parsedData}
      className={cn(
        "payload-richtext",
        {
          container: enableGutter,
          "max-w-none": !enableGutter,
          "mx-auto prose md:prose-md dark:prose-invert": enableProse,
        },
        className
      )}
      {...rest}
    />
  );
}

