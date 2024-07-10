import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const posts = await db.featuredPosts.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to posts" }, { status: 500 });
  }
}
