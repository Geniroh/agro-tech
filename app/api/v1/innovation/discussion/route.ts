import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Joi from "joi";

const schema = Joi.object({
  innovation_id: Joi.string().required(),
  message: Joi.string().required(),
});

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { error, value } = schema.validate(body);
    if (error) {
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );
    }

    const { innovation_id, message } = value;

    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const username = session.user.name || "Anonymous";
    const email = session.user.email;
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const isDiscussion = await db.innovationDiscussion.findFirst({
      where: { innovation_id: innovation_id },
    });

    if (isDiscussion) {
      const newComment = await db.innovationComment.create({
        data: {
          username,
          email,
          message,
          innovationDiscussionId: isDiscussion.id,
        },
      });

      return NextResponse.json(
        {
          message: "Comment added to existing discussion",
          comment: newComment,
        },
        { status: 200 }
      );
    } else {
      const newInnovationDiscussion = await db.innovationDiscussion.create({
        data: {
          innovation_id: innovation_id,
          comments: {
            create: [
              {
                username,
                email,
                message,
              },
            ],
          },
        },
      });

      return NextResponse.json(
        {
          message: "New discussion created and comment added",
          discussion: newInnovationDiscussion,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to start an Innovation Discussion",
      },
      { status: 500 }
    );
  }
}
