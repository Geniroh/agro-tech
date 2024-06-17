import { NextResponse } from "next/server";

export async function GET(request: Request, response: Response) {
  return Response.json({ message: "Hello World From API" }, { status: 200 });
}

export async function POST(request: Request, response: Response) {
  const requestBody = await request.json();

  return NextResponse.json({ requestBody });
}
