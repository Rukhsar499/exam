import { NextResponse } from "next/server";

interface EasebuzzCallbackData {
  txnid?: string;
  payment_status?: string;
  status?: string;
  easepay_status?: string;
  [key: string]: string | undefined;
}

export async function POST(req: Request) {
  try {
    // Get form or URL-encoded data safely
    let entries: EasebuzzCallbackData = {};
    try {
      const data = await req.formData();
      entries = Object.fromEntries(data.entries()) as EasebuzzCallbackData;
    } catch {
      const body = await req.text();
      entries = Object.fromEntries(new URLSearchParams(body)) as EasebuzzCallbackData;
    }

    console.log("Easebuzz Callback Data:", entries);

    // Send callback to backend
    const res = await fetch("https://njportal.thenoncoders.in/api/v1/confirm_payment_ezb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_INTERNAL_KEY || "",
      },
      body: JSON.stringify(entries),
    });

    const backendResponse = await res.json();
    console.log("Backend Response:", backendResponse);

    const txnid =
      entries.txnid || backendResponse?.data?.txnid || "";

    const paymentstatus =
      entries.payment_status ||
      entries.status ||
      entries.easepay_status ||
      backendResponse?.data?.payment_status ||
      "failed";

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL?.trim() || "http://localhost:3000";

    const redirectUrl =
      paymentstatus.toLowerCase() === "success"
        ? `${baseUrl}/payment-success`
        : `${baseUrl}/payment-failed`;

    console.log("➡️ Redirecting to:", redirectUrl);

    return new Response(null, {
      status: 302,
      headers: { Location: redirectUrl },
    });
  } catch (err) {
    console.error("🔥 Error in Easebuzz Callback:", err);
    return NextResponse.json({ error: "callback error" });
  }
}
