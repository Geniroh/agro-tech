// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import Joi from "joi";

// const querySchema = Joi.object({
//   name: Joi.string().optional(),
//   phase: Joi.string().optional(),
//   country: Joi.string().optional(),
//   chain:Joi.string().optional(),
//   year: Joi.string().optional(),
//   status: Joi.string().optional(),
// });

// export async function GET(req: NextRequest) {
//   try {
//     const url = new URL(req.url);
//     const query = Object.fromEntries(url.searchParams.entries());

//     const { error, value } = querySchema.validate(query, {
//       allowUnknown: true,
//     });
//     if (error) {
//       return NextResponse.json(
//         { error: error.details[0].message },
//         { status: 400 }
//       );
//     }

//     const { ...filters } = value;

//     const where: any = {};
//     if (filters.name) {
//       where.productName = { contains: filters.name, mode: "insensitive" };
//     }
//     if (filters.phase) {
//       where.productPhase = { contains: filters.phase };
//     }
//     if (filters.country) {
//       where.country = { contains: filters.country };
//     }
//     if (filters.year) {
//       where.yearInvented = { contains: filters.year };
//     }

//     const [innovations, totalCount] = await Promise.all([
//       db.innovation.findMany({
//         where,
//         include: { discussions: true, reactions: true, _count: true },
//       }),
//       db.innovation.count({ where }),
//     ]);

//     return NextResponse.json({
//       data: innovations,
//       totalCount,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to get innovations" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import Joi from "joi";

const querySchema = Joi.object({
  name: Joi.string().optional(),
  phase: Joi.string().optional(),
  country: Joi.string().optional(),
  chain: Joi.string().optional(),
  year: Joi.string().optional(),
  month: Joi.string().optional(),
  status: Joi.string().optional(),
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

    const { ...filters } = value;

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
    if (filters.chain) {
      where.productChain = { has: filters.chain }; // Filters for productChain array
    }
    if (filters.month) {
      where.month = { contains: filters.month };
    }

    const [innovations, totalCount] = await Promise.all([
      db.innovation.findMany({
        where,
        include: { discussions: true, reactions: true, _count: true },
      }),
      db.innovation.count({ where }),
    ]);

    return NextResponse.json({
      data: innovations,
      totalCount,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get innovations" },
      { status: 500 }
    );
  }
}
