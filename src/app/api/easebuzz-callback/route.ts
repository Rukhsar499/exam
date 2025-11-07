import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Form data from Easebuzz
    const data = await req.formData();
    const entries = Object.fromEntries(data.entries());
    console.log("Easebuzz Payment Callback:", entries);

    // ✅ Send callback to backend
    const res = await fetch("https://njportal.thenoncoders.in/api/v1/confirm_payment_ezb", {
      method: "POST",
      headers: { "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_INTERNAL_KEY || "" },
      body: JSON.stringify(entries),
    });

    const backendResponse = await res.json();
    console.log("Backend confirm_payment_ezb Response:", backendResponse);

    const txnid = entries.txnid || backendResponse?.data?.txnid || "";
    const paymentstatus =
      entries.payment_status || backendResponse?.data?.payment_status || "failed";

    // ✅ Base URL safety (detect if env missing)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.trim() || "http://localhost:3000/";

    // console.log("🌐 Using base URL:", baseUrl);
    // console.log("📦 Payment Status:", paymentstatus);
  //  window.location.href="http://localhost:3000/payment-failed"
    // ✅ Build redirect URL
    let redirectUrl = "";
    if (paymentstatus.toLowerCase() === "success") {
      redirectUrl = `${baseUrl}payment-success`;
    } else {
      redirectUrl = `${baseUrl}payment-failed`;
    }

    console.log("➡️ Redirecting to:", redirectUrl);

    // ✅ Validate before redirect
    // try {
    //   new URL(redirectUrl);
    // } catch (err) {
    //   console.error("❌ Invalid redirect URL generated:", redirectUrl);
    //   return NextResponse.json({ error: "Invalid redirect URL", redirectUrl, baseUrl });
    // }

    // Redirect to frontend page
    // return NextResponse.redirect(redirectUrl);
    return new Response(null, {
      status: 302,
      headers: { Location: redirectUrl },
    });
  } catch (err) {
    console.error("🔥 Error in Easebuzz Callback:", err);
    return NextResponse.json({ error: "callback error" });
  }
}
