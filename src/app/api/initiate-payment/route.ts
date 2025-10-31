import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { jobapplication_id } = body;
    console.log("Easebuzz API jobapplication_id Response:", jobapplication_id);
    // ✅ Only send application_id
    const response = await fetch(
      `https://njportal.thenoncoders.in/api/v1/initiate_application_payment_ezb?application_id=${jobapplication_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_INTERNAL_KEY || "",
        },
      }
    );

    const result = await response.json();
    console.log("Easebuzz API Response:", result);

    if (result.status && result.data?.access_key?.data) {
      return NextResponse.json({
        success: true,
        redirect: `https://pay.easebuzz.in/pay/${result.data.access_key.data}`,
      });
    }

    return NextResponse.json({
      success: false,
      message: result,//.message || "Payment initiation failed",
    });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({
      success: false,
      message: "Server error while initiating payment",
    });
  }
}
