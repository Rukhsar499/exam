"use client";

import { useState } from "react";
import { apiPost } from "../../lib/apiClient";

interface RegisterFormData {
  name: string;
  email: string;
  mobile_no: string;
  password: string;
}

interface OTPFormData {
  email: string;
  otp: string;
}

interface ApiResponse {
  status: boolean;
  message: string;
  [key: string]: unknown;
}

export default function RegisterFormWithOTP() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    mobile_no: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");

  // Input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Register submit
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await apiPost<ApiResponse, RegisterFormData>(
        "v1/web_register",
        formData
      );

      if (res.status) {
        // ✅ Show message in UI instead of alert
        alert("Registration successful! Please check your OTP.");
        // setSuccessMessage("Registration successful! Check your OTP.");
        setShowOTPModal(true); // Show OTP popup
      } else {
        setErrorMessage(res.message || "Registration failed. Try again.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) setErrorMessage(err.message);
      else setErrorMessage("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // OTP submit
  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpLoading(true);
    setOtpMessage("");

    try {
      const res = await apiPost<ApiResponse, OTPFormData>(
        "v1/verify_web_register",
        { email: formData.email.trim(), otp: otp.trim() }
      );

      if (res.status) {
        // ✅ Show verified message
        setOtpMessage("✅ OTP Verified Successfully!");

        // ✅ Save user details in localStorage for later auto-fill
       localStorage.setItem( "user", JSON.stringify({ name: formData.name, email: formData.email, phone: formData.mobile_no, }) );

        // ✅ Reload page after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setOtpMessage(res.message || "❌ OTP verification failed.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) setOtpMessage(err.message);
      else setOtpMessage("Something went wrong.");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto rounded relative">
      {/* Register Form */}
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 text-sm border-b border-[#0000008a] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 text-sm border-b border-[#0000008a] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="mobile_no"
          placeholder="Mobile No"
          value={formData.mobile_no}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 text-sm border-b border-[#0000008a] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 text-sm border-b border-[#0000008a] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="text-center">
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Get OTP"}
          </button>
        </div>

        {successMessage && <p className="mt-2 text-green-600">{successMessage}</p>}
        {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
      </form>

      {/* OTP Modal */}
      {showOTPModal && (
        <div className="fixed inset-0 bg-[#00000086] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full relative">
            <h2 className="text-lg font-semibold mb-4 text-center">Enter OTP</h2>

            {/* OTP Form */}
            <form onSubmit={handleOTPSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 border rounded"
                required
                disabled={otpLoading}
              />

              <button
                type="submit"
                className={`w-full bg-green-500 text-white px-4 py-2 rounded ${otpLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={otpLoading}
              >
                {otpLoading ? "Verifying..." : "Verify OTP"}
              </button>

              {otpMessage && (
                <p
                  className={`mt-2 text-center ${
                    otpMessage.toLowerCase().includes("success")
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {otpMessage}
                </p>
              )}
            </form>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowOTPModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-lg"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
