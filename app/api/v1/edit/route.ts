import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { auth } from "@/auth";
import Joi from "joi";

const postSchema = Joi.object({
  email: Joi.string().required(),
  title: Joi.string().required(),
  innovationId: Joi.string().required(),
});

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { error, value } = postSchema.validate(body);
    if (error) {
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );
    }

    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const { email, innovationId, title } = value;

    await db.editInnovation.create({
      data: {
        email,
        innovationId,
        title,
        token,
        expires: Date.now(),
      },
    });

    return NextResponse.json({ data: "Request sent" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send request" },
      { status: 500 }
    );
  }
}
