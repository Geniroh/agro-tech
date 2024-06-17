import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import Joi from "joi";

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

// export async function GET(req: NextRequest, res: NextResponse) {
//   try {
//     const innovations = await db.innovation.findMany();

//     return NextResponse.json(innovations);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to get innovations" });
//   }
// }

// Define the validation schema
const querySchema = Joi.object({
  name: Joi.string().optional(),
  phase: Joi.string().optional(),
  country: Joi.string().optional(),
  year: Joi.string().optional(),
  page: Joi.number().integer().min(1).default(1),
  pageSize: Joi.number().integer().min(1).max(100).default(10),
  // minLikes: Joi.number().integer().min(0).optional(),
  // maxLikes: Joi.number().integer().min(0).optional(),
  // createdAfter: Joi.date().iso().optional(),
  // createdBefore: Joi.date().iso().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const query = Object.fromEntries(url.searchParams.entries());

    const { error, value } = querySchema.validate(query, {
      allowUnknown: true,
    });
    if (error) {
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );
    }

    const { page, pageSize, ...filters } = value;

    // Calculate offset for pagination
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const where: any = {};
    if (filters.name) {
      where.productName = { contains: filters.name, mode: "insensitive" };
    }
    if (filters.phase) {
      where.productPhase = { contains: filters.phase };
    }
    if (filters.country) {
      where.country = { contains: filters.country };
    }
    if (filters.year) {
      where.yearInvented = { contains: filters.year };
    }
    // if (filters.minLikes !== undefined) {
    //   where.likes = { gte: filters.minLikes };
    // }
    // if (filters.maxLikes !== undefined) {
    //   where.likes = { lte: filters.maxLikes };
    // }
    // if (filters.createdAfter) {
    //   where.createdAt = { gte: new Date(filters.createdAfter) };
    // }
    // if (filters.createdBefore) {
    //   where.createdAt = { lte: new Date(filters.createdBefore) };
    // }

    // const innovations = await db.innovation.findMany({ where });

    // return NextResponse.json(innovations);

    // Fetch paginated data from the database
    const [innovations, totalCount] = await Promise.all([
      db.innovation.findMany({
        where,
        skip,
        take,
      }),
      db.innovation.count({ where }),
    ]);

    return NextResponse.json({
      data: innovations,
      page,
      pageSize,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to get innovations" },
      { status: 500 }
    );
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import Joi from "joi";

// Define the validation schema
// const querySchema = Joi.object({
//   name: Joi.string().optional(),
//   minLikes: Joi.number().integer().min(0).optional(),
//   maxLikes: Joi.number().integer().min(0).optional(),
//   createdAfter: Joi.date().iso().optional(),
//   createdBefore: Joi.date().iso().optional(),
//   page: Joi.number().integer().min(1).default(1),
//   pageSize: Joi.number().integer().min(1).max(100).default(10),
// });

// export async function GET(req: NextRequest) {
//   try {
//     const url = new URL(req.url);
//     const query = Object.fromEntries(url.searchParams.entries());

//     // Validate query parameters
//     const { error, value } = querySchema.validate(query, { allowUnknown: true });
//     if (error) {
//       return NextResponse.json({ error: error.details[0].message }, { status: 400 });
//     }

//     const { page, pageSize, ...filters } = value;

//     // Calculate offset for pagination
//     const skip = (page - 1) * pageSize;
//     const take = pageSize;

//     // Construct the where clause for Prisma
//     const where: any = {};
//     if (filters.name) {
//       where.name = { contains: filters.name, mode: "insensitive" };
//     }
//     if (filters.minLikes !== undefined) {
//       where.likes = { gte: filters.minLikes };
//     }
//     if (filters.maxLikes !== undefined) {
//       where.likes = { lte: filters.maxLikes };
//     }
//     if (filters.createdAfter) {
//       where.createdAt = { gte: new Date(filters.createdAfter) };
//     }
//     if (filters.createdBefore) {
//       where.createdAt = { lte: new Date(filters.createdBefore) };
//     }

//     // Fetch paginated data from the database
//     const [innovations, totalCount] = await Promise.all([
//       db.innovation.findMany({
//         where,
//         skip,
//         take,
//       }),
//       db.innovation.count({ where }),
//     ]);

//     return NextResponse.json({
//       data: innovations,
//       page,
//       pageSize,
//       totalCount,
//       totalPages: Math.ceil(totalCount / pageSize),
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to get innovations" }, { status: 500 });
//   }
// }
