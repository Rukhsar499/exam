"use client";

import { useState } from "react";
import { apiPost } from "../../lib/apiClient";

interface OTPFormData {
  email: string;
  otp: string;
}

interface ApiResponse {
  status: boolean;
  message: string;
  [key: string]: any;
}

interface OTPProps {
  email: string;
}

export default function OTPVerification({ email }: OTPProps) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res: ApiResponse = await apiPost<ApiResponse, OTPFormData>(
        "v1/verify_web_register",
        { email, otp }
      );

      if (res.status) {
        setSuccessMessage(res.message || "OTP verified successfully! You can now login.");
      } else {
        setErrorMessage(res.message || "OTP verification failed.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="otp"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className={`w-full bg-green-500 text-white px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
      {successMessage && <p className="mt-2 text-green-600">{successMessage}</p>}
      {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
    </form>
  );
}
