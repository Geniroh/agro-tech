import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import Joi from "joi";
import { auth } from "@/auth";

const getSchema = Joi.object({
  id: Joi.string().required(),
});
const postSchema = Joi.object({
  message: Joi.string().optional(),
  reaction: Joi.string().valid("like", "dislike").optional(),
});

const putSchema = Joi.object({
  title: Joi.string().required(),
});

const deleteSchema = Joi.object({
  id: Joi.string().required(),
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

    const discussion = await db.discussion.findFirst({
      where: { id },
      include: { replies: true, reactions: true, user: true },
    });

    let comments: any[] = [];
    if (discussion) {
      comments = await db.reply.findMany({
        where: { discussionId: discussion.id },
        include: { user: true },
      });
    }

    return NextResponse.json({ ...discussion, comments }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get discussions" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error, value } = postSchema.validate(await req.json());
    if (error) {
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );
    }

    const { message, reaction } = value;

    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    if (message) {
      const reply = await db.reply.create({
        data: {
          message,
          discussionId: params.id,
          userId,
        },
      });
      return NextResponse.json({ reply }, { status: 201 });
    }

    if (reaction) {
      const existingReaction = await db.reaction.findUnique({
        where: { userId_discussionId: { discussionId: params.id, userId } },
      });

      if (existingReaction) {
        if (existingReaction.type === reaction) {
          await db.reaction.delete({
            where: { userId_discussionId: { discussionId: params.id, userId } },
          });
        } else {
          await db.reaction.update({
            where: { userId_discussionId: { discussionId: params.id, userId } },
            data: { type: reaction },
          });
        }
      } else {
        await db.reaction.create({
          data: {
            type: reaction,
            discussionId: params.id,
            userId,
          },
        });
      }

      const discussion = await db.discussion.findUnique({
        where: { id: params.id },
      });
      const likeCount = await db.reaction.count({
        where: { discussionId: params.id, type: "like" },
      });
      const dislikeCount = await db.reaction.count({
        where: { discussionId: params.id, type: "dislike" },
      });

      await db.discussion.update({
        where: { id: params.id },
        data: {
          likes: likeCount,
          dislikes: dislikeCount,
        },
      });

      return NextResponse.json(
        {
          message: "Reaction updated",
          discussion,
          likes: likeCount,
          dislikes: dislikeCount,
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add reply or reaction" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error, value } = putSchema.validate(await req.json());
    if (error) {
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );
    }

    const { title } = value;

    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    const updatedDiscussion = await db.discussion.update({
      where: { id: params.id, userId },
      data: { title },
    });

    return NextResponse.json(
      { discussion: updatedDiscussion },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update discussion title" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error, value } = deleteSchema.validate(params);
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
    const userId = session.user.id;

    const deletedDiscussion = await db.discussion.delete({
      where: { id, userId },
    });

    return NextResponse.json(
      {
        message: "Discussion deleted successfully",
        discussion: deletedDiscussion,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete discussion" },
      { status: 500 }
    );
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import Joi from "joi";
// import { auth } from "@/auth";

// const getSchema = Joi.object({
//   id: Joi.string().required(),
//   userId: Joi.string().optional().allow(null),
//   title: Joi.string().optional().allow(null),
//   recent: Joi.boolean().optional().allow(null),
// });
// const postSchema = Joi.object({
//   message: Joi.string().optional(),
//   reaction: Joi.string().valid("like", "dislike").optional(),
// });

// const putSchema = Joi.object({
//   title: Joi.string().required(),
// });

// const deleteSchema = Joi.object({
//   id: Joi.string().required(),
// });

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const url = new URL(req.url);
//     const userId = url.searchParams.get("userId");
//     const title = url.searchParams.get("title");
//     const recent = url.searchParams.get("recent") === "true";

//     const { error, value } = getSchema.validate({
//       ...params,
//       userId,
//       title,
//       recent,
//     });

//     if (error) {
//       return NextResponse.json(
//         { error: error.details[0].message },
//         { status: 400 }
//       );
//     }

//     const { id } = value;

//     const session = await auth();
//     if (!session) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const filterConditions: any = { id };

//     if (userId) {
//       filterConditions.userId = userId;
//     }

//     if (title) {
//       filterConditions.title = { contains: title };
//     }

//     let discussions;

//     if (recent) {
//       discussions = await db.discussion.findMany({
//         where: filterConditions,
//         orderBy: {
//           createdAt: "desc",
//         },
//         include: { replies: true, reactions: true, user: true },
//       });
//     } else {
//       discussions = await db.discussion.findMany({
//         where: filterConditions,
//         include: { replies: true, reactions: true, user: true },
//       });
//     }

//     if (discussions.length === 0) {
//       return NextResponse.json(
//         { error: "Discussions not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ discussions }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to get discussions" },
//       { status: 500 }
//     );
//   }
// }
