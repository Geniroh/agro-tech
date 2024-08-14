import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import Joi from "joi";
import { auth } from "@/auth";

const postSchema = Joi.object({
  reply: Joi.string(),
  replyId: Joi.string(),
});

const getSchema = Joi.object({
  id: Joi.string(),
  replyId: Joi.string(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; replyId: string } }
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

    const { id, replyId } = value;

    console.log({ replyId });

    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (id) {
      const replies = await db.reply.findUnique({
        where: { id: replyId, discussionId: id },
      });
      return NextResponse.json(replies, { status: 200 });
    } else {
      return NextResponse.json({ error: "Replies not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get discussions" },
      { status: 500 }
    );
  }
}
