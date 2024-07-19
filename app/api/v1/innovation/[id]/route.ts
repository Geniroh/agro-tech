import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import Joi from "joi";

const getSchema = Joi.object({
  id: Joi.string().required(),
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    const { error, value } = getSchema.validate(params);

    if (error) {
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );
    }

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = value;

    const innovation = await db.innovation.findUnique({
      where: { id },
      include: { reactions: true, discussions: true },
    });
    if (!innovation) {
      return NextResponse.json(
        { error: "Innovation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(innovation);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to get innovation" });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const session = await auth();
    const innovationId = params.id;
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedInnovation = await db.innovation.update({
      where: { id: innovationId },
      data: {
        ...body,
        status: "pending",
      },
    });

    return NextResponse.json(
      {
        message: "Updated successfully",
        updatedInnovation,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update innovation" },
      { status: 500 }
    );
  }
}
