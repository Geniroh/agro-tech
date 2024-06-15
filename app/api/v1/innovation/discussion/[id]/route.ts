import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import Joi from "joi";

// Define the schema for request validation
const schema = Joi.object({
  innovation_id: Joi.string().required(),
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
  res: Response
) {
  try {
    const { id } = params;

    // Parse and validate the query parameters
    const url = new URL(req.url);
    const innovation_id = url.searchParams.get("innovation_id");
    const { error, value } = schema.validate({ innovation_id });
    if (error) {
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );
    }

    // Find the discussion for the given innovation_id
    const discussion = await db.innovationDiscussion.findUnique({
      where: { innovation_id: value.innovation_id },
      include: { comments: true }, // Include all related comments
    });

    if (!discussion) {
      return NextResponse.json(
        { error: "Discussion not found" },
        { status: 404 }
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
