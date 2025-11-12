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
  token?: string;
  data?: {
    token?: string;
    auth_token?: string;
    user_id?: string | number;
    name?: string;
    email?: string;
    mobile_no?: string;
  };
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
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 🔹 Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Registration API
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await apiPost<ApiResponse, RegisterFormData>(
        "v1/web_register",
        formData
      );

      if (res.status) {
        alert("✅ Registration successful! Please check your OTP.");
        setShowOTPModal(true);
      } else {
        setErrorMessage(res.message || "Registration failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 OTP Verify + Auto-Login
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
        setOtpMessage("✅ OTP Verified Successfully! Logging you in...");

        // ✅ Extract token from backend
        const token =
          res.token || res.data?.token || res.data?.auth_token || null;

        if (token) {
          localStorage.setItem("auth_token", token);
        } else {
          localStorage.setItem("auth_token", "dummy_token");
        }

        // ✅ Store user info for profile page
        const userData = {
          user_id: res.data?.user_id || "",
          name: formData.name || "",
          email: formData.email || "",
          mobile_no: formData.mobile_no || "",
        };
        localStorage.setItem("user_info", JSON.stringify(userData));

        console.log("✅ User saved:", userData);

        // ✅ Redirect to Profile page automatically
        setTimeout(() => {
          window.location.href = "/profile";
        }, 1500);
      } else {
        setOtpMessage(res.message || "❌ OTP verification failed.");
      }
    } catch (err) {
      console.error("OTP verify error:", err);
      setOtpMessage("Something went wrong during OTP verification.");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto rounded relative">
      {/* Registration Form */}
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border-b border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border-b border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="mobile_no"
          placeholder="Mobile No"
          value={formData.mobile_no}
          onChange={handleChange}
          className="w-full px-3 py-2 border-b border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border-b border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Registering..." : "Get OTP"}
        </button>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </form>

      {/* OTP Modal */}
      {showOTPModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full relative">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Enter OTP
            </h2>

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
                disabled={otpLoading}
                className={`w-full bg-green-600 text-white py-2 rounded ${
                  otpLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
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
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 font-bold text-lg"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
