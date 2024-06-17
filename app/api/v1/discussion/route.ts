import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Joi from "joi";
import { auth } from "@/auth";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const discussions = await db.discussion.findMany();

    return NextResponse.json(discussions);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to get discussions" });
  }
}

const postSchema = Joi.object({
  title: Joi.string().required(),
  message: Joi.string().required(),
});

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { error, value } = postSchema.validate(body);
    if (error) {
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );
    }

    const { title, message } = value;

    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    const newDiscussion = await db.discussion.create({
      data: {
        message,
        title,
        userId,
      },
    });

    return NextResponse.json(
      {
        message: "Discussion started successfully",
        discussion: newDiscussion,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to start a Discussion",
      },
      { status: 500 }
    );
  }
}
