import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const innovation = await db.innovation.findUnique({ where: { id } });
    if (!innovation) {
      return NextResponse.json(
        { error: "Innovation not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(innovation);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to get innovation" });
  }
}
