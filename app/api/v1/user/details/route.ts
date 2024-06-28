import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import Joi from "joi";

const postSchema = Joi.object({
  username: Joi.string().optional().allow(null),
  phone: Joi.string().optional().allow(null),
  occupation: Joi.string().optional().allow(null),
  country: Joi.string().optional().allow(null),
  state: Joi.string().optional().allow(null),
  lga: Joi.string().optional().allow(null),
  address: Joi.string().optional().allow(null),
  company_name: Joi.string().optional().allow(null),
  association: Joi.string().optional().allow(null),
  position: Joi.string().optional().allow(null),
});

export async function GET(req: Request, res: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const userDetails = await db.userDetails.findFirst({ where: { userId } });

    return NextResponse.json(
      {
        details: userDetails,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to get user details" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { error, value } = postSchema.validate(body, {
      allowUnknown: true,
    });

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

    const isFIlled = await db.userDetails.findFirst({ where: { userId } });

    if (isFIlled) {
      const updatedDetails = await db.userDetails.update({
        where: { userId },
        data: { ...value },
      });
      return NextResponse.json({ details: updatedDetails }, { status: 200 });
    } else {
      const newDetails = await db.userDetails.create({
        data: {
          userId,
          username: value.username,
          phone: value.phone,
          occupation: value.occupation,
          country: value.country,
          state: value.state,
          lga: value.lga,
          address: value.address,
          company_name: value.company_name,
          position: value.position,
          association: value.association,
        },
      });

      return NextResponse.json({ details: newDetails }, { status: 201 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed update user details" },
      { status: 500 }
    );
  }
}
