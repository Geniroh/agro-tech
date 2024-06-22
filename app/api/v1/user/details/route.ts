import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import Joi from "joi";

const postSchema = Joi.object({
  username: Joi.string().optional(),
  phone: Joi.string().optional(),
  occupation: Joi.string().optional(),
  country: Joi.string().optional(),
  state: Joi.string().optional(),
  lga: Joi.string().optional(),
  address: Joi.string().optional(),
  company_name: Joi.string().optional(),
  association: Joi.string().optional(),
  position: Joi.string().optional(),
});

export async function PUT(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { error, value } = postSchema.validate(body);

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
