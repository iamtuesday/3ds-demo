import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ message: "Success" });
  } catch (err) {
    return NextResponse.json({ message: "Error", err });
  }
}

export async function POST(request: Request, response: Response) {
  console.log("request.body", request.body);

  try {
    return NextResponse.json(
      { message: "Success" },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Errr", err },
      {
        status: 500,
      }
    );
  }
}
