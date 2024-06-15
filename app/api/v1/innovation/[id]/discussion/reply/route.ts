import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Joi from "joi";

// Define the schema for request validation
const schema = Joi.object({
  commentId: Joi.string().required(),
  message: Joi.string().required(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { error, value } = schema.validate(body);
    if (error) {
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );
    }

    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { commentId, message } = value;
    const userId = session.user.id;

    const newReply = await db.commentReply.create({
      data: {
        message,
        userId,
        commentId,
      },
    });

    return NextResponse.json(
      {
        message: "Reply added successfully",
        reply: newReply,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to add reply",
      },
      { status: 500 }
    );
  }
}

// Define the schema for request validation
const postSchema = Joi.object({
  commentId: Joi.string().required(),
});

export async function GET(
  req: Request,
  { params }: { params: { commentId: string } }
) {
  try {
    const { error, value } = postSchema.validate(params);
    if (error) {
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );
    }

    const { commentId } = value;

    const replies = await db.commentReply.findMany({
      where: { commentId },
      include: {
        User: true, // Include user details
      },
    });

    return NextResponse.json(
      {
        message: "Replies retrieved successfully",
        replies,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to retrieve replies",
      },
      { status: 500 }
    );
  }
}
