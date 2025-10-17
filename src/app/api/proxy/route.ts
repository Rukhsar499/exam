import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Expecting endpoint and data in body
    const { endpoint, body } = await req.json();

    if (!endpoint) {
      return NextResponse.json(
        { status: false, message: "Endpoint missing" },
        { status: 400 }
      );
    }

    // External API call (POST)
    const res = await fetch(`https://njportal.thenoncoders.in/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_INTERNAL_KEY || "",
      },
      body: JSON.stringify(body),
    });

    let data;
    try {
      data = await res.json();
    } catch (jsonErr: unknown) {
      console.error("JSON parse error:", jsonErr);
      data = { status: false, message: "Invalid JSON response from API" };
    }

    console.log(`[API Proxy] Endpoint: ${endpoint}`, data);

    return NextResponse.json(data, { status: res.status });
  } catch (err: unknown) {
    console.error("[API Proxy Error]:", err);
    return NextResponse.json(
      { status: false, message: "Server error" },
      { status: 500 }
    );
  }
  }
