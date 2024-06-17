import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import Joi from "joi";

const schema = Joi.object({
  innovation_id: Joi.string().required(),
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { error, value } = schema.validate({ innovation_id: params.id });
    if (error) {
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );
    }

    const discussion = await db.innovationDiscussion.findUnique({
      where: { innovation_id: value.innovation_id },
      include: { comments: true },
    });

    // if (!discussion) {
    //   return NextResponse.json(
    //     { error: "Discussion not found" },
    //     { status: 404 }
    //   );
    // }
    if (!discussion) {
      return NextResponse.json(
        {
          message: "Discussion not found",
          comments: [],
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "Comments retrieved successfully",
        comments: discussion.comments,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to retrieve comments",
      },
      { status: 500 }
    );
  }
}
