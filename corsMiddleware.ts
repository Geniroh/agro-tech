import { NextRequest, NextResponse } from "next/server";
import Cors from "cors";

// Initializing the cors middleware
const cors = Cors({
  origin: "https://stavmia.org", // Allow only this origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

// Helper method to wait for middleware to execute before continuing
function runMiddleware(req: NextRequest, res: NextResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
