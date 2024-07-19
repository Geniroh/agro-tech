import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { token: string } }
) {
  try {
    const token = params.token;

    if (!token) {
      return NextResponse.json({ error: "token not found" }, { status: 400 });
    }

    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const request = await db.editInnovation.findUnique({ where: { token } });

    if (!request) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    const hasExpired = new Date(request.expires) < new Date();

    if (hasExpired) {
      return NextResponse.json(
        { error: "Request has expired" },
        { status: 404 }
      );
    }

    const innovation = await db.innovation.findUnique({
      where: { id: request.innovationId },
    });

    return NextResponse.json(innovation, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to retrieve aggregate data",
      },
      { status: 500 }
    );
  }
}
