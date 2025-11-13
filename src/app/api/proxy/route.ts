import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { endpoint, body } = await req.json();

    if (!endpoint) {
      return NextResponse.json({ status: false, message: "Endpoint missing" }, { status: 400 });
    }

    const res = await fetch(`https://njportal.thenoncoders.in/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_INTERNAL_KEY || "",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("[API Proxy Error]:", err);
    return NextResponse.json({ status: false, message: "Server error" }, { status: 500 });
  }
}
