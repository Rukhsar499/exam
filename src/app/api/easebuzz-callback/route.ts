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

    // ✅ After saving payment data, redirect to payment-status page
    const txnid = entries.txnid || backendResponse?.data?.txnid || "";
    const status = entries.status || backendResponse?.data?.status || "failed";
    const paymentstatus = entries.payment_status || backendResponse?.data?.payment_status || "failed";

    console.log("Error in Easebuzz Callback:",txnid+": status-"+status+": payment_status-"+paymentstatus);
    if(paymentstatus=="Success")
    {
        const sredirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/payment-success`;
        return NextResponse.redirect(sredirectUrl);
       }
    else
        {
        const fredirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/payment-failed`;
        return NextResponse.redirect(fredirectUrl);
        }


    //const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/payment-status?txnid=${txnid}&status=${status}`;
//const redirectUrl = `http://localhost:3000/confirm-payment?txnid=${txnid}&status=${status}`;
    //return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error("Error in Easebuzz Callback:", err);
    return NextResponse.json({ error: "callback error" });
  }
}
