import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newInnovation = await db.innovation.create({
      data: {
        productName: body.innovation_name,
        yearInvented: body.innovation_year,
        country: body.innovation_country,
        cost: Number(body.innovation_cost),
        productChain: body.innovation_value_chain,
        productPhase: body.innovation_phase,
        productUse: [body.product_usage],
        productDescription: body.product_description,
        productMedia: [body.product_media],
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

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const innovations = await db.innovation.findMany();

    return NextResponse.json(innovations);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to get innovations" });
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/db";

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();

//     const newInnovation = await db.innovation.create({
//       data: {
//         productName: body.innovation_name,
//         yearInvented: body.innovation_year,
//         country: body.innovation_country,
//         cost: Number(body.innovation_cost),
//         productChain: body.innovation_value_chain,
//         productPhase: body.innovation_phase,
//         productUse: [body.product_usage],
//         productDescription: body.product_description,
//         productMedia: [body.product_media],
//         isExample: body.isUsageExample,
//         productExample: body.instances,
//         productInstruction: body.instructions,
//         productInventor: body.inventor,
//         productSupplier: body.supplier,
//         productGuidelines: body.hseguidelines,
//         isGenderFriendly: body.isGenderFriendly,
//         productGenderDescription: body.gender_description,
//       },
//     });

//     return NextResponse.json(newInnovation);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to create new innovation" }, { status: 500 });
//   }
// }

// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");
//     const country = searchParams.get("country");

//     if (id) {
//       const innovation = await db.innovation.findUnique({ where: { id } });
//       if (!innovation) {
//         return NextResponse.json({ error: "Innovation not found" }, { status: 404 });
//       }
//       return NextResponse.json(innovation);
//     }

//     let filter = {};
//     if (country) {
//       filter = { ...filter, country };
//     }

//     const innovations = await db.innovation.findMany({ where: filter });

//     return NextResponse.json(innovations);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to get innovations" }, { status: 500 });
//   }
// }

// export async function PUT(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { id } = body;

//     if (!id) {
//       return NextResponse.json({ error: "ID is required" }, { status: 400 });
//     }

//     const updatedInnovation = await db.innovation.update({
//       where: { id },
//       data: {
//         productName: body.innovation_name,
//         yearInvented: body.innovation_year,
//         country: body.innovation_country,
//         cost: Number(body.innovation_cost),
//         productChain: body.innovation_value_chain,
//         productPhase: body.innovation_phase,
//         productUse: [body.product_usage],
//         productDescription: body.product_description,
//         productMedia: [body.product_media],
//         isExample: body.isUsageExample,
//         productExample: body.instances,
//         productInstruction: body.instructions,
//         productInventor: body.inventor,
//         productSupplier: body.supplier,
//         productGuidelines: body.hseguidelines,
//         isGenderFriendly: body.isGenderFriendly,
//         productGenderDescription: body.gender_description,
//       },
//     });

//     return NextResponse.json(updatedInnovation);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to update innovation" }, { status: 500 });
//   }
// }
