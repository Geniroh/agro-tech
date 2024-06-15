// // import { db } from "@/lib/db";
// // import { NextResponse } from "next/server";
// // import Joi from "joi";

// // // Define the schema for request validation
// // const schema = Joi.object({
// //   innovation_id: Joi.string().required(),
// // });

// // export async function GET(
// //   req: Request,
// //   { params }: { params: { id: string } }
// // ) {
// //   try {
// //     const { error, value } = schema.validate(params);
// //     if (error) {
// //       return NextResponse.json(
// //         { error: error.details[0].message },
// //         { status: 400 }
// //       );
// //     }

// //     const { id: innovation_id } = value;

// //     // Find the discussion for the given innovation_id
// //     const discussion = await db.innovationDiscussion.findUnique({
// //       where: { innovation_id },
// //       include: {
// //         comments: {
// //           include: {
// //             replies: true,
// //           },
// //         },
// //       },
// //     });

// //     if (!discussion) {
// //       return NextResponse.json(
// //         { error: "Discussion not found" },
// //         { status: 404 }
// //       );
// //     }

// //     // Calculate total likes and dislikes
// //     const totalLikes = discussion.comments.reduce((acc, comment) => {
// //       const commentLikes = comment.likes ?? 0;
// //       const replyLikes = comment.replies.reduce(
// //         (replyAcc, reply) => replyAcc + (reply.likes ?? 0),
// //         0
// //       );
// //       return acc + commentLikes + replyLikes;
// //     }, 0);

// //     const totalDislikes = discussion.comments.reduce((acc, comment) => {
// //       const commentDislikes = comment.dislikes ?? 0;
// //       const replyDislikes = comment.replies.reduce(
// //         (replyAcc, reply) => replyAcc + (reply.dislikes ?? 0),
// //         0
// //       );
// //       return acc + commentDislikes + replyDislikes;
// //     }, 0);

// //     const totalComments = discussion.comments.length;
// //     const totalReplies = discussion.comments.reduce(
// //       (acc, comment) => acc + comment.replies.length,
// //       0
// //     );

// //     return NextResponse.json(
// //       {
// //         message: "Aggregate data retrieved successfully",
// //         totalLikes,
// //         totalDislikes,
// //         totalComments,
// //         totalReplies,
// //       },
// //       { status: 200 }
// //     );
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json(
// //       {
// //         error: "Failed to retrieve aggregate data",
// //       },
// //       { status: 500 }
// //     );
// //   }
// // }

// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";
// import { auth } from "@/auth";
// import Joi from "joi";

// const postSchema = Joi.object({
//   innovation_id: Joi.string().required(),
//   reaction: Joi.string().valid("like", "dislike").required(),
// });

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { error, value } = postSchema.validate(body);
//     if (error) {
//       return NextResponse.json(
//         { error: error.details[0].message },
//         { status: 400 }
//       );
//     }

//     const { innovation_id, reaction } = value;
//     const session = await auth();

//     if (!session) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const userId = session.user.id;

//     const existingReaction = await db.innovationReaction.findUnique({
//       where: { userId_innovationId: { userId, innovationId: innovation_id } },
//     });

//     let updatedInnovation;

//     if (existingReaction) {
//       if (existingReaction.reaction === reaction) {
//         // Remove the reaction
//         await db.innovationReaction.delete({
//           where: {
//             userId_innovationId: { userId, innovationId: innovation_id },
//           },
//         });
//         updatedInnovation = await db.innovation.update({
//           where: { id: innovation_id },
//           data: {
//             [reaction + "s"]: { decrement: 1 },
//           },
//         });
//       } else {
//         // Update the reaction
//         await db.innovationReaction.update({
//           where: {
//             userId_innovationId: { userId, innovationId: innovation_id },
//           },
//           data: { reaction },
//         });
//         updatedInnovation = await db.innovation.update({
//           where: { id: innovation_id },
//           data: {
//             [reaction + "s"]: { increment: 1 },
//             [existingReaction.reaction + "s"]: { decrement: 1 },
//           },
//         });
//       }
//     } else {
//       // Add a new reaction
//       await db.innovationReaction.create({
//         data: {
//           userId,
//           innovationId: innovation_id,
//           reaction,
//         },
//       });
//       updatedInnovation = await db.innovation.update({
//         where: { id: innovation_id },
//         data: {
//           [reaction + "s"]: { increment: 1 },
//         },
//       });
//     }

//     return NextResponse.json(updatedInnovation, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       {
//         error: "Failed to update innovation reaction",
//       },
//       { status: 500 }
//     );
//   }
// }

// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";
// import Joi from "joi";

// // Define the schema for request validation
// const schema = Joi.object({
//   innovation_id: Joi.string().required(),
// });

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { error, value } = schema.validate(params);
//     if (error) {
//       return NextResponse.json(
//         { error: error.details[0].message },
//         { status: 400 }
//       );
//     }

//     const { id: innovation_id } = value;

//     // Find the discussion for the given innovation_id
//     const discussion = await db.innovationDiscussion.findUnique({
//       where: { innovation_id },
//       include: {
//         comments: {
//           include: {
//             replies: true,
//           },
//         },
//       },
//     });

//     if (!discussion) {
//       return NextResponse.json(
//         { error: "Discussion not found" },
//         { status: 404 }
//       );
//     }

//     // Calculate total likes and dislikes
//     const totalLikes = discussion.comments.reduce((acc, comment) => {
//       const commentLikes = comment.likes ?? 0;
//       const replyLikes = comment.replies.reduce(
//         (replyAcc, reply) => replyAcc + (reply.likes ?? 0),
//         0
//       );
//       return acc + commentLikes + replyLikes;
//     }, 0);

//     const totalDislikes = discussion.comments.reduce((acc, comment) => {
//       const commentDislikes = comment.dislikes ?? 0;
//       const replyDislikes = comment.replies.reduce(
//         (replyAcc, reply) => replyAcc + (reply.dislikes ?? 0),
//         0
//       );
//       return acc + commentDislikes + replyDislikes;
//     }, 0);

//     const totalComments = discussion.comments.length;
//     const totalReplies = discussion.comments.reduce(
//       (acc, comment) => acc + comment.replies.length,
//       0
//     );

//     return NextResponse.json(
//       {
//         message: "Aggregate data retrieved successfully",
//         totalLikes,
//         totalDislikes,
//         totalComments,
//         totalReplies,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       {
//         error: "Failed to retrieve aggregate data",
//       },
//       { status: 500 }
//     );
//   }
// }

import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Joi from "joi";

const postSchema = Joi.object({
  id: Joi.string().required(),
  reaction: Joi.string().valid("like", "dislike").required(),
});

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    console.log({ params, ...body });
    const { id } = params;
    const { error, value } = postSchema.validate({ id, ...body });
    if (error) {
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );
    }

    const { id: innovation_id, reaction } = value;
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const existingReaction = await db.innovationReaction.findUnique({
      where: { userId_innovationId: { userId, innovationId: innovation_id } },
    });

    let updatedInnovation;

    if (existingReaction) {
      if (existingReaction.reaction === reaction) {
        // Remove the reaction
        await db.innovationReaction.delete({
          where: {
            userId_innovationId: { userId, innovationId: innovation_id },
          },
        });
        updatedInnovation = await db.innovation.update({
          where: { id: innovation_id },
          data: {
            [reaction + "s"]: { decrement: 1 },
          },
        });
      } else {
        // Update the reaction
        await db.innovationReaction.update({
          where: {
            userId_innovationId: { userId, innovationId: innovation_id },
          },
          data: { reaction },
        });
        updatedInnovation = await db.innovation.update({
          where: { id: innovation_id },
          data: {
            [reaction + "s"]: { increment: 1 },
            [existingReaction.reaction + "s"]: { decrement: 1 },
          },
        });
      }
    } else {
      // Add a new reaction
      await db.innovationReaction.create({
        data: {
          userId,
          innovationId: innovation_id,
          reaction,
        },
      });
      updatedInnovation = await db.innovation.update({
        where: { id: innovation_id },
        data: {
          [reaction + "s"]: { increment: 1 },
        },
      });
    }

    return NextResponse.json(updatedInnovation, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to update innovation reaction",
      },
      { status: 500 }
    );
  }
}

// Define the schema for request validation
const getSchema = Joi.object({
  id: Joi.string().required(),
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { error, value } = getSchema.validate(params);
    if (error) {
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );
    }

    const { id: innovation_id } = value;

    const innovation = await db.innovation.findUnique({
      where: { id: innovation_id },
      include: {
        discussions: {
          include: {
            comments: {
              include: {
                replies: true,
              },
            },
          },
        },
      },
    });

    if (!innovation) {
      return NextResponse.json(
        { error: "Innovation not found" },
        { status: 404 }
      );
    }

    const totalLikes = innovation.likes ?? 0;
    const totalDislikes = innovation.dislikes ?? 0;
    const totalComments = innovation.discussions.reduce(
      (acc, discussion) => acc + discussion.comments.length,
      0
    );
    const totalReplies = innovation.discussions.reduce((acc, discussion) => {
      return (
        acc +
        discussion.comments.reduce(
          (commentAcc, comment) => commentAcc + comment.replies.length,
          0
        )
      );
    }, 0);

    return NextResponse.json(
      {
        message: "Aggregate data retrieved successfully",
        totalLikes,
        totalDislikes,
        totalComments,
        totalReplies,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to retrieve aggregate data",
      },
      { status: 500 }
    );
  }
}
