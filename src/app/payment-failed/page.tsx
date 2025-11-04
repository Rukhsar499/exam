"use client";

import { XCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentFailedPage() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-blue to-ornage-100 px-6">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 text-center border border-blue-100">
        <div className="flex justify-center mb-6">
          <XCircle className="w-20 h-20 text-red-500" />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Payment Failed
        </h2>
        <p className="text-gray-600 mb-6">
          Unfortunately, your payment could not be processed at this time.  
          Please try again or contact our support team if the issue persists.
        </p>

       

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/jobs"
            className="bg-gray-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-900 transition-all"
          >
            Back to Job Listings
          </Link>
          <Link
            href="/contact"
            className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-all"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
}
