// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";
// import { auth } from "@/auth";
// import Joi from "joi";

// // Define the schema for request validation
// const schema = Joi.object({
//   replyId: Joi.string().required(),
//   reaction: Joi.string().valid("like", "dislike").required(),
// });

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { error, value } = schema.validate(body);
//     if (error) {
//       return NextResponse.json(
//         { error: error.details[0].message },
//         { status: 400 }
//       );
//     }

//     const session = await auth();
//     if (!session) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const userId = session.user.id;
//     const { replyId, reaction } = value;

//     const existingReaction = await db.commentReplyReaction.findUnique({
//       where: {
//         userId_replyId: {
//           userId,
//           replyId,
//         },
//       },
//     });

//     if (existingReaction) {
//       // If the same reaction, remove it
//       if (existingReaction.reaction === reaction) {
//         await db.commentReplyReaction.delete({
//           where: { id: existingReaction.id },
//         });

//         // Update the reply likes/dislikes count
//         if (reaction === "like") {
//           await db.commentReply.update({
//             where: { id: replyId },
//             data: { likes: { decrement: 1 } },
//           });
//         } else {
//           await db.commentReply.update({
//             where: { id: replyId },
//             data: { dislikes: { decrement: 1 } },
//           });
//         }

//         return NextResponse.json(
//           { message: `Removed ${reaction}` },
//           { status: 200 }
//         );
//       } else {
//         // Change the reaction
//         await db.commentReplyReaction.update({
//           where: { id: existingReaction.id },
//           data: { reaction },
//         });

//         // Update the reply likes/dislikes count
//         if (reaction === "like") {
//           await db.commentReply.update({
//             where: { id: replyId },
//             data: {
//               likes: { increment: 1 },
//               dislikes: { decrement: 1 },
//             },
//           });
//         } else {
//           await db.commentReply.update({
//             where: { id: replyId },
//             data: {
//               likes: { decrement: 1 },
//               dislikes: { increment: 1 },
//             },
//           });
//         }

//         return NextResponse.json(
//           { message: `Changed reaction to ${reaction}` },
//           { status: 200 }
//         );
//       }
//     } else {
//       // Add new reaction
//       await db.commentReplyReaction.create({
//         data: {
//           userId,
//           replyId,
//           reaction,
//         },
//       });

//       // Update the reply likes/dislikes count
//       if (reaction === "like") {
//         await db.commentReply.update({
//           where: { id: replyId },
//           data: { likes: { increment: 1 } },
//         });
//       } else {
//         await db.commentReply.update({
//           where: { id: replyId },
//           data: { dislikes: { increment: 1 } },
//         });
//       }

//       return NextResponse.json(
//         { message: `Added ${reaction}` },
//         { status: 200 }
//       );
//     }
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Failed to process reaction" },
//       { status: 500 }
//     );
//   }
// }

import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Joi from "joi";

// Define the schema for request validation
const schema = Joi.object({
  replyId: Joi.string().required(),
  reaction: Joi.string().valid("like", "dislike").required(),
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

    const userId = session.user.id;
    const { replyId, reaction } = value;

    const existingReaction = await db.commentReplyReaction.findUnique({
      where: {
        userId_replyId: {
          userId,
          replyId,
        },
      },
    });

    if (existingReaction) {
      // If the same reaction, remove it
      if (existingReaction.reaction === reaction) {
        await db.commentReplyReaction.delete({
          where: { id: existingReaction.id },
        });

        // Update the reply likes/dislikes count
        if (reaction === "like") {
          await db.commentReply.update({
            where: { id: replyId },
            data: { likes: { decrement: 1 } },
          });
        } else {
          await db.commentReply.update({
            where: { id: replyId },
            data: { dislikes: { decrement: 1 } },
          });
        }

        // Fetch the updated reply
        const updatedReply = await db.commentReply.findUnique({
          where: { id: replyId },
        });

        return NextResponse.json(
          { message: `Removed ${reaction}`, reply: updatedReply },
          { status: 200 }
        );
      } else {
        // Change the reaction
        await db.commentReplyReaction.update({
          where: { id: existingReaction.id },
          data: { reaction },
        });

        // Update the reply likes/dislikes count
        if (reaction === "like") {
          await db.commentReply.update({
            where: { id: replyId },
            data: {
              likes: { increment: 1 },
              dislikes: { decrement: 1 },
            },
          });
        } else {
          await db.commentReply.update({
            where: { id: replyId },
            data: {
              likes: { decrement: 1 },
              dislikes: { increment: 1 },
            },
          });
        }

        // Fetch the updated reply
        const updatedReply = await db.commentReply.findUnique({
          where: { id: replyId },
        });

        return NextResponse.json(
          { message: `Changed reaction to ${reaction}`, reply: updatedReply },
          { status: 200 }
        );
      }
    } else {
      // Add new reaction
      await db.commentReplyReaction.create({
        data: {
          userId,
          replyId,
          reaction,
        },
      });

      // Update the reply likes/dislikes count
      if (reaction === "like") {
        await db.commentReply.update({
          where: { id: replyId },
          data: { likes: { increment: 1 } },
        });
      } else {
        await db.commentReply.update({
          where: { id: replyId },
          data: { dislikes: { increment: 1 } },
        });
      }

      // Fetch the updated reply
      const updatedReply = await db.commentReply.findUnique({
        where: { id: replyId },
      });

      return NextResponse.json(
        { message: `Added ${reaction}`, reply: updatedReply },
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
