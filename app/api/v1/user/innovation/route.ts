import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session?.user?.id;

    const innovations = await db.innovation.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(innovations, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get discussions" },
      { status: 500 }
    );
  }
}
