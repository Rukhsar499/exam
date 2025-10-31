"use client";

import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 px-6">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 text-center border border-green-100">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Payment Successful 🎉
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for completing your job application payment.  
          Our recruitment team will review your submission and contact you soon.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left">
          <h4 className="text-green-700 font-semibold mb-2">Next Steps:</h4>
          <ul className="list-disc list-inside text-sm text-gray-700">
            <li>Your application has been received successfully.</li>
            <li>You’ll receive an email confirmation shortly.</li>
            <li>Keep an eye on your inbox for interview updates.</li>
          </ul>
        </div>

        <Link
          href="/"
          className="inline-block mt-4 bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-all"
        >
          Back to Job Listings
        </Link>
      </div>
    </section>
  );
}
