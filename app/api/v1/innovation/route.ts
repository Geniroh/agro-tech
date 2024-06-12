import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // const newInnovation = await db.innovation.create({ data: { ...body } });

    const newInnovation = await db.innovation.create({
      data: {
        productName: body.innovation_name,
        yearInvented: body.innovation_year,
        country: body.innovation_country,
        cost: Number(body.innovation_cost),
        productChain: [body.innovation_value_chain],
        productPhase: body.innovation_phase,
        productUse: [body.product_usage],
        productDescription: body.product_description,
        productMedia: body.product_media,
        isExample: body.isUsageExample,
        productExample: body.instances,
        productInstruction: body.instructions,
        productInventor: body.inventor,
        productSupplier: body.supplier,
        productGuidelines: body.hseguidelines,
        isGenderFriendly: body.isGenderFriendly,
        productGenderDescription: body.gender_description,
      },
    });

    return NextResponse.json(newInnovation);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create new innovation" });
  }
}
