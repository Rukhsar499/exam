"use client";
import { useState } from "react";
import { apiPost } from "../../lib/apiClient"; // tumhara proxy + apiPost function

interface LoginFormData {
  email: string;
  password: string;
}

interface ApiResponse {
  status: boolean;
  message: string;
  token?: string; // agar API JWT ya session token return kare
  [key: string]: unknown;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await apiPost<ApiResponse, LoginFormData>(
        "v1/validate_login",
        formData
      );

      if (res.status) {
        alert("Login successful!");
        if (res.token) localStorage.setItem("token", res.token);
        // Redirect to dashboard if needed
      } else {
        setErrorMessage(res.message || "Login failed");
      }
    } catch (err: unknown) {
      if (err instanceof Error) setErrorMessage(err.message);
      else setErrorMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-6">
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 text-sm border-b border-[#0000008a] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border-b border-[#0000008a] text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
          required
        />
        {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
      </div>

      <p className="text-[12px] text-[#0000008a]">
        New to Narayana Job Portal? Create an account by clicking Register
      </p>

      <div className="text-center">
        <button
          type="submit"
          disabled={loading}
          className={`mt-auto inline-flex items-center justify-center bg-[#1A7EBD] text-white font-medium px-5 py-2 rounded-full hover:bg-[#166ea8] transition-all ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login →"}
        </button>
      </div>
    </form>
  );
}
