"use client";

import { useState } from "react";
import { apiFetch } from "../../lib/apiClient";

interface RegisterResponse {
  success: boolean;
  message: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile_no: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await apiFetch<RegisterResponse>(
        "http://njportal.thenoncoders.in/api/v1/web_register",
        {
          method: "POST",
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        if (res.data.success) {
          setMessage("✅ Registration successful! Please verify your email.");
          setFormData({ full_name: "", email: "", mobile_no: "", password: "" });
        } else {
          setMessage(res.data.message || "❌ Something went wrong.");
        }
      } else {
        setMessage(res.error.message || "❌ Failed to register.");
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Unexpected error";
      setMessage(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 text-sm border-b border-[#0000008a] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Full Name"
          required
        />
      </div>

      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 text-sm border-b border-[#0000008a] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email Address"
          required
        />
      </div>

      <div>
        <input
          type="tel"
          name="mobile_no"
          value={formData.mobile_no}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 text-sm border-b border-[#0000008a] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Phone Number"
          required
        />
      </div>

      <div>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 text-sm border-b border-[#0000008a] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Create Password"
          required
        />
      </div>

      {message && (
        <p
          className={`text-sm text-center ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <div className="text-center">
        <button
          type="submit"
          disabled={loading}
          className="mt-auto inline-flex items-center justify-center bg-[#1A7EBD] text-white font-medium px-5 py-2 rounded-full hover:bg-[#166ea8] transition-all disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register →"}
        </button>
      </div>
    </form>
  );
}
