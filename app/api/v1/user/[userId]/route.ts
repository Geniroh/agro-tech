import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";
import Joi from "joi";
import { db } from "@/lib/db";

const getSchema = Joi.object({
  userId: Joi.string().required(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error, value } = getSchema.validate({
      ...params,
    });

    if (error) {
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );
    }

    const { id } = value;

    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findFirst({ where: { id } });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 });
  }
}

export async function POST(request: Request, response: Response) {
  const requestBody = await request.json();

  return NextResponse.json({ requestBody });
}
