import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Joi from "joi";

// Define schema for the commentId parameter
const getReactionsSchema = Joi.object({
  commentId: Joi.string().required(),
});

const postReactionschema = Joi.object({
  commentId: Joi.string().required(),
  reaction: Joi.string().valid("like", "dislike").required(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { error, value } = postReactionschema.validate(body);
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

    const userId = session.user.id;
    const { commentId, reaction } = value;

    const existingReaction = await db.commentReaction.findUnique({
      where: {
        userId_commentId: {
          userId,
          commentId,
        },
      },
    });

    if (existingReaction) {
      // If the same reaction, remove it
      if (existingReaction.reaction === reaction) {
        await db.commentReaction.delete({
          where: { id: existingReaction.id },
        });

        // Update the comment likes/dislikes count
        if (reaction === "like") {
          await db.innovationComment.update({
            where: { id: commentId },
            data: { likes: { decrement: 1 } },
          });
        } else {
          await db.innovationComment.update({
            where: { id: commentId },
            data: { dislikes: { decrement: 1 } },
          });
        }

        return NextResponse.json(
          { message: `Removed ${reaction}` },
          { status: 200 }
        );
      } else {
        // Change the reaction
        await db.commentReaction.update({
          where: { id: existingReaction.id },
          data: { reaction },
        });

        // Update the comment likes/dislikes count
        if (reaction === "like") {
          await db.innovationComment.update({
            where: { id: commentId },
            data: {
              likes: { increment: 1 },
              dislikes: { decrement: 1 },
            },
          });
        } else {
          await db.innovationComment.update({
            where: { id: commentId },
            data: {
              likes: { decrement: 1 },
              dislikes: { increment: 1 },
            },
          });
        }

        return NextResponse.json(
          { message: `Changed reaction to ${reaction}` },
          { status: 200 }
        );
      }
    } else {
      // Add new reaction
      await db.commentReaction.create({
        data: {
          userId,
          commentId,
          reaction,
        },
      });

      // Update the comment likes/dislikes count
      if (reaction === "like") {
        await db.innovationComment.update({
          where: { id: commentId },
          data: { likes: { increment: 1 } },
        });
      } else {
        await db.innovationComment.update({
          where: { id: commentId },
          data: { dislikes: { increment: 1 } },
        });
      }

      return NextResponse.json(
        { message: `Added ${reaction}` },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to process reaction" },
      { status: 500 }
    );
  }
}

// GET handler to fetch all reactions for a specific comment
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { error, value } = getReactionsSchema.validate(body);
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

    const { commentId } = value;

    // Fetch all reactions for the specified comment
    const reactions = await db.commentReaction.findMany({
      where: { commentId },
      include: { User: true }, // Include user details if needed
    });

    if (!reactions || reactions.length === 0) {
      return NextResponse.json(
        { error: "No reactions found for this comment" },
        { status: 404 }
      );
    }

    return NextResponse.json({ reactions }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to get reactions" },
      { status: 500 }
    );
  }
}
