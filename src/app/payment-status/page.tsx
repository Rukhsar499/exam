"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type PaymentStatus = {
  status: boolean;
  data?: {
    txnid?: string;
    easepayid?: string;
    amount?: string;
    message?: string;
  };
  message?: string;
};

export default function PaymentStatus() {
  const params = useSearchParams();
  const [statusData, setStatusData] = useState<PaymentStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const txnid = params.get("txnid");

    if (txnid) {
      confirmPayment(txnid);
    }
  }, [params]);

  const confirmPayment = async (txnid: string) => {
    try {
      const res = await fetch("/api/confirm-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ txnid }),
      });

      const data: PaymentStatus = await res.json();
      console.log("Confirm Payment Data:", data);

      setStatusData(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching payment status:", err);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-10">Checking Payment Status...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center w-[400px]">
        {statusData?.status ? (
          <>
            <h2 className="text-2xl font-bold text-green-600 mb-3">Payment Successful 🎉</h2>
            <p className="text-gray-700 mb-2">Transaction ID: {statusData.data?.txnid}</p>
            <p className="text-gray-700 mb-2">Payment ID: {statusData.data?.easepayid}</p>
            <p className="text-gray-700 mb-2">Amount: ₹{statusData.data?.amount}</p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-3">Payment Failed ❌</h2>
            <p className="text-gray-700">{statusData?.message || "Please try again."}</p>
          </>
        )}
      </div>
    </div>
  );
}
