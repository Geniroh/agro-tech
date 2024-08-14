import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import Joi from "joi";
import { auth } from "@/auth";

const postSchema = Joi.object({
  reply: Joi.string().required(),
  replyId: Joi.string().required(),
});

export async function POST(req: NextRequest) {
  try {
    const { error, value } = postSchema.validate(await req.json());
    if (error) {
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );
    }

    const { reply, replyId } = value;

    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userEmail = session?.user?.email || "";

    const replyPayload = {
      email: userEmail,
      message: reply,
      createdAt: Date.now(),
    };

    const updatedReply = await db.reply.update({
      where: { id: replyId },
      data: {
        subReplies: {
          push: replyPayload,
        },
      },
    });

    return NextResponse.json(updatedReply, { status: 201 });
  } catch (error) {
    console.error("Error adding subReply:", error);
    return NextResponse.json(
      { error: "Failed to add subReply" },
      { status: 500 }
    );
  }
}
