import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { txnid } = await req.json();

    console.log("Confirming payment for txnid:", txnid);

    const response = await fetch(
      `https://njportal.thenoncoders.in/api/v1/confirm_payment_ezb?txnid=${txnid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_INTERNAL_KEY || "",
        },
      }
    );

    const result = await response.json();
    console.log("Payment Confirmation Response:", result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error confirming payment:", error);
    return NextResponse.json({
      success: false,
      message: "Server error while confirming payment",
    });
  }
}
