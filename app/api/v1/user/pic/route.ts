import { auth } from "@/auth";
import { db } from "@/lib/db";
import Joi from "joi";
import { NextResponse } from "next/server";

const putSchema = Joi.object({
  url: Joi.string().required(),
});

export async function PUT(req: Request, res: Response) {
  try {
    const session = await auth();
    const body = await req.json();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { error, value } = putSchema.validate(body);

    if (error) {
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );
    }

    const userId = session.user.id;

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        image: value.url,
      },
    });

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed update user details" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, res: Response) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        image: "",
      },
    });

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed update user details" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request, res: Response) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const updatedUser = await db.user.findFirst({
      where: { id: userId },
    });

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed update user details" },
      { status: 500 }
    );
  }
}
