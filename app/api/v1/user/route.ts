import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import Joi from "joi";

const querySchema = Joi.object({
  email: Joi.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const query = Object.fromEntries(url.searchParams.entries());

    const { error, value } = querySchema.validate(query);

    if (error) {
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );
    }

    const { email } = value;

    const user = await db.user.findFirst({ where: { email } });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 });
  }
}
