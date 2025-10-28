"use client";
import { useState, useEffect } from "react";
import { apiPost } from "../../lib/apiClient";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";

interface LoginFormData {
  email: string;
  password: string;
}

interface ApiResponse {
  status: boolean;
  message: string;
  login_data?: {
    userid: number;
    username: string;
    user_emailid: string;
    user_mobileno: string;
  };
  [key: string]: unknown;
}

export default function LoginForm() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [welcomeUser, setWelcomeUser] = useState<string | null>(null);
  const [alreadyLogged, setAlreadyLogged] = useState<string | null>(null);

  // Check if user already logged in
 useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
  }
}, [setUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // ✅ If user is already logged in and trying to log in again, show message
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    setAlreadyLogged(parsedUser.username);
    return;
  }

  setLoading(true);
  setErrorMessage("");

  try {
    const res = await apiPost<ApiResponse, LoginFormData>(
      "v1/validate_login",
      formData
    );

    if (res.status && res.login_data) {
      const userData = {
        userid: res.login_data.userid,
        username: res.login_data.username,
        user_emailid: res.login_data.user_emailid,
        user_mobileno: res.login_data.user_mobileno,
      };

      // ✅ Save to localStorage & context
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setWelcomeUser(res.login_data.username);

      // ✅ Auto-refresh after 1 second
      setTimeout(() => {
        setWelcomeUser(null);
        window.location.reload();
      }, 1000);
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

  if (alreadyLogged) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <h2 className="text-lg font-semibold text-gray-800">
          You’re already logged in, {alreadyLogged}! 🎉
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Please log out before logging into another account.
        </p>
      </div>
    );
  }

  return (
    <>
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
          {errorMessage && (
            <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
          )}
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

      {/* Welcome Popup */}
      {welcomeUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#0008] bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center animate-fadeIn">
            <h2 className="text-lg font-semibold text-gray-800">
              Welcome, {welcomeUser}! 🎉
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              You have successfully logged in.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
