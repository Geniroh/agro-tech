import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(session); // You can log session details for debugging

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
