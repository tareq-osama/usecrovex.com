import { NextResponse } from "next/server";
import { getPosts } from "@/lib/queries/get-posts-payload";

export async function GET() {
  try {
    // Fetch all posts (or a large number for search)
    const posts = await getPosts(100);
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching posts for search:", error);
    return NextResponse.json({ posts: [] }, { status: 500 });
  }
}

