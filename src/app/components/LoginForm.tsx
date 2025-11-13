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
}
interface GenerateOtpResponse {
  status: boolean;
  message: string;
}
interface UpdatePasswordResponse {
  status: boolean;
  message: string;
}

export default function LoginForm() {
  const { setUser } = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [welcomeUser, setWelcomeUser] = useState<string | null>(null);
  const [alreadyLogged, setAlreadyLogged] = useState<string | null>(null);

  // Forgot Password popup
  const [showForgotPopup, setShowForgotPopup] = useState(false);
  const [step, setStep] = useState<"email" | "reset">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [popupMsg, setPopupMsg] = useState("");
  const [popupLoading, setPopupLoading] = useState(false);

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

        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setWelcomeUser(res.login_data.username);

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

  // 🔹 Step 1: Generate OTP
  const handleGenerateOtp = async () => {
  if (!email) return setPopupMsg("Please enter your registered email");

  setPopupLoading(true);
  setPopupMsg("");

  try {
    const res = await apiPost<GenerateOtpResponse, { username: string; user_emailid: string }>(
      "v1/generateotp",
      {
        username: email,   // dynamic: user input
        user_emailid: email // dynamic: user input
      }
    );

    if (res.status) {
      setPopupMsg("OTP sent to your email!");
      setStep("reset");
    } else {
      setPopupMsg(res.message || "Email not found");
    }
  } catch (err) {
    console.error(err);
    setPopupMsg("Something went wrong");
  } finally {
    setPopupLoading(false);
  }
};

  // 🔹 Step 2: Update Password
  const handleUpdatePassword = async () => {
    if (!otp || !newPassword || !confirmPassword)
      return setPopupMsg("All fields are required");
    if (newPassword !== confirmPassword)
      return setPopupMsg("Passwords do not match");

    setPopupLoading(true);

    try {
      // Call proxy with endpoint "updatepassword" and body { email, otp, new_password }
      const res = await apiPost<UpdatePasswordResponse, { emailid: string; newpassword: string }>(
        "v1/updatepassword",
        {
          emailid: email,
          newpassword: newPassword
        }
      );

      if (res.status) {
        setPopupMsg("Password updated successfully! 🎉");
        setTimeout(() => {
          setShowForgotPopup(false);
          setStep("email");
          setEmail("");
          setOtp("");
          setNewPassword("");
          setConfirmPassword("");
        }, 1200);
      } else {
        setPopupMsg(res.message || "Invalid OTP or error updating password");
      }
    } catch {
      setPopupMsg("Something went wrong");
    } finally {
      setPopupLoading(false);
    }
  };

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

        <div className="flex justify-between items-center text-[12px] text-[#0000008a]">
          <p>New to Narayana Job Portal? Create an account by clicking Register</p>
          <button
            type="button"
            onClick={() => setShowForgotPopup(true)}
            className="text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className={`mt-auto inline-flex items-center justify-center bg-[#1A7EBD] text-white font-medium px-5 py-2 rounded-full hover:bg-[#166ea8] transition-all ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Logging in..." : "Login →"}
          </button>
        </div>
      </form>

      {/* ✅ Forgot Password Popup */}
      {showForgotPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#0008] z-50">
          <div className="bg-white w-[90%] max-w-sm rounded-lg shadow-xl p-6 text-center relative animate-fadeIn">
            <button
              onClick={() => setShowForgotPopup(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
            >
              ✖
            </button>

            <h2 className="text-lg font-semibold mb-3">Reset Password</h2>

            {step === "email" && (
              <>
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  className="w-full border px-3 py-2 rounded mb-3 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={(e) => { e.preventDefault(); handleGenerateOtp(); }}
                  disabled={popupLoading}
                  className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
                >
                  {popupLoading ? "Sending..." : "Send OTP"}
                </button>
              </>
            )}

            {step === "reset" && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full border px-3 py-2 rounded mb-2 text-sm"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full border px-3 py-2 rounded mb-2 text-sm"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full border px-3 py-2 rounded mb-3 text-sm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  onClick={handleUpdatePassword}
                  disabled={popupLoading}
                  className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
                >
                  {popupLoading ? "Updating..." : "Update Password"}
                </button>
              </>
            )}

            {popupMsg && (
              <p className="text-sm text-gray-600 mt-3">{popupMsg}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
